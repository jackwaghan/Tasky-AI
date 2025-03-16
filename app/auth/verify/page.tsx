import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="w-screen h-screen items-center justify-center flex ">
      <div className="p-4 rounded-lg border border-foreground/15 flex flex-col gap-5">
        <p className="p-1">Check you Mail to Verify</p>
        <Link
          href="https://mail.google.com/"
          className="p-1 bg-foreground/10 border border-foreground/15 hover:bg-foreground/20 cursor-pointer rounded flex items-center justify-center"
        >
          Open
        </Link>
      </div>
    </div>
  );
};

export default page;
