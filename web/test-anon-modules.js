import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function main() {
  const { data: courseModules, error } = await supabase
      .from("coursemodules")
      .select("id, title, duration, order_index")
      .limit(5);
      
  console.log("Error:", error?.message || null);
  console.log("courseModules:", courseModules);
}

main();
