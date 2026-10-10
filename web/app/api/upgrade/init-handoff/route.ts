/**
 * POST /api/upgrade/init-handoff
 *
 * Called by the learning portal's server-side API route
 * (POST /api/upgrade/request-handoff on the portal) to begin a portal-
 * initiated Pro upgrade.
 *
 * Authentication
 *   Authorization: Bearer <supabase-access-token>
 *   The token must have been issued by the shared Supabase project.
 *   The user identity is resolved from the token — client-submitted IDs
 *   are never trusted.
 *
 * What it does
 *   1. Validates the Supabase Bearer token → identifies the portal user.
 *   2. Blocks admins and instructors (they already have Premium access).
 *   3. Resolves the phase2.users row for the caller.
 *   4. Fetches all active Starter enrollments eligible for Pro upgrade.
 *   5. Resolves the Pro bundle id from phase2.bundles.
 *   6. Generates a unique nonce (jti) and signs a HandoffPayload token.
 *   7. Persists the token metadata in phase2.upgrade_handoffs for nonce
 *      replay prevention and auditing.
 *   8. Returns the signed token.
 *
 * IMPORTANT — schema pattern
 *   All phase2 queries use .schema("phase2").from(...) chained at query time,
 *   NOT makePhase2Client() with db:{schema:"phase2"} in the constructor.
 *   The constructor option does not emit the Prefer: schema=phase2 header that
 *   PostgREST needs to resolve embedded FK joins (e.g. bundles(bundle_name)).
 *   Using the constructor option causes the bundles join to silently return
 *   null, making every enrollment appear ineligible.
 *
 * REQUIRED MIGRATION (do not apply without approval)
 *   See lib/upgrade-handoff.ts for the CREATE TABLE statement.
 */

import { NextResponse } from "next/server";
import crypto from "crypto";
import { getUserFromToken, makeAdminClient } from "@/lib/supabase/server";
import { signHandoffToken, handoffExpiry, HandoffPayload } from "@/lib/upgrade-handoff";

const TIER_LEVEL = (name: string) => {
  const l = name.toLowerCase();
  if (l.includes("premium") || l.includes("live sessions")) return 3;
  if (l.includes("pro")) return 2;
  return 1;
};

