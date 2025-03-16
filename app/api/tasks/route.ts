import { createClient } from "@/lib/supabase/server";
import { jwtDecode } from "jwt-decode";
import { JWTData } from "../projects/route";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const cookieStore = req.cookies.get("sb-rkfifpyhasyitjkurmzf-auth-token");
  if (cookieStore === undefined) {
    return NextResponse.json({ error: "No token found" }, { status: 400 });
  }
  const value = cookieStore.value;
  const token = value.split("base64-")[1];
  const decoded: JWTData = jwtDecode(token, { header: true });
  const { id } = await extract(decoded);
  const supabase = await createClient();
  const {} = await supabase.from("tasks").select("*").eq("id", id);
  return NextResponse.json({}, { status: 200 });
}

async function extract(decoded: JWTData) {
  const data = {
    id: decoded.user.id,
    email: decoded.user.email,
    role: decoded.user.user_metadata.role,
  };
  return data;
}
