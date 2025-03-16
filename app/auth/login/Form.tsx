"use client";
import { redirect } from "next/navigation";
import React from "react";
const Form = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      setLoading(false);
      redirect("/app/dashboard");
    } else {
      setLoading(false);
      setError(await response.json());
    }
  };
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="w-[300px] flex flex-col gap-2 p-6 rounded-lg border border-foreground/15"
    >
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        className="bg-foreground/10 rounded border-foreground/20 focus:outline-none  px-2 py-1 "
      />
      <label htmlFor="password" className="mt-5">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        className="bg-foreground/10 rounded border-foreground/20 focus:outline-none  px-2 py-1 "
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <button
        type="submit"
        className="mt-6 bg-foreground/30 p-1 rounded cursor-pointer hover:scale-95 duration-300"
      >
        {!loading ? "Login" : "Loading"}
      </button>
    </form>
  );
};

export default Form;
