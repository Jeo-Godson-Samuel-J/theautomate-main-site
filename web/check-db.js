import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function checkFk() {
  console.log("Fetching foreign key constraint definition...");
  
  // We can query the PostgreSQL pg_catalog if we have RPC, or we can just run an invalid insert and look at the exact details
  const supabasePhase2 = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { db: { schema: "phase2" } });
  
  const { data: p2courses, error: p2err1 } = await supabasePhase2
    .from("courses")
    .select("id")
    .eq("id", "a20543be-6ea4-47cb-85e6-3a6eec7f7808");
  if (p2err1) console.error("Error querying phase2 courses:", p2err1);
  else console.log(`Found ${p2courses.length} courses in phase2 schema.`);

  // Let's get a real user ID from phase2 to bypass the user_id constraint
  const { data: realUser } = await supabasePhase2.from("users").select("id").limit(1).single();
  const validUserId = realUser ? realUser.id : "00000000-0000-0000-0000-000000000000";

  console.log("Direct Insert with valid user_id:", validUserId);
  const { data, error } = await supabasePhase2
    .from("orders")
    .insert({
       user_id: validUserId,
       course_id: "a20543be-6ea4-47cb-85e6-3a6eec7f7808", // Valid course ID
       bundle_id: "350edd44-752b-454a-8bf3-0ffb1915fd78", // Valid bundle ID
       razorpay_order_id: "test",
       razorpay_payment_id: "test",
       razorpay_signature: "test",
       amount: 100,
       status: "paid"
    });
    
  console.log("Direct Insert Error:", JSON.stringify(error, null, 2));
}

checkFk();
