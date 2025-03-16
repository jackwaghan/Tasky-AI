import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Sidebarlist } from "../Sidebar";
import Theme from "../Theme";
import { ClipboardList } from "lucide-react";
const DesktopSidebar = () => {
  const path = usePathname();
  const [isopen, setOpen] = React.useState(false);
  const list = Sidebarlist;
  return (
    <div
      className={`" h-full fixed left-0 flex flex-col border-r border-foreground/20 "  ${isopen ? "w-[250px] bg-background  z-50 " : "w-[70px] bg-foreground/10"} transition-all duration-300`}
    >
      <div className="w-full h-[70px] ">
        <div
          className={`"w-full py-3 px-4 " ${isopen ? "" : "flex"} duration-300`}
        >
          <div
            className="p-2 rounded-lg  hover:text-foreground duration-300  flex
             "
          >
            <ClipboardList className="stroke-orange-500 h-7 w-7 " />
            {isopen && <div className="px-4 whitespace-nowrap">Tasky AI</div>}
          </div>
        </div>
      </div>
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

export default DesktopSidebar;
