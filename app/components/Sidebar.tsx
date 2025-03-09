"use client";
import React from "react";
import { CalendarCheck } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { User } from "lucide-react";
import { Settings } from "lucide-react";
import { useWindow } from "@/Hook/window";
import MobileSidebar from "./Sidebar/MobileSidebar";
import DesktopSidebar from "./Sidebar/DesktopSidebar";
export const Sidebarlist = [
  {
    title: "Dashboard",
    url: "/app/dashboard",
    icons: <LayoutDashboard className="group-hover:stroke-blue-500" />,
  },
  {
    title: "My Task",
    url: "/app/mytask",
    icons: <CalendarCheck className="group-hover:stroke-blue-500" />,
  },
  {
    title: "Settings",
    url: "/app/settings",
    icons: <Settings className="group-hover:stroke-blue-500" />,
  },
  {
    title: "Profile",
    url: "/app/profile",
    icons: <User className="group-hover:stroke-blue-500" />,
  },
];
const Sidebar = () => {
  const Mobile = useWindow();
  if (typeof Mobile === "undefined") return null;
  return <div>{Mobile ? <MobileSidebar /> : <DesktopSidebar />}</div>;
};

export default Sidebar;
