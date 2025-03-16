"use client";
import { redirect } from "next/navigation";
import React from "react";
const Form = () => {
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const response = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      setLoading(false);
      redirect("/app/dashboard");
    } else {
      setLoading(false);
      console.error("Login failed");
    }
  };
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="w-[300px] flex flex-col gap-2 p-8 rounded-lg border border-foreground/15"
    >
      <label htmlFor="username">Username</label>
      <input
        type="username"
        id="username"
        name="username"
        className="bg-foreground/10 rounded border-foreground/20 focus:outline-none  px-2 py-1 mt-2"
      />
      <label htmlFor="email" className="mt-4">
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        className="bg-foreground/10 rounded border-foreground/20 focus:outline-none  px-2 py-1 mt-2"
      />
      <label htmlFor="password" className="mt-4">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        className="bg-foreground/10 rounded border-foreground/20 focus:outline-none  px-2 py-1 mt-2"
      />
      <button
        type="submit"
        className="mt-6 bg-foreground/30 p-1 rounded cursor-pointer hover:scale-95 duration-300"
      >
        {!loading ? "Signup" : "Loading"}
      </button>
    </form>
  );
};

export default Form;
