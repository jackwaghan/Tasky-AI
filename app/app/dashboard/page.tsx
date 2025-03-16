"use client";

import { useWindow } from "@/Hook/window";
import { useUser } from "@/Hook/Zustand";
import React from "react";
const Page = () => {
  const { userInfo } = useUser();
  const Mobile = useWindow();
  if (typeof Mobile === "undefined") return null;
  return (
    <div
      className={`px-5 w-full h-full flex flex-col mx-auto max-w-7xl items-center justify-center text-3xl font-geist-mono gap-5 ${Mobile ? "" : ""}`}
    >
      <p className="text-3xl text-orange-400 font-semibold">
        Hey {userInfo.name}
      </p>
      <p className="text-lg">Dashboard is under development</p>
    </div>
  );
};

export default Page;
