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
  section_id?: string | null;
  module_type?: string;
  type?: string;
}

export interface CourseSection {
  id: string;
  title: string;
  order_index: number;
}

export async function getCourseModules(
  productUuid: string,
  courseTitle?: string
): Promise<{ modules: CourseModule[]; sections: CourseSection[] }> {
  try {
    const supabase = getClient();
    let courses: { id: string }[] | null = null;
    let courseError: any = null;

    if (productUuid) {
      // Fetch all courses for this product, ordered by creation date
      const { data: coursesData, error: err } = await supabase
        .from("maincourses")
        .select("id")
        .eq("product_id", productUuid)
        .order("created_at", { ascending: true });
      courses = coursesData as { id: string }[] | null;
      courseError = err;
    }

    // If productUuid was missing or returned no courses, fallback to matching maincourses by title
    if ((!courses || courses.length === 0) && courseTitle) {
      const cleanTitle = courseTitle.split(" ")[0] || courseTitle; // e.g. "Playwright" from "Playwright Course"
      const { data: titleCourses } = await supabase
        .from("maincourses")
        .select("id")
        .ilike("title", `%${cleanTitle}%`)
        .order("created_at", { ascending: true });

      if (titleCourses && titleCourses.length > 0) {
        courses = titleCourses as { id: string }[];
      }
    }

    if (courseError || !courses || courses.length === 0) {
      if (productUuid) {
        // Fallback: perhaps the productUuid is actually a maincourse_id from an older setup
        const { data: fallbackModules, error: fallbackError } = await supabase
          .from("coursemodules")
          .select("id, title, duration, order_index, description, thumbnail_url, video_cf_id, section_id, module_type")
          .eq("maincourse_id", productUuid)
          .order("order_index", { ascending: true, nullsFirst: false });

        if (!fallbackError && fallbackModules && fallbackModules.length > 0) {
          // Also fetch fallback sections just in case
          const { data: fallbackSections } = await supabase
            .from("course_sections")
            .select("id, title, order_index")
            .eq("maincourse_id", productUuid)
            .order("order_index", { ascending: true });
          
          return { modules: fallbackModules, sections: fallbackSections || [] };
        }
      }

      return { modules: [], sections: [] };
    }

    // Find the first course that actually has modules
    for (const course of courses) {
      const { data, error } = await supabase
        .from("coursemodules")
        .select("id, title, duration, order_index, description, thumbnail_url, video_cf_id, section_id, module_type")
        .eq("maincourse_id", course.id)
        .order("order_index", { ascending: true, nullsFirst: false });

      if (!error && data && data.length > 0) {
        const { data: sectionData } = await supabase
          .from("course_sections")
          .select("id, title, order_index")
          .eq("maincourse_id", course.id)
          .order("order_index", { ascending: true });

        return { modules: data, sections: sectionData || [] };
      }
    }

    return { modules: [], sections: [] };
  } catch (err) {
    console.error(
      `[module.service] Unexpected error for product ${productUuid}:`,
      err
    );
    return { modules: [], sections: [] };
  }
}
