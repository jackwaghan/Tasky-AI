"use client";
import { useWindow } from "@/Hook/window";
import React from "react";

const Page = () => {
  const Mobile = useWindow();
  if (typeof Mobile === "undefined") return null;
  return (
    <div className={`${Mobile ? "pl-0" : "pl-[70px]"} w-full h-full `}></div>
  );
};

export default Page;
