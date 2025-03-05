"use client";
import React from "react";
import Theme from "./Theme";
import Link from "next/link";
import { CalendarCheck } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { User } from "lucide-react";
import { Settings } from "lucide-react";
import { usePathname } from "next/navigation";
const list = [
  {
    title: "Dashboard",
    url: "/user/dashboard",
    icons: <LayoutDashboard className="group-hover:stroke-blue-500" />,
  },
  {
    title: "My Task",
    url: "/user/mytask",
    icons: <CalendarCheck className="group-hover:stroke-blue-500" />,
  },
  {
    title: "Settings",
    url: "/user/settings",
    icons: <Settings className="group-hover:stroke-blue-500" />,
  },
  {
    title: "Profile",
    url: "/user/profile",
    icons: <User className="group-hover:stroke-blue-500" />,
  },
];
const Sidebar = () => {
  const [isopen, setOpen] = React.useState(false);
  const path = usePathname();
  console.log(path.split);

  return (
    <div
      className={`" h-full bg-foreground/10 fixed left-0 flex flex-col border-r border-foreground/20 z-50" ${isopen ? "w-[250px]" : "w-[70px]"} transition-all duration-300`}
    >
      <div className="w-full py-5 pl-4">To Do</div>
      <div className="w-full h-full">
        {list.map((item, i) => (
          <div
            className={`"w-full py-3 px-4 " ${isopen ? "" : "flex"} duration-300`}
            key={i}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <Link
              href={item.url}
              className={`p-2 rounded-lg  hover:text-foreground duration-300 group flex
                ${path === item.url ? "bg-foreground/10 text-foreground " : "text-foreground/60"}`}
            >
              <div>{item.icons}</div>
              {isopen && (
                <div className="px-4 whitespace-nowrap">{item.title}</div>
              )}
            </Link>
          </div>
        ))}
      </div>
      <div className="py-5 w-full px-4">
        <Theme />
      </div>
    </div>
  );
};

export default Sidebar;
