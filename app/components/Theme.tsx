"use client";
import { useTheme } from "next-themes";
import React, { JSX } from "react";
import { Monitor } from "lucide-react";
import { MoonStar } from "lucide-react";
import { Sun } from "lucide-react";
const icons: Record<"light" | "dark" | "system", JSX.Element> = {
  light: <Sun size={18} />,
  dark: <MoonStar size={18} />,
  system: <Monitor size={18} />,
};
const Theme = () => {
  const { setTheme, themes, theme } = useTheme();
  const [isopen, setOpen] = React.useState(false);

  return (
    <div className="relative w-fit">
      <div
        className="p-2 cursor-pointer  hover:bg-foreground/10 hover:scale-95 duration-300 flex items-center border border-foreground/20 rounded-lg "
        onClick={() => setOpen((prev) => !prev)}
      >
        <div>{icons[theme as keyof typeof icons]}</div>
      </div>

      {isopen && (
        <div className="absolute bottom-12 p-1 gap-1 flex-col flex  rounded-lg border border-foreground/20 bg-background">
          {themes.map((color, i) => {
            return (
              <div
                key={i}
                className="flex space-x-3 cursor-pointer hover:bg-foreground/15 items-center rounded-lg p-2 "
                onClick={() => {
                  setTheme(color);
                  setOpen(false);
                }}
              >
                <div> {icons[color as keyof typeof icons]}</div>
                <p>{color}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Theme;
