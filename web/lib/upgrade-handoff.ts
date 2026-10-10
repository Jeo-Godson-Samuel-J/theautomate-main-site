/**
 * lib/upgrade-handoff.ts
 *
 * Server-only utilities for the portal-to-landing-site upgrade handoff.
 *
 * HOW IT WORKS
 * ────────────
 * 1. The learning portal calls POST /api/upgrade/init-handoff on the landing
 *    site with a Supabase Bearer token.
 * 2. init-handoff validates the token, builds a signed payload, persists a
 *    row in phase2.upgrade_handoffs, and returns the token string.
 * 3. The portal redirects the browser to
 *    /payment?upgradeMode=1&token=<token>
 * 4. /payment/page.tsx calls POST /api/upgrade/validate-handoff with that
 *    token to authenticate the user, mark the token used, and return eligible
 *    courses — all server-side.
 * 5. A short-lived HttpOnly cookie (upgrade_session) is set so the
 *    create-upgrade-order route can trust the upgrade context without any
 *    further token in the browser URL.
 *
 * TOKEN FORMAT
 * ────────────
 * "<base64url-payload>.<hex-hmac>"
 * Payload is a JSON object: { sub, jti, exp, courseIds[], enrollmentIds[], proBundleId }
 * HMAC key = UPGRADE_HANDOFF_SECRET (server-only env var, shared between apps)
 *
 * REQUIRED DATABASE TABLE  (migration — do not apply without approval)
 * ────────────────────────
 *   CREATE TABLE IF NOT EXISTS phase2.upgrade_handoffs (
 *     id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *     jti         TEXT UNIQUE NOT NULL,          -- nonce/idempotency key
 *     auth_user_id TEXT NOT NULL,
 *     phase2_user_id TEXT NOT NULL,
 *     course_ids  TEXT NOT NULL,                 -- comma-separated
 *     enrollment_ids TEXT NOT NULL,              -- comma-separated
 *     pro_bundle_id TEXT NOT NULL,
 *     expires_at  TIMESTAMPTZ NOT NULL,
 *     used_at     TIMESTAMPTZ,                   -- NULL = unused
 *     created_at  TIMESTAMPTZ DEFAULT now()
 *   );
 *   CREATE INDEX ON phase2.upgrade_handoffs (jti);
 *   CREATE INDEX ON phase2.upgrade_handoffs (expires_at);
 */

import crypto from "crypto";

const HANDOFF_TTL_SECONDS = 300; // 5-minute window to use the token

function getSecret(): string {
  const s = process.env.UPGRADE_HANDOFF_SECRET;
  if (!s || s === "REPLACE_WITH_32_BYTE_HEX_SECRET" || s.length < 16) {
    throw new Error(
      "UPGRADE_HANDOFF_SECRET is not configured or is too short. " +
        "Generate one with: openssl rand -hex 32 " +
        "and set it identically in both the portal and landing site .env.local files.",
    );
  }
  return s;
}

export interface HandoffPayload {
  /** Supabase auth user id */
  sub: string;
  /** phase2.users.id */
  phase2UserId: string;
  /** JWT ID / nonce */
  jti: string;
  /** Unix timestamp seconds — when the token expires */
  exp: number;
  /** Comma-separated phase2 enrollment course ids */
  courseIds: string;
  /** Comma-separated phase2 enrollment ids (parallel to courseIds) */
  enrollmentIds: string;
  /** phase2.bundles.id for the Pro bundle */
  proBundleId: string;
}

/** Build and sign a handoff token. */
export function signHandoffToken(payload: HandoffPayload): string {
  const secret = getSecret();
  const payloadJson = JSON.stringify(payload);
  const payloadB64 = Buffer.from(payloadJson).toString("base64url");
  const mac = crypto
    .createHmac("sha256", secret)
    .update(payloadB64)
    .digest("hex");
  return `${payloadB64}.${mac}`;
}

/** Verify a handoff token signature and return the decoded payload. */
export function verifyHandoffToken(token: string): HandoffPayload {
  const secret = getSecret();
  const dotIndex = token.lastIndexOf(".");
  if (dotIndex === -1) throw new Error("Malformed handoff token.");

  const payloadB64 = token.slice(0, dotIndex);
  const receivedMac = token.slice(dotIndex + 1);

  const expectedMac = crypto
    .createHmac("sha256", secret)
    .update(payloadB64)
    .digest("hex");

  const receivedBuf = Buffer.from(receivedMac, "hex");
  const expectedBuf = Buffer.from(expectedMac, "hex");

  if (
    receivedBuf.length !== expectedBuf.length ||
    !crypto.timingSafeEqual(receivedBuf, expectedBuf)
  ) {
    throw new Error("Handoff token signature invalid.");
  }

  const payloadJson = Buffer.from(payloadB64, "base64url").toString("utf8");
  const payload = JSON.parse(payloadJson) as HandoffPayload;

  if (payload.exp * 1000 < Date.now()) {
    throw new Error("Handoff token has expired.");
  }

  return payload;
}

/** Generate a new handoff token TTL expiry (Unix timestamp seconds). */
export function handoffExpiry(): number {
  return Math.floor(Date.now() / 1000) + HANDOFF_TTL_SECONDS;
}

/** Cookie name for the server-side upgrade session. */
export const UPGRADE_SESSION_COOKIE = "upgrade_session";

/** Max age of the upgrade session cookie (slightly longer than token TTL). */
export const UPGRADE_SESSION_MAX_AGE = HANDOFF_TTL_SECONDS + 60;

/**
 * Shape of the JSON stored in the `upgrade_session` HttpOnly cookie.
 * Set by validate-handoff, read by create-upgrade-order and the page component.
 */
export interface UpgradeSessionData {
  /** phase2.users.id of the authenticated user */
  phase2UserId: string;
  /** auth.users.id */
  authUserId: string;
  /** Comma-separated course ids (authoritative from DB re-fetch in validate-handoff) */
  courseIds: string;
  /** Comma-separated enrollment ids (parallel to courseIds) */
  enrollmentIds: string;
  /** phase2.bundles.id for the Pro bundle */
  proBundleId: string;
  /** Unix seconds — when this session expires */
  exp: number;
}
