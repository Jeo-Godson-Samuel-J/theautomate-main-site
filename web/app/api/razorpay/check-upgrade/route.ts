import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const {
      email,
      productUuid: providedProductUuid,
      targetBundleTitle,
      targetBundlePrice,
    } = await req.json();

    if (!email || !targetBundleTitle || targetBundlePrice === undefined) {
      return NextResponse.json(
        {
          error:
            "Email, targetBundleTitle, and targetBundlePrice are required.",
        },
        { status: 400 },
      );
    }

    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
      db: { schema: "phase2" },
    });

    const fullPrice = targetBundlePrice;

    // Helper to determine hierarchy
    const getTierLevel = (name: string) => {
      const lower = name.toLowerCase();
      if (lower.includes("premium") || lower.includes("live sessions"))
        return 3;
      if (lower.includes("pro")) return 2;
      return 1; // Default to Starter
    };

    // 1. Find user by email
    const supabasePublic = createClient(
      SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY,
    );
    const { data: profile } = await supabasePublic
      .from("profiles")
      .select("id")
      .eq("email", email.toLowerCase().trim())
      .maybeSingle();

    if (!profile)
      return NextResponse.json({ eligible: false, price: fullPrice });

    // 2. Find phase2 user_id
    const { data: phase2User } = await supabase
      .from("users")
      .select("id")
      .eq("auth_user_id", profile.id)
      .maybeSingle();

    if (!phase2User)
      return NextResponse.json({ eligible: false, price: fullPrice });

    // 3. Find active enrollment for this course, or any Starter course if productUuid is missing
    let enrollmentQuery = supabase
      .from("enrollments")
      .select("*, bundles(bundle_name)")
      .eq("user_id", phase2User.id)
      .eq("status", "active");

    if (providedProductUuid) {
      enrollmentQuery = enrollmentQuery.or(
        `course_id.eq.${providedProductUuid},product_id.eq.${providedProductUuid}`,
      );
    }

    const { data: enrollments, error: enrollmentsError } =
      await enrollmentQuery;

    if (!enrollments || enrollments.length === 0)
      return NextResponse.json({ eligible: false, price: fullPrice });

    // Instead of just one enrollment, we gather all eligible enrollments
    const targetLevel = getTierLevel(targetBundleTitle);
    
    // We intentionally don't filter by providedProductUuid if we want to show all courses
    // that are eligible for upgrade, as requested by the user.
    const eligibleEnrollments = enrollments.filter((e) => {
      const bName = (e.bundles as any)?.bundle_name || "Starter";
      return getTierLevel(bName) < targetLevel;
    });

    if (eligibleEnrollments.length === 0) {
      return NextResponse.json({
        eligible: false,
        price: fullPrice,
        message: "No eligible enrollment found to upgrade from.",
      });
    }

    // Prepare arrays to fetch data in parallel
    const eligibleCoursesData = [];
    let earliestAccessDate = new Date();
    let maxDiffHours = 0;
    
    // Fallback variables for the primary course
    let primaryResolvedCourseId = "";
    let primaryResolvedProductUuid = "";
    let primaryResolvedCourseTitle = "";
    let primaryResolvedBatchType = "recorded";
    let primaryUpgradePrice = fullPrice;
    
    for (const enrollment of eligibleEnrollments) {
      const resolvedCourseId = enrollment.course_id;
      const resolvedProductUuid = enrollment.product_id || enrollment.course_id;
      const resolvedBatchType = enrollment.batch_type || "recorded";

      // Fetch product title directly
      const { data: productData } = await supabasePublic
        .from("products")
        .select("title")
        .eq("id", resolvedProductUuid)
        .maybeSingle();

      let resolvedCourseTitle = productData?.title;

      if (!resolvedCourseTitle) {
        const { data: courseData } = await supabasePublic
          .from("maincourses")
          .select("title")
          .eq("id", resolvedCourseId)
          .maybeSingle();
        resolvedCourseTitle = courseData?.title || "Your Course";
      }

      const accessStartDate = new Date(enrollment.access_start_date || enrollment.created_at);
      const diffHours = (new Date().getTime() - accessStartDate.getTime()) / (1000 * 60 * 60);
      if (diffHours > maxDiffHours) maxDiffHours = diffHours;
      if (accessStartDate < earliestAccessDate) earliestAccessDate = accessStartDate;

      // Only allow if within 120 hours
      if (diffHours <= 120) {
        const { data: orders } = await supabase
          .from("orders")
          .select("amount, phone_number, created_at")
          .eq("user_id", phase2User.id)
          .eq("course_id", resolvedCourseId)
          .in("status", ["paid", "captured", "successful", "authorized"]);

        let totalPaid = 0;
        let resolvedPhone = "";
        if (orders && orders.length > 0) {
          totalPaid = orders.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
          const orderWithPhone = orders.find((o) => o.phone_number && o.phone_number.trim() !== "");
          if (orderWithPhone) resolvedPhone = orderWithPhone.phone_number;
        }

        const upgradePrice = Math.max(0, targetBundlePrice - totalPaid);
        
        eligibleCoursesData.push({
          courseId: resolvedProductUuid, // ID used by frontend selection
          courseTitle: resolvedCourseTitle,
          upgradePrice,
          enrollmentId: enrollment.id,
          resolvedPhone,
          resolvedBatchType,
          resolvedCourseId, // Original phase2 DB course ID
        });
      }
    }

    if (eligibleCoursesData.length === 0) {
      return NextResponse.json({
        eligible: false,
        price: fullPrice,
        message: "Outside upgrade window.",
      });
    }

    // Determine the primary course for default return values
    // Prefer the one that matches providedProductUuid, else the first one
    const primaryCourse = eligibleCoursesData.find(c => c.courseId === providedProductUuid) || eligibleCoursesData[0];


    // Skip legacy verification logic that operated on a single `enrollment`
    // (We did the same checks in the loop above)


    return NextResponse.json({
      eligible: true,
      price: primaryCourse.upgradePrice,
      timeRemainingHours: Math.max(0, 120 - maxDiffHours),
      resolvedProductUuid: primaryCourse.courseId,
      resolvedCourseTitle: primaryCourse.courseTitle,
      resolvedBatchType: primaryCourse.resolvedBatchType,
      resolvedPhone: primaryCourse.resolvedPhone || "",
      eligibleCourses: eligibleCoursesData,
    });
  } catch (error: any) {
    console.error("Error in check-upgrade:", error);
    return NextResponse.json(
      { error: error.message || "Failed to check upgrade eligibility" },
      { status: 500 },
    );
  }
}
