/**
 * POST /api/upgrade/validate-handoff
 *
 * Called by /payment/page.tsx (server component) immediately after the
 * browser arrives at /payment?upgradeMode=1&token=<token>.
 *
 * What it does
 *   1. Parses and HMAC-verifies the one-time token.
 *   2. Checks expiry.
 *   3. Marks the token as used in phase2.upgrade_handoffs (nonce consumption).
 *      If the row is already used → reject (replay protection).
 *   4. Re-fetches the authoritative eligible enrollments from Supabase
 *      (token payload is secondary; DB is authoritative).
 *   5. Fetches course titles for the checkout UI.
 *   6. Sets an HttpOnly `upgrade_session` cookie containing the phase2 user id
 *      and the validated enrollment/bundle context so create-upgrade-order
 *      can read it without trusting the browser.
 *   7. Returns the eligible course list and user details to the page.
 *
 * Request   { token: string }
 *
 * Response (success)
 *   {
 *     authUserId:    string
 *     phase2UserId:  string
 *     eligibleCourses: Array<{
 *       courseId:      string
 *       courseTitle:   string
 *       enrollmentId:  string
 *       priceInr:      number   -- server-authoritative price in INR
 *     }>
 *     proBundleId:   string
 *   }
 *   Set-Cookie: upgrade_session=<session-json>; HttpOnly; Secure; SameSite=Lax; Max-Age=360
 */

import { NextResponse } from "next/server";
import crypto from "crypto";
import { makeAdminClient } from "@/lib/supabase/server";
import {
  verifyHandoffToken,
  UPGRADE_SESSION_COOKIE,
  UPGRADE_SESSION_MAX_AGE,
  type UpgradeSessionData,
} from "@/lib/upgrade-handoff";

const PRO_UPGRADE_PRICE_INR = (() => {
  const raw = process.env.PRO_UPGRADE_PRICE_INR;
  const n = raw ? parseInt(raw, 10) : NaN;
  return Number.isFinite(n) && n > 0 ? n : 4900;
})();

const TIER_LEVEL = (name: string) => {
  const l = name.toLowerCase();
  if (l.includes("premium") || l.includes("live sessions")) return 3;
  if (l.includes("pro")) return 2;
  return 1;
};

