import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { data } = await req.json();
  const supabase = await createClient();
  const { error } = await supabase.from("user").upsert([
    {
      id: data.user?.id,
      username: data.user?.user_metadata?.username,
      email: data.user?.email,
      role: data.user?.user_metadata?.role,
    },
  ]);

  if (error) {
    const url = req.nextUrl.clone();
    url.pathname = "/app/dashboard";
    console.log(url.href);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  const url = req.nextUrl.clone();
  url.pathname = "/auth/verify";
  return NextResponse.redirect(url.href);
}
