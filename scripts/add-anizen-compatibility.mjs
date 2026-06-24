import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
dotenv.config({ path: path.join(ROOT, ".env") });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("❌ Error: Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
  console.log("Please define SUPABASE_SERVICE_ROLE_KEY=\"your-key\" in your .env file to update the database.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function run() {
  console.log("Fetching extension...");
  const { data: ext, error: fetchError } = await supabase
    .from("extensions")
    .select("compatible_with")
    .eq("slug", "sb-aniyomi-repo")
    .single();

  if (fetchError || !ext) {
    console.error("❌ Error fetching extension:", fetchError?.message || "Not found");
    process.exit(1);
  }

  const compatible = [...(ext.compatible_with || [])];
  if (!compatible.includes("AniZen")) {
    compatible.push("AniZen");
    console.log("Updating compatible_with to:", compatible);

    const { error: updateError } = await supabase
      .from("extensions")
      .update({ compatible_with: compatible })
      .eq("slug", "sb-aniyomi-repo");

    if (updateError) {
      console.error("❌ Error updating extension:", updateError.message);
      process.exit(1);
    }
    console.log("✅ Successfully updated SalmanBappi's Aniyomi Repo to support AniZen in production database!");
  } else {
    console.log("ℹ️ AniZen is already marked as compatible in database.");
  }
}

run();
