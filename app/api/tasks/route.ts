import { createClient } from "@/lib/supabase/server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { JWTData } from "../projects/route";
import { NextRequest, NextResponse } from "next/server";

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

export async function GET(req: Request) {
  const userId = req.headers.get("user-id");
  if (!userId) {
    (await cookies()).set("user-id", "jackwaghan", {
      domain: "localhost",
      httpOnly: true,
      secure: true,
      path: "/",
      expires: new Date(Date.now() + 1000 * 60),
      sameSite: "strict",
    });
    return new Response("User ID is required", { status: 400 });
  }
  return new Response(JSON.stringify(tasks[userId]), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT(req: Response) {
  const { id, title, priority, dueDate, status } = await req.json();
  const userId = req.headers.get("user-id");
  if (!userId) {
    return new Response("User ID is required", { status: 400 });
  }
  const taskIndex = tasks[userId].findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    return new Response("Task not found", { status: 404 });
  }
  tasks[userId][taskIndex] = {
    id: id,
    title: title,
    priority: priority,
    dueDate: dueDate,
    status: status,
  };
  return new Response(JSON.stringify(tasks[userId]), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  const userId = req.headers.get("user-id");
  if (!userId) {
    return new Response("User ID is required", { status: 400 });
  }
  const taskIndex = tasks[userId].findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    return new Response("Task not found", { status: 404 });
  }
  tasks[userId].splice(taskIndex, 1);
  return new Response(JSON.stringify(tasks[userId]), {
    headers: { "Content-Type": "application/json" },
  });
}

//  In the code above, we have defined a simple in-memory data store to store tasks. We have defined four functions to handle different HTTP methods.
//  POST  - To create a new task GET  - To get all tasks PUT  - To update a task DELETE  - To delete a task
//  Now, let's define the routes in the  app/api/index.ts  file.

async function extract(decoded: JWTData) {
  const data = {
    id: decoded.user.id,
    email: decoded.user.email,
    role: decoded.user.user_metadata.role,
  };
  return data;
}
