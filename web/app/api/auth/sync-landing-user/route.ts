import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export async function POST(req: Request) {
  try {
    const { email, authUserId } = await req.json();

    if (!email || !authUserId) {
      return NextResponse.json(
        { success: false, error: "Missing email or authUserId" },
        { status: 400 }
      );
    }

    // Insert into phase2.landing_users
    // We use ON CONFLICT DO NOTHING in case it already exists
    const { error } = await supabaseAdmin
      .schema("phase2")
      .from("landing_users")
      .upsert(
        { id: authUserId, email, created_at: new Date().toISOString() },
        { onConflict: "id" }
      );

    if (error) {
      console.error("[sync-landing-user] DB Error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to sync user" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[sync-landing-user] Unexpected Error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
