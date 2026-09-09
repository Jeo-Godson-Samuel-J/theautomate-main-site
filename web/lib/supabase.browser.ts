import { createClient } from "@supabase/supabase-js";

// Ensure these environment variables are set in .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create a single browser-side Supabase client
export const supabaseBrowser = createClient(supabaseUrl, supabaseAnonKey);
