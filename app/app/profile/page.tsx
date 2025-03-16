"use client";
import Image from "next/image";
import React from "react";
import { Pen } from "lucide-react";
import { useWindow } from "@/Hook/window";
import { useUser } from "@/Hook/Zustand";

const Page = () => {
  const [url] = React.useState<string>(
    "https://t3.ftcdn.net/jpg/09/40/98/76/360_F_940987693_p329N2dFCW7jG7Yqt3k5H9dxKoYqKSIQ.jpg"
  );
  const Mobile = useWindow();

  const { userInfo } = useUser();
  if (typeof Mobile === "undefined") return null;
  return (
    <div
      className={`px-5 w-full h-full flex mx-auto  ${Mobile ? "py-5" : "pl-[70px] py-20"}`}
    >
      <div className="w-full h-full flex flex-col border border-foreground/20 rounded-lg md:max-w-3xl lg:max-w-7xl max-w-xl mx-auto overflow-y-auto shadow-xl">
        <div className="w-full justify-center flex mt-5">
          {url.length !== 0 ? (
            <Image
              src={url}
              alt="profile"
              width={100}
              height={100}
              className="w-[100px] h-[100px] rounded-full p-1 border border-foreground/30 shadow-2xl"
            />
          ) : (
            <div className="w-[100px] h-[100px] bg-foreground/10 rounded-full animate-pulse" />
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
          <div className="w-full mt-10 md:mt-20 flex flex-col  space-y-5 pl-5 md:pl-20">
            <h1 className="font-geist-mono font-semibold tracking-wider ">
              Name
            </h1>
            {userInfo.name !== null ? (
              <div className="w-fit flex items-center justify-center ">
                <span className="px-4 py-1.5 border border-foreground/15 rounded-lg w-fit text-foreground/50 bg-foreground/10">
                  {userInfo.name}
                </span>
                <div className="flex items-center justify-center px-2 py-2 ml-4 cursor-pointer hover:scale-95 duration-300 border border-foreground/15 rounded-lg bg-foreground/10">
                  <Pen className="w-4 h-4" />
                </div>
              </div>
            ) : (
              <div className="bg-foreground/10 rounded-lg w-[200px] h-[30px] animate-pulse " />
            )}
          </div>
          <div className="w-full mt-0 md:mt-20 flex flex-col  space-y-5 pl-5 md:pl-20">
            <h1 className="font-geist-mono font-semibold tracking-wider ">
              username
            </h1>
            {userInfo.name !== null ? (
              <div className="w-fit flex items-center justify-center ">
                <span className="px-4 py-1.5 border border-foreground/15 rounded-lg w-fit text-foreground/50 bg-foreground/10">
                  {userInfo.name}
                </span>
                {/* <div className="flex items-center justify-center px-2 py-2 ml-4 cursor-pointer hover:scale-95 duration-300 border border-foreground/15 rounded-lg bg-foreground/10">
                <Pen className="w-4 h-4" />
              </div> */}
              </div>
            ) : (
              <div className="bg-foreground/10 rounded-lg w-[200px] h-[30px] animate-pulse " />
            )}
          </div>
          <div className="w-full mt-0 md:mt-20 flex flex-col  space-y-5 pl-5 md:pl-20">
            <h1 className="font-geist-mono font-semibold tracking-wider ">
              Email
            </h1>
            {userInfo.email !== null ? (
              <div className="w-fit flex items-center justify-center ">
                <span className="px-4 py-1.5 border border-foreground/15 rounded-lg w-fit text-foreground/50 bg-foreground/10">
                  {userInfo.email}
                </span>
                {/* <div className="flex items-center justify-center px-2 py-2 ml-4 cursor-pointer hover:scale-95 duration-300 border border-foreground/15 rounded-lg bg-foreground/10">
                <Pen className="w-4 h-4" />
              </div> */}
              </div>
            ) : (
              <div className="bg-foreground/10 rounded-lg w-[200px] h-[30px] animate-pulse " />
            )}
          </div>
        </div>
        <div className="mt-10 md:mt-20 w-full md:pl-20 pl-5 space-y-10">
          <div className="flex flex-col space-y-5">
            <p className="font-geist-mono ">
              Clear all the tasks in your account
            </p>
            <button className="w-fit px-4 py-2 border border-foreground/20 rounded">
              Clear Tasks
            </button>
          </div>
          <div className="flex flex-col space-y-5">
            <p className="font-geist-mono ">
              Log out from all the devices and browsers
            </p>
            <div className="flex gap-4 ">
              <button
                onClick={() => Logout("global")}
                className="w-fit px-2 py-1 md:px-4 md:py-2 border border-foreground/20 rounded cursor-pointer hover:scale-95 duration-200 bg-red-500/80"
              >
                Terminate all
              </button>
              <button
                onClick={() => Logout("local")}
                className="w-fit px-2 py-1 md:px-4 md:py-2 border border-foreground/20 rounded cursor-pointer hover:scale-95 duration-200 bg-red-500/80"
              >
                Terminate this device
              </button>
            </div>
          </div>
          <div className="flex flex-col space-y-5 ">
            <p className="font-geist-mono ">Delete your account Permanently</p>
            <button className="w-fit px-4 py-2 border border-foreground/20 rounded mb-40 md:mb-0">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

const Logout = async (value: "global" | "local") => {
  await fetch("/api/logout", {
    method: "GET",
    headers: { scope: value },
  }).then(() => (window.location.href = "/auth/login"));
};
