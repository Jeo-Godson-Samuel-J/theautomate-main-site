import { NextResponse } from "next/server";
import { client } from "@/lib/sanity.client";
import { makeAdminClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const directProductId = searchParams.get("productId") || searchParams.get("productUuid");

  if (!slug && !directProductId) {
    return NextResponse.json(
      { error: "Course slug or productId is required" },
      { status: 400 }
    );
  }

  try {
    let targetUuid: string | null = directProductId ? String(directProductId).trim() : null;
    let courseTitle = "";

    // 1. If slug is provided, check course in Sanity
    if (slug) {
      const course = await client.fetch(
        `*[_type == "courseDetails" && slug.current == $slug][0]{
          _id,
          title,
          productUuid,
          productId,
          useExistingProduct
        }`,
        { slug },
        { cache: "no-store" }
      );

      if (!course) {
        return NextResponse.json({
          exists: false,
          courseFound: false,
          title: "",
          slug,
          message: "This is an Upcoming Product",
        });
      }

      courseTitle = course.title || "";
      const rawProductId = course.productUuid || course.productId;
      if (rawProductId && typeof rawProductId === "string" && rawProductId.trim().length > 0) {
        targetUuid = rawProductId.trim();
      } else {
        targetUuid = null;
      }
    }

    // If no product ID is configured or found, product does not exist in public.products
    if (!targetUuid) {
      return NextResponse.json({
        exists: false,
        courseFound: true,
        productId: null,
        title: courseTitle,
        slug,
        isPortalProduct: false,
        message: "This is an Upcoming Product",
      });
    }

    // 2. Verify whether the product exists in automate-learning-portal (Supabase public.products)
    let productExistsInPortal = false;

    try {
      const supabase = makeAdminClient();
      const { data: productRow, error: dbErr } = await supabase
        .from("products")
        .select("id, is_active")
        .eq("id", targetUuid)
        .maybeSingle();

      if (!dbErr && productRow && productRow.is_active !== false) {
        productExistsInPortal = true;
      }
    } catch (dbError) {
      console.error("[api/courses/check-product] Supabase verification error:", dbError);
    }

    return NextResponse.json({
      exists: productExistsInPortal,
      courseFound: true,
      productId: targetUuid,
      title: courseTitle,
      slug,
      isPortalProduct: productExistsInPortal,
      message: productExistsInPortal
        ? "Active product found in Learning Portal"
        : "This is an Upcoming Product",
    });
  } catch (error: any) {
    console.error("[api/courses/check-product] Error querying Sanity/Supabase:", error);
    return NextResponse.json(
      {
        error: "Failed to check course product",
        details: error?.message || "Unknown error",
        message: "This is an Upcoming Product",
      },
      { status: 500 }
    );
  }
}
