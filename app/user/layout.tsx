import Sidebar from "../components/Sidebar";
import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Task Planner for the Teams and Developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-screen flex">
      <Sidebar />
      <div className="pl-[70px] w-full h-full">{children}</div>
    </div>
  );
}
