import React from "react";

export const Window = () => {
  const [isMobile, setMobile] = React.useState<boolean | undefined>(undefined);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setMobile(window.innerWidth < 640);
      };
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
  return isMobile;
};
