/**
 * POST /api/razorpay/create-upgrade-order
 *
 * Creates a Razorpay order for a portal-initiated Pro upgrade.
 * This route is SEPARATE from the normal /api/razorpay/create-order so that
 * the existing purchase flow is never altered.
 *
 * Authentication / context
 *   Reads the `upgrade_session` HttpOnly cookie set by validate-handoff.
 *   The cookie contains the authoritative course/enrollment/bundle context.
 *   Client-submitted courseIds are validated against the cookie — if any
 *   requested course is not in the cookie it is rejected.
 *
 * Request body
 *   { selectedCourseIds: string[] }   -- subset the user explicitly chose
 *
 * What it does
 *   1. Reads and validates the upgrade_session cookie.
 *   2. Validates each selected course id against the eligible list in cookie.
 *   3. Computes the aggregate price server-side (PRO_UPGRADE_PRICE_INR per course).
 *      The 120-hour upgrade window from check-upgrade does NOT apply to portal
 *      upgrades — this is an intentional, server-authorized bypass.
 *   4. Builds the Razorpay order via the Razorpay Orders API.
 *   5. Persists a pending order row in phase2.orders so verify-payment can
 *      recover the upgrade context without trusting the client callback.
 *   6. Returns the Razorpay order id and key for the client modal.
 *
 * Response (success)
 *   { orderId, keyId, totalInr, selectedCourseIds, selectedEnrollmentIds, proBundleId }
 */

import { NextResponse, NextRequest } from "next/server";
import Razorpay from "razorpay";
import { makeAdminClient } from "@/lib/supabase/server";
import {
  UPGRADE_SESSION_COOKIE,
  type UpgradeSessionData,
} from "@/lib/upgrade-handoff";

const RAZORPAY_KEY_ID     = process.env.RAZORPAY_KEY_ID!;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET!;

const PRO_UPGRADE_PRICE_INR = (() => {
  const raw = process.env.PRO_UPGRADE_PRICE_INR;
  const n = raw ? parseInt(raw, 10) : NaN;
  return Number.isFinite(n) && n > 0 ? n : 4900;
})();

