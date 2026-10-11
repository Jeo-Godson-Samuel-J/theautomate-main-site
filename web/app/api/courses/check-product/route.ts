import { NextResponse } from "next/server";
import { client } from "@/lib/sanity.client";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(
      { error: "Course slug is required" },
      { status: 400 }
    );
  }

  try {
    // Check directly in Sanity if the course document has a linked product id (productUuid or productId)
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
        message: "Course not found in Sanity",
      });
    }

    const rawProductId = course.productUuid || course.productId;
    const hasProductId = Boolean(
      rawProductId && typeof rawProductId === "string" && rawProductId.trim().length > 0
    );

    return NextResponse.json({
      exists: hasProductId,
      courseFound: true,
      productId: hasProductId ? String(rawProductId).trim() : null,
      title: course.title || "",
      slug,
    });
  } catch (error: any) {
    console.error("[api/courses/check-product] Error querying Sanity:", error);
    return NextResponse.json(
      {
        error: "Failed to check course in Sanity",
        details: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
