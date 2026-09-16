import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

let _client: ReturnType<typeof createClient> | null = null;

function getClient() {
  if (!_client) {
    _client = createClient(supabaseUrl, supabaseAnonKey);
  }
  return _client;
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string | null;
  order_index: number;
  description?: string;
  thumbnail_url?: string;
  video_cf_id?: string;
}

export async function getCourseModules(
  productUuid: string
): Promise<CourseModule[]> {
  if (!productUuid) return [];

  try {
    const supabase = getClient();
    
    // Fetch all courses for this product, ordered by creation date
    const { data: courses, error: courseError } = await supabase
      .from("maincourses")
      .select("id")
      .eq("product_id", productUuid)
      .order("created_at", { ascending: true });

    if (courseError || !courses || courses.length === 0) {
      // Fallback: perhaps the productUuid is actually a maincourse_id from an older setup
      const { data: fallbackModules, error: fallbackError } = await supabase
        .from("coursemodules")
        .select("id, title, duration, order_index, description, thumbnail_url, video_cf_id")
        .eq("maincourse_id", productUuid)
        .order("order_index", { ascending: true, nullsFirst: false });

      if (!fallbackError && fallbackModules && fallbackModules.length > 0) {
        return fallbackModules;
      }

      console.error(
        `[module.service] Failed to find courses for product ${productUuid}:`,
        courseError?.message
      );
      return [];
    }

    // Find the first course that actually has modules
    for (const course of courses) {
      const { data, error } = await supabase
        .from("coursemodules")
        .select("id, title, duration, order_index, description, thumbnail_url, video_cf_id")
        .eq("maincourse_id", course.id)
        .order("order_index", { ascending: true, nullsFirst: false });

      if (!error && data && data.length > 0) {
        return data;
      }
    }

    return [];
  } catch (err) {
    console.error(
      `[module.service] Unexpected error for product ${productUuid}:`,
      err
    );
    return [];
  }
}
