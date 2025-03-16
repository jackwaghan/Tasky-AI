import React from "react";
import { Sidebarlist } from "../Sidebar";
import Theme from "../Theme";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { X } from "lucide-react";
import { PanelRightOpen } from "lucide-react";
import { ClipboardList } from "lucide-react";

const MobileSidebar = () => {
  const [isOpen, setOpen] = React.useState(false);
  const list = Sidebarlist;
  const path = usePathname();
  return (
    <div>
      {isOpen && (
        <div className="fixed left-0 w-[250px] h-full border-r border-foreground/20 flex flex-col  justify-between bg-background z-50">
          <div className="h-[80px] w-full flex items-center justify-between px-5 border-b border-foreground/20">
            <div className="flex items-center w-full h-full gap-3">
              <ClipboardList className="stroke-orange-500" />
              <div className="text-xl font-geist-mono">Tasky AI</div>
            </div>
            <X
              className="border border-foreground/20 rounded p-1 h-7 w-7 bg-foreground/15"
              onClick={() => setOpen(false)}
            />
          </div>
          <div className="h-full w-full pt-5">
            <div className="w-full h-full flex flex-col px-5 space-y-2.5">
              {list.map((item, i) => (
                <Link
                  href={item.url}
                  className={`"w-full  flex items-center p-2 rounded-lg " ${
                    path === item.url ? "bg-foreground/10 text-foreground" : ""
                  }`}
                  key={i}
                  onClick={() => setOpen(false)}
                >
                  <div>{item.icons}</div>

                  <div className="px-4 whitespace-nowrap">{item.title}</div>
                </Link>
              ))}
            </div>
          </div>
          <div className="h-[100px] w-full items-center flex pl-5">
            <Theme />
          </div>
        </div>
      )}
      <div className="fixed left-0 top-0 w-full h-[60px] p-2 flex border-b border-foreground/20 ">
        <div
          className="border border-foreground/20 p-1.5 rounded w-fit bg-foreground/10"
          onClick={() => setOpen(true)}
        >
          <PanelRightOpen className="h-7 w-7" />
        </div>
        <span className="bg-foreground/20 ml-4 w-[1px] " />
        <span className="capitalize flex items-center justify-center text-xl ml-4 font-geist-mono">
          {path.split("/")[2]}
        </span>
      </div>
    </div>
  );
};

export default MobileSidebar;
