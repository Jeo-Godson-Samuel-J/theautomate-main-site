import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export async function POST(req: Request) {
  try {
    const { email, authUserId, name } = await req.json();

    if (!email || !authUserId) {
      return NextResponse.json(
        { success: false, error: "Missing email or authUserId" },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const fullName = (name || "").trim() || cleanEmail.split("@")[0];

    // 1. Sync Phase 2 landing_users
    const { error: landingError } = await supabaseAdmin
      .schema("phase2")
      .from("landing_users")
      .upsert(
        { id: authUserId, email: cleanEmail, created_at: new Date().toISOString() },
        { onConflict: "id" }
      );

    if (landingError) {
      console.error("[sync-landing-user] Landing Users Error:", landingError);
    }

    // 2. Sync Learning Portal profile (public.profiles)
    // The Learning portal reads full_name from public.profiles
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .upsert(
        {
          id: authUserId,
          email: cleanEmail,
          full_name: fullName,
          role: "user",
          created_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

    if (profileError) {
      console.error("[sync-landing-user] Profiles Error:", profileError);
    }

    // 3. Sync Landing Site / Phase 2 user (phase2.users)
    // The Landing site and checkout use phase2.users where username is the user's username
    const { data: existingP2User } = await supabaseAdmin
      .schema("phase2")
      .from("users")
      .select("id")
      .or(`auth_user_id.eq.${authUserId},email.eq.${cleanEmail}`)
      .maybeSingle();

    if (existingP2User) {
      const { error: updateP2Error } = await supabaseAdmin
        .schema("phase2")
        .from("users")
        .update({
          auth_user_id: authUserId,
          username: fullName,
          email: cleanEmail,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingP2User.id);

      if (updateP2Error) {
        console.error("[sync-landing-user] Phase2 Users Update Error:", updateP2Error);
      }
    } else {
      const { error: insertP2Error } = await supabaseAdmin
        .schema("phase2")
        .from("users")
        .insert({
          auth_user_id: authUserId,
          email: cleanEmail,
          username: fullName,
          role: "user",
        });

      if (insertP2Error) {
        console.error("[sync-landing-user] Phase2 Users Insert Error:", insertP2Error);
      }
    }

    // 4. Update auth user metadata so session & JWT reflect the name
    try {
      await supabaseAdmin.auth.admin.updateUserById(authUserId, {
        user_metadata: {
          full_name: fullName,
          name: fullName,
          username: fullName,
        },
      });
    } catch (metaErr) {
      console.warn("[sync-landing-user] Auth Metadata Update Warning:", metaErr);
    }

    return NextResponse.json({
      success: true,
      user: {
        id: authUserId,
        email: cleanEmail,
        username: fullName,
        full_name: fullName,
      },
    });
  } catch (error: any) {
    console.error("[sync-landing-user] Unexpected Error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
