import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { createClient } from "@/lib/supabase/server";

export const runtime = "edge";

export type JWTData = {
  user: { id: string; email: string; user_metadata: { role: string } };
};

export async function GET(req: NextRequest) {
  const cookieStore = req.cookies.get("sb-rkfifpyhasyitjkurmzf-auth-token");
  if (cookieStore === undefined) {
    return NextResponse.json({ error: "No token found" }, { status: 400 });
  }
  const value = cookieStore.value;
  const token = value.split("base64-")[1];
  const decoded: JWTData = jwtDecode(token, { header: true });
  const { id } = await extract(decoded);
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("project_list")
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  if (data.length === 0) {
    return NextResponse.json(data, { status: 200 });
  }
  return NextResponse.json(data[0].project_list, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { id, projects, newProject } = await req.json();
  const supabase = await createClient();
  const projectValue = [...projects, newProject];

  const { data, error } = await supabase.from("projects").upsert({
    id: id,
    project_list: projectValue,
    created_at: new Date().toISOString(),
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json(data, { status: 200 });
}

async function extract(decoded: JWTData) {
  const data = {
    id: decoded.user.id,
    email: decoded.user.email,
    role: decoded.user.user_metadata.role,
  };
  return data;
}
