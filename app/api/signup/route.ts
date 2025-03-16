import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { username, email, password } = await req.json();
  if (!username || !email || !password) {
    return new Response("Username and password are required", { status: 400 });
  }
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        role: "user",
        username: username,
      },
    },
  });
  if (error) {
    return new Response("Error: " + error, { status: 500 });
  }
  await fetch(`${process.env.DOMAIN}/api/user`, {
    method: "POST",
    body: JSON.stringify({ data }),
  });

  return NextResponse.json({ data: "User created" }, { status: 200 });
}
