/**
 * lib/supabase/server.ts
 *
 * Server-side Supabase client for the landing site.
 *
 * The landing site does not have @supabase/ssr installed, so we create a
 * plain service-role admin client here.  This module is used exclusively
 * in API route handlers and middleware (never in client components).
 *
 * For session-validation purposes (checking whether a Supabase JWT issued by
 * the shared project is valid) we use createClient with the anon key and call
 * auth.getUser(token) — Supabase validates the JWT server-side without needing
 * a cookie-based SSR client.
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * Verify a Supabase access token and return the authenticated user.
 * Uses the anon key client — safe to call from any server context.
 * Returns null if the token is invalid or expired.
 */
export async function getUserFromToken(accessToken: string) {
  if (!accessToken) return null;
  const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const {
    data: { user },
    error,
  } = await client.auth.getUser(accessToken);
  if (error || !user) return null;
  return user;
}

/**
 * Service-role admin client.  Only use in trusted server-side code.
 * Never import this in a client component or expose to the browser.
 */
export function makeAdminClient() {
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

/**
 * phase2-schema admin client — convenience wrapper that sets db.schema.
 */
export function makePhase2Client() {
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
    db: { schema: "phase2" },
  });
}
