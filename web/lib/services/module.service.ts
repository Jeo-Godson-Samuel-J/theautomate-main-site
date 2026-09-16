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
}

export async function getCourseModules(
  productUuid: string
): Promise<CourseModule[]> {
  if (!productUuid) return [];

  try {
    const supabase = getClient();
    const { data, error } = await supabase
      .from("coursemodules")
      .select("id, title, duration, order_index")
      .eq("maincourse_id", productUuid)
      .order("order_index", { ascending: true, nullsFirst: false });

    if (error) {
      console.error(
        `[module.service] Failed to fetch modules for product ${productUuid}:`,
        error.message
      );
      return [];
    }

    return data || [];
  } catch (err) {
    console.error(
      `[module.service] Unexpected error for product ${productUuid}:`,
      err
    );
    return [];
  }
}