export async function POST(req: Request) {
  // ── Auth ──────────────────────────────────────────────────────────────────
  const authHeader  = req.headers.get("authorization");
  const accessToken = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7).trim()
    : null;

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const user = await getUserFromToken(accessToken);
  if (!user) {
    return NextResponse.json({ error: "Invalid or expired session." }, { status: 401 });
  }

  let bodyData: any = {};
  try {
    bodyData = await req.json();
  } catch (e) {}

  const targetTierName = bodyData.targetTier || "Pro";
  const courseSlug = bodyData.courseSlug;

  // Single admin client for all queries — schema applied per-query below
  const db = makeAdminClient();

  // ── Role gate ─────────────────────────────────────────────────────────────
  const { data: profile } = await db
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  const role = (profile as any)?.role?.toLowerCase() ?? "";
  if (role === "admin" || role === "instructor") {
    return NextResponse.json(
      { error: "Admins and instructors do not need to upgrade." },
      { status: 403 },
    );
  }

  // ── Resolve phase2 user ───────────────────────────────────────────────────
  const { data: p2User } = await (db as any)
    .schema("phase2")
    .from("users")
    .select("id")
    .eq("auth_user_id", user.id)
    .maybeSingle();

  const phase2UserId: string = (p2User as any)?.id;
  if (!phase2UserId) {
    return NextResponse.json(
      { error: "No learning portal account found for this user." },
      { status: 404 },
    );
  }

  // ── Fetch active enrollments with bundle info ─────────────────────────────
  // MUST use .schema("phase2") chained at query time so PostgREST sends the
  // Prefer: schema=phase2 header — this is required for the bundles(bundle_name)
  // embedded FK join to resolve correctly.
  // The user requested to see ALL active courses in the checkout dropdown,
  // so we intentionally DO NOT filter by targetCourseId anymore.
  let targetCourseId: string | null = null;
  if (courseSlug) {
    // We still try to resolve it in case we need it, but we won't filter out other courses.
    const { data: cData } = await db.from("maincourses").select("id").eq("id", courseSlug).maybeSingle();
    if (cData) targetCourseId = cData.id;
  }

  const { data: enrollments, error: enrollErr } = await (db as any)
    .schema("phase2")
    .from("enrollments")
    .select("id, course_id, bundle_id, bundles(bundle_name)")
    .eq("user_id", phase2UserId)
    .eq("status", "active");

  if (enrollErr) {
    console.error("[init-handoff] enrollment fetch error:", enrollErr.message);
    return NextResponse.json({ error: "Failed to fetch enrollments." }, { status: 500 });
  }

  // Filter: keep only rows eligible to upgrade to targetTier.
  // When bundle_id IS NULL the join returns bundles:null — the fallback to
  // "Starter" correctly treats these legacy rows as upgradeable.
  const eligibleRows = ((enrollments ?? []) as any[]).filter((row) => {
    // Removed: if (targetCourseId && row.course_id !== targetCourseId) return false;
    const bundleName: string =
      Array.isArray(row.bundles)
        ? (row.bundles[0]?.bundle_name ?? "Starter")
        : (row.bundles?.bundle_name ?? "Starter");
    return TIER_LEVEL(bundleName) < TIER_LEVEL(targetTierName);
  });

  if (eligibleRows.length === 0) {
    return NextResponse.json(
      { error: `No courses eligible for ${targetTierName} upgrade.` },
      { status: 422 },
    );
  }

  // ── Resolve Target bundle id ─────────────────────────────────────────────────
  let bundleQuery = (db as any).schema("phase2").from("bundles").select("id").limit(1);
  if (targetTierName.toLowerCase() === "premium") {
    bundleQuery = bundleQuery.ilike("bundle_name", "%premium%");
  } else {
    bundleQuery = bundleQuery.ilike("bundle_name", "%pro%").not("bundle_name", "ilike", "%premium%");
  }
  
  const { data: targetBundle } = await bundleQuery.maybeSingle();

  const targetBundleId: string | null = (targetBundle as any)?.id ?? null;
  if (!targetBundleId) {
    console.error(`[init-handoff] ${targetTierName} bundle not found in phase2.bundles`);
    return NextResponse.json(
      { error: `${targetTierName} plan configuration is missing. Please contact support.` },
      { status: 500 },
    );
  }

  // ── Build + sign token ────────────────────────────────────────────────────
  const courseIds     = eligibleRows.map((r: any) => String(r.course_id)).join(",");
  const enrollmentIds = eligibleRows.map((r: any) => String(r.id)).join(",");
  const jti = crypto.randomUUID();
  const exp = handoffExpiry();

  const payload: HandoffPayload = {
    sub: user.id,
    phase2UserId,
    jti,
    exp,
    courseIds,
    enrollmentIds,
    proBundleId: targetBundleId,
  };

  let token: string;
  try {
    token = signHandoffToken(payload);
  } catch (err: any) {
    console.error("[init-handoff] signHandoffToken failed:", err.message);
    return NextResponse.json(
      { error: "Upgrade service is not configured correctly. Please contact support." },
      { status: 503 },
    );
  }

  // ── Persist to phase2.upgrade_handoffs for nonce tracking ─────────────────
  const { error: insertErr } = await (db as any)
    .schema("phase2")
    .from("upgrade_handoffs")
    .insert({
      jti,
      auth_user_id:   user.id,
      phase2_user_id: phase2UserId,
      course_ids:     courseIds,
      enrollment_ids: enrollmentIds,
      pro_bundle_id:  targetBundleId,
      expires_at:     new Date(exp * 1000).toISOString(),
    });

  if (insertErr) {
    console.warn(
      "[init-handoff] Could not persist handoff record (migration pending?):",
      insertErr.message,
    );
  }

  return NextResponse.json({ token });
}
