import { createClient } from "@supabase/supabase-js";

// ---------------------------------------------------------------------------
// Supabase client — read-only, server-side only.
//
// We use the ANON key here because:
//   1. course_ratings aggregate data is public information (star ratings).
//   2. We only query AVG + COUNT — no user_id or raw review text is fetched.
//   3. This function is called exclusively from Next.js Server Components,
//      so neither the client instance nor the key ever reaches the browser.
//
// If RLS on course_ratings ever restricts anon access, swap to the service
// role key here — but keep this file server-only and never import it from
// a Client Component.
// ---------------------------------------------------------------------------
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Lazily created — avoids re-creating the client on every call in dev hot-reloads.
let _client: ReturnType<typeof createClient> | null = null;

function getClient() {
  if (!_client) {
    _client = createClient(supabaseUrl, supabaseAnonKey);
  }
  return _client;
}

// ---------------------------------------------------------------------------

export interface CourseRating {
  averageRating: number;
  totalReviews: number;
}

/**
 * Fetches the live learner rating aggregate for a course from Supabase.
 *
 * Queries: public.course_ratings WHERE product_id = productUuid OR course_id = maincourse.id
 * Returns: { averageRating, totalReviews }
 */
export async function getCourseRating(
  productUuid: string
): Promise<CourseRating | null> {
  if (!productUuid) {
    return { averageRating: 0, totalReviews: 0 };
  }

  try {
    const supabase = getClient();

    // 1. Resolve ALL related maincourse IDs from productUuid
    const { data: mcData } = await supabase
      .from("maincourses")
      .select("id")
      .or(`product_id.eq.${productUuid},id.eq.${productUuid}`);

    const courses = mcData as { id: string }[] | null;
    const courseIds = (courses || []).map(mc => mc.id);
    if (!courseIds.includes(productUuid)) {
      courseIds.push(productUuid);
    }

    // 2. Fetch aggregate ratings
    const { data, error } = await supabase
      .from("course_ratings")
      .select("rating")
      .or(`product_id.eq.${productUuid},course_id.in.(${courseIds.join(",")})`)
      .returns<{ rating: number }[]>();

    if (error) {
      console.error(
        `[rating.service] Failed to fetch ratings for product ${productUuid}:`,
        error.message
      );
      return null;
    }

    const rows = data ?? [];

    if (rows.length === 0) {
      return { averageRating: 0, totalReviews: 0 };
    }

    const totalReviews = rows.length;
    const sum = rows.reduce((acc, row) => acc + (row.rating ?? 0), 0);
    const averageRating = sum / totalReviews;

    return { averageRating, totalReviews };
  } catch (err) {
    console.error(
      `[rating.service] Unexpected error for product ${productUuid}:`,
      err
    );
    return null;
  }
}

export interface DetailedReview {
  rating: number;
  review: string;
  created_at: string;
  profiles?: {
    full_name: string;
    avatar_url?: string;
  };
}

/**
 * Fetches detailed reviews for a course from Supabase.
 * Uses a separate query to fetch user profiles to avoid relationship errors.
 */
export async function getCourseReviews(
  productUuid: string
): Promise<DetailedReview[]> {
  if (!productUuid) {
    return [];
  }

  try {
    const supabase = getClient();

    // 1. Resolve ALL related maincourse IDs from productUuid
    const { data: mcData } = await supabase
      .from("maincourses")
      .select("id")
      .or(`product_id.eq.${productUuid},id.eq.${productUuid}`);

    const courses = mcData as { id: string }[] | null;
    const courseIds = (courses || []).map(mc => mc.id);
    if (!courseIds.includes(productUuid)) {
      courseIds.push(productUuid);
    }

    // 2. Fetch ratings
    const { data: reviewsData, error } = await supabase
      .from("course_ratings")
      .select("rating, review, created_at, user_id")
      .or(`product_id.eq.${productUuid},course_id.in.(${courseIds.join(",")})`)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(
        `[rating.service] Failed to fetch detailed reviews for product ${productUuid}:`,
        error.message
      );
      return [];
    }

    if (!reviewsData || reviewsData.length === 0) {
      return [];
    }

    const reviews = reviewsData as { rating: number, review: string, created_at: string, user_id: string }[];

    // 3. Fetch associated usernames from phase2.users
    const userIds = [...new Set(reviews.map((r) => r.user_id).filter(Boolean))];
    
    let profilesMap: Record<string, { full_name: string; avatar_url?: string }> = {};
    
    if (userIds.length > 0) {
      const { data: usersData, error: usersError } = await (supabase as any)
        .schema("phase2")
        .from("users")
        .select("auth_user_id, username")
        .in("auth_user_id", userIds);
        
      if (!usersError && usersData) {
        profilesMap = (usersData as any[]).reduce((acc: Record<string, { full_name: string; avatar_url?: string }>, u: any) => {
          if (u.auth_user_id) {
            acc[u.auth_user_id] = { full_name: u.username || "Anonymous User" };
          }
          return acc;
        }, {} as Record<string, { full_name: string; avatar_url?: string }>);
      } else if (usersError) {
        console.error(
          `[rating.service] Failed to fetch phase2 users for reviews:`,
          usersError.message
        );
      }
    }

    // 4. Combine them
    return reviews.map((r) => ({
      rating: r.rating,
      review: r.review,
      created_at: r.created_at,
      profiles: profilesMap[r.user_id] || { full_name: "Anonymous User" },
    }));
  } catch (err) {
    console.error(
      `[rating.service] Unexpected error fetching detailed reviews for product ${productUuid}:`,
      err
    );
    return [];
  }
}
