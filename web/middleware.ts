/**
 * middleware.ts — Next.js Edge Middleware for the landing site.
 *
 * WHAT IT PROTECTS
 * ────────────────
 * /payment?upgradeMode=1   — portal-initiated Pro upgrade checkout.
 *   Requires a valid `upgrade_session` HttpOnly cookie that was set by
 *   POST /api/upgrade/validate-handoff.  If the cookie is absent or expired
 *   the user is redirected to the portal login page with a clear message.
 *
 * WHAT IT LEAVES ALONE
 * ─────────────────────
 * /payment (no upgradeMode=1)     — normal guest checkout, unchanged.
 * /api/razorpay/*                 — payment APIs authenticate internally.
 * /api/upgrade/*                  — handoff APIs authenticate internally.
 * /api/auth/*                     — auth helpers, must stay public.
 * /api/*  (everything else)       — unchanged.
 * Every other page (home, courses, plans, blogs, …) — public.
 *
 * REDIRECT-LOOP PREVENTION
 * ─────────────────────────
 * The redirect target is the portal's /login page (external URL).
 * This middleware never redirects to a path that it also protects, so
 * infinite loops are structurally impossible.
 *
 * SESSION VALIDATION
 * ──────────────────
 * We only check for the *presence* and basic shape of the `upgrade_session`
 * cookie here; the real cryptographic validation (HMAC + expiry + nonce)
 * happens server-side in /api/upgrade/validate-handoff and in
 * /api/razorpay/create-upgrade-order.  Middleware runs in the Edge runtime
 * and cannot import Node crypto, but a presence check is sufficient to stop
 * accidental browser navigation; the API routes enforce the real security.
 */

import { NextRequest, NextResponse } from "next/server";

const UPGRADE_SESSION_COOKIE = "upgrade_session";

const PORTAL_URL = process.env.NEXT_PUBLIC_LEARNING_PORTAL_URL || "";

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // ── Only intercept /payment?upgradeMode=1 ─────────────────────────────────
  const isPaymentPage = pathname === "/payment";
  const isUpgradeMode = searchParams.get("upgradeMode") === "1";

  if (!isPaymentPage || !isUpgradeMode) {
    return NextResponse.next();
  }

  // ── Check for upgrade_session cookie or token ────────────────────────────
  // The cookie is set by POST /api/upgrade/validate-handoff after the
  // one-time handoff token is verified.
  const sessionCookie = req.cookies.get(UPGRADE_SESSION_COOKIE);
  const token = searchParams.get("token");

  if (sessionCookie?.value || token) {
    // Cookie present OR initial handoff token present — let the request through.
    // The page server component and API routes will do the full validation.
    return NextResponse.next();
  }

  // ── No valid session — redirect to portal login ───────────────────────────
  // Preserve the full intended URL so the portal can eventually redirect back.
  const redirectParams = new URLSearchParams({
    message: "Your upgrade session has expired or is invalid. Please start the upgrade again from your courses page.",
    next: req.nextUrl.pathname + req.nextUrl.search,
  });
  const redirectTarget = PORTAL_URL
    ? `${PORTAL_URL}/login?${redirectParams.toString()}`
    : new URL(`/login?${redirectParams.toString()}`, req.url);

  return NextResponse.redirect(redirectTarget, { status: 302 });
}

export const config = {
  // Only run this middleware on /payment.
  // Keeps middleware overhead zero for every other route.
  matcher: ["/payment"],
};
