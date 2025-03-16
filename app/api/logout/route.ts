import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const method = req.headers.get("scope") as "global" | "local" | "others";
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut({ scope: method });
  if (error) {
    console.log(error);
  }
  return redirect("/auth/login");
}
