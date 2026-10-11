import { NextResponse } from "next/server";
import { syncSanityPricesToSupabase } from "@/lib/services/plan.services";
import { makePhase2Client } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

// Helper for CORS preflight and responses
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(),
  });
}

/**
 * API route to sync Sanity plan prices to Supabase phase2.bundles table.
 * Whenever a price is changed in Sanity, calling this ensures the Supabase
 * phase2.bundles price is overwritten with Sanity's ultimate price.
 */
export async function POST(request: Request) {
  try {
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      // Empty body is acceptable; defaults to full sync
    }

    const { badge, price, bundleUuid } = body;

    // If specific badge and price provided, update that specific bundle
    if (badge && typeof price === "number") {
      const supabase = makePhase2Client();
      const targetBadge = String(badge).trim().toLowerCase();

      const { data: dbBundles, error: fetchErr } = await supabase
        .from("bundles")
        .select("id, bundle_name, price");

      if (fetchErr || !dbBundles) {
        return NextResponse.json(
          { error: "Failed to fetch Supabase bundles", details: fetchErr?.message },
          { status: 500, headers: corsHeaders() }
        );
      }

      const matchingBundle = dbBundles.find((b: any) => {
        if (bundleUuid && b.id === bundleUuid) return true;
        const bName = (b.bundle_name || "").trim().toLowerCase();
        return bName === targetBadge || bName.includes(targetBadge) || targetBadge.includes(bName);
      });

      if (!matchingBundle) {
        return NextResponse.json(
          { error: `No matching Supabase bundle found for badge "${badge}"` },
          { status: 404, headers: corsHeaders() }
        );
      }

      const oldPrice = Number(matchingBundle.price);
      const newPrice = Number(price);

      const { error: updateErr } = await supabase
        .from("bundles")
        .update({
          price: newPrice,
          updated_at: new Date().toISOString(),
        })
        .eq("id", matchingBundle.id);

      if (updateErr) {
        return NextResponse.json(
          { error: "Failed to update Supabase bundle", details: updateErr.message },
          { status: 500, headers: corsHeaders() }
        );
      }

      console.log(
        `[sync-price] Overwrote phase2.bundles "${matchingBundle.bundle_name}" price: ₹${oldPrice} -> ₹${newPrice}`
      );

      return NextResponse.json(
        {
          success: true,
          updated: {
            badge,
            bundleId: matchingBundle.id,
            bundleName: matchingBundle.bundle_name,
            oldPrice,
            newPrice,
          },
        },
        { status: 200, headers: corsHeaders() }
      );
    }

    // Default: full sync of all Sanity plans to Supabase phase2.bundles
    const result = await syncSanityPricesToSupabase();

    return NextResponse.json(
      {
        success: true,
        message: "All plan prices synced from Sanity to Supabase phase2.bundles",
        synced: result.synced,
      },
      { status: 200, headers: corsHeaders() }
    );
  } catch (error: any) {
    console.error("[api/bundles/sync-price] Error:", error);
    return NextResponse.json(
      { error: "Failed to sync price", details: error?.message },
      { status: 500, headers: corsHeaders() }
    );
  }
}

export async function GET() {
  const result = await syncSanityPricesToSupabase();
  return NextResponse.json(
    {
      success: true,
      message: "Synced all Sanity plan prices to Supabase phase2.bundles",
      synced: result.synced,
    },
    { status: 200, headers: corsHeaders() }
  );
}