export async function POST(req: Request) {
  // ── Parse body ────────────────────────────────────────────────────────────
  let body: { token?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof body.token !== "string" || !body.token.trim()) {
    return NextResponse.json({ error: "Missing handoff token." }, { status: 400 });
  }

  // ── Verify token signature + expiry ───────────────────────────────────────
  let payload;
  try {
    payload = verifyHandoffToken(body.token.trim());
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Invalid handoff token." },
      { status: 401 },
    );
  }

  const { sub: authUserId, phase2UserId, jti, proBundleId } = payload;

  // ── Nonce consumption (replay prevention) ─────────────────────────────────
  const db = makeAdminClient();

  try {
    const { data: handoffRow } = await (db as any)
      .schema("phase2")
      .from("upgrade_handoffs")
      .select("id, used_at")
      .eq("jti", jti)
      .maybeSingle();

    if (handoffRow) {
      if ((handoffRow as any).used_at) {
        return NextResponse.json(
          { error: "This upgrade session has already been used." },
          { status: 409 },
        );
      }
      await (db as any)
        .schema("phase2")
        .from("upgrade_handoffs")
        .update({ used_at: new Date().toISOString() })
        .eq("jti", jti);
    } else {
      console.warn(
        "[validate-handoff] upgrade_handoffs row not found for jti (migration pending?):",
        jti,
      );
    }
  } catch (dbErr: any) {
    console.warn(
      "[validate-handoff] upgrade_handoffs lookup failed (migration pending?):",
      dbErr?.message,
    );
  }

  // ── Re-fetch authoritative enrollments from DB ────────────────────────────
  // MUST use .schema("phase2") per-query — see init-handoff for the explanation.
  const { data: enrollments, error: enrollErr } = await (db as any)
    .schema("phase2")
    .from("enrollments")
    .select("id, course_id, bundle_id, bundles(bundle_name)")
    .eq("user_id", phase2UserId)
    .eq("status", "active");

  if (enrollErr) {
    console.error("[validate-handoff] enrollment fetch:", enrollErr.message);
    return NextResponse.json({ error: "Failed to fetch enrollments." }, { status: 500 });
  }

  // ── Resolve target bundle and price ──────────────────────────────────────────
  const { data: targetBundleData } = await (db as any)
    .schema("phase2")
    .from("bundles")
    .select("bundle_name, price")
    .eq("id", proBundleId)
    .maybeSingle();
  const targetTierName = targetBundleData?.bundle_name || "Pro";
  const targetPrice = targetBundleData?.price ?? 0;

  const tokenCourseIds = payload.courseIds ? payload.courseIds.split(",") : [];

  const eligibleRows = ((enrollments ?? []) as any[]).filter((row) => {
    if (tokenCourseIds.length > 0 && !tokenCourseIds.includes(String(row.course_id))) return false;
    const bundleName = Array.isArray(row.bundles)
      ? (row.bundles[0]?.bundle_name ?? "Starter")
      : (row.bundles?.bundle_name ?? "Starter");
    return TIER_LEVEL(bundleName) < TIER_LEVEL(targetTierName);
  });

  if (eligibleRows.length === 0) {
    return NextResponse.json(
      { error: `No courses are eligible for a ${targetTierName} upgrade.` },
      { status: 422 },
    );
  }

  // ── Fetch course titles ───────────────────────────────────────────────────
  const adminDb = makeAdminClient();
  const courseIds = eligibleRows.map((r: any) => String(r.course_id));

  const { data: courses } = await adminDb
    .from("maincourses")
    .select("id, title")
    .in("id", courseIds);

  const titleMap = new Map<string, string>(
    ((courses ?? []) as any[]).map((c) => [String(c.id), c.title ?? "Untitled Course"]),
  );

  // ── Fetch current bundle prices to calculate difference ───────────────────
  const currentBundleIds = [...new Set(eligibleRows.map(r => r.bundle_id).filter(Boolean))];
  const { data: currentBundlesData } = await (db as any)
    .schema("phase2")
    .from("bundles")
    .select("id, price")
    .in("id", currentBundleIds);
  
  const currentBundlePriceMap = new Map<string, number>(
    (currentBundlesData || []).map((b: any) => [String(b.id), Number(b.price) || 0])
  );

  const eligibleCourses = eligibleRows.map((row: any) => {
    const currentPrice = row.bundle_id ? (currentBundlePriceMap.get(String(row.bundle_id)) ?? 0) : 0;
    const priceDiff = targetPrice - currentPrice;
    
    // If the diff is positive, use it. Otherwise fallback to the hardcoded upgrade price.
    const priceInr = (priceDiff > 0) ? priceDiff : PRO_UPGRADE_PRICE_INR;
    
    return {
      courseId:     String(row.course_id),
      courseTitle:  titleMap.get(String(row.course_id)) ?? "Untitled Course",
      enrollmentId: String(row.id),
      priceInr,
    };
  });

  // ── Build upgrade session cookie ──────────────────────────────────────────
  // The cookie holds the authoritative upgrade context so create-upgrade-order
  // never needs to trust anything from the client body.
  const sessionData: UpgradeSessionData = {
    phase2UserId,
    authUserId,
    courseIds:     eligibleRows.map((r: any) => String(r.course_id)).join(","),
    enrollmentIds: eligibleRows.map((r: any) => String(r.id)).join(","),
    proBundleId,
    exp: Math.floor(Date.now() / 1000) + UPGRADE_SESSION_MAX_AGE,
  };
  const sessionJson = JSON.stringify(sessionData);

  const response = NextResponse.json({
    authUserId,
    phase2UserId,
    eligibleCourses,
    proBundleId,
  });

  response.cookies.set(UPGRADE_SESSION_COOKIE, sessionJson, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge:   UPGRADE_SESSION_MAX_AGE,
    path:     "/",
  });

  return response;
}
