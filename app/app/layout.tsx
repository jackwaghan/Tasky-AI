import "../globals.css";
import type { Metadata } from "next";
import AppLayout from "./Components/AppLayout";
import Sidebar from "../components/Sidebar";

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
    <div className="w-screen h-screen flex-col flex">
      <Sidebar />
      <AppLayout>{children}</AppLayout>
    </div>
  );
}
