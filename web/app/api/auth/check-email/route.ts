import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    // Search for the user in Supabase Auth
    // Use listUsers with a search query to check if the user exists
    // The admin API requires pagination or searching
    // We fetch a batch and see if any matches perfectly, 
    // or just search directly if possible. 
    // Supabase admin listUsers doesn't have a direct "getByEmail" unfortunately 
    // in older sdks without a workaround, wait, getUserById exists. 
    // Actually, we can just check if they are in phase2.landing_users or profiles or users!
    // But since the user is signing up on the landing page, we'll check phase2.landing_users or profiles.
    
    // Better way: Check if the email exists in auth.users using RPC if available, or just check our tables.
    // Let's check our database tables first to see if they are a known user.
    // However, if they exist in auth but not our tables, we might get an error when they sign up.
    // To be perfectly safe, we can try to call admin.listUsers({ page: 1, perPage: 1000 }) 
    // but that doesn't scale.
    // Instead, Supabase JS has no direct admin.getUserByEmail. We can use a query to public.profiles, phase2.users, and phase2.landing_users.

    const [{ data: inProfiles }, { data: inUsers }, { data: inLanding }] = await Promise.all([
      supabaseAdmin.from("profiles").select("id").eq("email", email).maybeSingle(),
      supabaseAdmin.from("users").select("id").eq("email", email).maybeSingle(),
      supabaseAdmin.schema("phase2").from("landing_users").select("id").eq("email", email).maybeSingle()
    ]);

    const exists = !!(inProfiles || inUsers || inLanding);

    return NextResponse.json({ success: true, exists });

  } catch (error: any) {
    console.error("[check-email] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to check email" },
      { status: 500 }
    );
  }
}
