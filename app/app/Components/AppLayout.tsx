"use client";
import { useWindow } from "@/Hook/window";
import React from "react";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const Mobile = useWindow();
  return (
    <div
      className={`${Mobile ? "mt-[60px]" : "mt-0"} w-full h-full overflow-hidden`}
    >
      {children}
    </div>
  );
};

export default AppLayout;