export async function POST(req: NextRequest) {
  // ── Guard: Razorpay configured ────────────────────────────────────────────
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    return NextResponse.json(
      { error: "Payment processing is not configured." },
      { status: 503 },
    );
  }

  // ── Read upgrade_session cookie ───────────────────────────────────────────
  const cookieValue = req.cookies.get(UPGRADE_SESSION_COOKIE)?.value;
  if (!cookieValue) {
    return NextResponse.json(
      { error: "Upgrade session not found. Please restart the upgrade from the portal." },
      { status: 401 },
    );
  }

  let session: UpgradeSessionData;
  try {
    session = JSON.parse(cookieValue) as UpgradeSessionData;
  } catch {
    return NextResponse.json({ error: "Corrupt upgrade session." }, { status: 401 });
  }

  // Validate session expiry
  if (session.exp * 1000 < Date.now()) {
    return NextResponse.json(
      { error: "Upgrade session has expired. Please restart the upgrade." },
      { status: 401 },
    );
  }

  const {
    phase2UserId,
    authUserId,
    courseIds: eligibleCoursesCsv,
    enrollmentIds: eligibleEnrollmentsCsv,
    proBundleId,
  } = session;

  // ── Parse requested selection ─────────────────────────────────────────────
  let body: { selectedCourseIds?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!Array.isArray(body.selectedCourseIds) || body.selectedCourseIds.length === 0) {
    return NextResponse.json(
      { error: "selectedCourseIds must be a non-empty array." },
      { status: 400 },
    );
  }

  const eligible = new Set(eligibleCoursesCsv.split(",").map((s) => s.trim()).filter(Boolean));
  const eligibleEnrollMap = new Map<string, string>();
  eligibleCoursesCsv.split(",").forEach((cId, idx) => {
    const eId = eligibleEnrollmentsCsv.split(",")[idx]?.trim() ?? "";
    eligibleEnrollMap.set(cId.trim(), eId);
  });

  const deduped = [...new Set(
    (body.selectedCourseIds as unknown[])
      .filter((id) => typeof id === "string")
      .map((id) => (id as string).trim())
  )].slice(0, 50);

  const rejected = deduped.filter((id) => !eligible.has(id));
  if (rejected.length > 0) {
    return NextResponse.json(
      { error: `The following courses are not eligible: ${rejected.join(", ")}` },
      { status: 422 },
    );
  }

  // ── Server-side price computation ─────────────────────────────────────────
  // We need to fetch the current bundle prices for the selected courses,
  // and the target Pro bundle price, then compute the difference.
  
  const adminDb = makeAdminClient();
  const p2Db = adminDb.schema("phase2") as any;

  // Fetch the target bundle price
  const { data: targetBundleData } = await p2Db
    .from("bundles")
    .select("price")
    .eq("id", proBundleId)
    .maybeSingle();
  const targetPrice = targetBundleData?.price ?? 0;

  // Fetch the user's current enrollments for the selected courses to get their current bundle_id
  const { data: currentEnrollments } = await p2Db
    .from("enrollments")
    .select("course_id, bundle_id")
    .eq("user_id", phase2UserId)
    .in("course_id", deduped)
    .in("status", ["active", "grace_period"]);

  const currentBundleIds = [...new Set((currentEnrollments || []).map((e: any) => e.bundle_id).filter(Boolean))];
  const { data: currentBundlesData } = await p2Db
    .from("bundles")
    .select("id, price")
    .in("id", currentBundleIds);
  
  const currentBundlePriceMap = new Map<string, number>(
    (currentBundlesData || []).map((b: any) => [String(b.id), Number(b.price) || 0])
  );

  let totalInr = 0;
  for (const courseId of deduped) {
    const enrollment = (currentEnrollments || []).find((e: any) => String(e.course_id) === String(courseId));
    const currentPrice = enrollment?.bundle_id ? (currentBundlePriceMap.get(String(enrollment.bundle_id)) ?? 0) : 0;
    const priceDiff = targetPrice - currentPrice;
    
    // Fallback to PRO_UPGRADE_PRICE_INR if diff is negative or 0
    totalInr += (priceDiff > 0) ? priceDiff : PRO_UPGRADE_PRICE_INR;
  }

  const totalPaise = totalInr * 100;

  const selectedCourseIds  = deduped.join(",");
  const selectedEnrollmentIds = deduped.map((id) => eligibleEnrollMap.get(id) ?? "").join(",");

  // ── Create Razorpay order ─────────────────────────────────────────────────
  const razorpay = new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET });
  const receipt = `pupg-${phase2UserId.slice(0, 8)}-${Date.now()}`.slice(0, 40);

  let rzpOrder: any;
  try {
    rzpOrder = await razorpay.orders.create({
      amount:   totalPaise,
      currency: "INR",
      receipt,
      notes: {
        upgrade_type:    "portal_pro_upgrade",
        auth_user_id:    authUserId.slice(0, 256),
        phase2_user_id:  phase2UserId.slice(0, 256),
        course_ids:      selectedCourseIds.slice(0, 256),
        enrollment_ids:  selectedEnrollmentIds.slice(0, 256),
        pro_bundle_id:   proBundleId.slice(0, 256),
      },
    });
  } catch (err: any) {
    console.error("[create-upgrade-order] Razorpay error:", err?.message ?? err);
    return NextResponse.json(
      { error: "Failed to create payment order. Please try again." },
      { status: 502 },
    );
  }

  // ── Persist a pending order row for idempotent verify-payment ────────────
  const { error: orderErr } = await p2Db.from("orders").insert({
    user_id:           phase2UserId,
    razorpay_order_id: rzpOrder.id,
    amount:            totalInr,
    status:            "pending",
    // Store upgrade context so verify-payment can retrieve it server-side
    // without trusting the browser callback body.
    additional_comments: JSON.stringify({
      upgrade_type:    "portal_pro_upgrade",
      course_ids:      selectedCourseIds,
      enrollment_ids:  selectedEnrollmentIds,
      pro_bundle_id:   proBundleId,
    }),
  });

  if (orderErr) {
    // Log but don't block — idempotency fallback via Razorpay notes
    console.warn(
      "[create-upgrade-order] Could not persist pending order:",
      orderErr.message,
    );
  }

  return NextResponse.json({
    orderId:             rzpOrder.id,
    keyId:               RAZORPAY_KEY_ID,
    totalInr,
    selectedCourseIds,
    selectedEnrollmentIds,
    proBundleId,
  });
}
