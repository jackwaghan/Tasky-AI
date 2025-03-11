"use client";
import React from "react";
import { useParams, redirect } from "next/navigation";
import { Projects, tasks } from "@/lib/data";
import { useWindow } from "@/Hook/window";
import { CirclePlus } from "lucide-react";
import Table from "./Components/Table";

const Page = () => {
  const params = useParams();
  const id = Number(params.id);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const Mobile = useWindow();

  const project = Projects.find((item) => item.id === id);
  const [task] = React.useState(
    tasks.find((item) => item.id === id)?.task || []
  );

  if (!project) {
    redirect("/app/mytask");
  }

  return (
    <div className={`${Mobile ? "pl-0" : "pl-[70px]"} w-full h-full`}>
      <div className="max-w-7xl mx-auto flex h-full flex-col">
        <div className="md:mt-10 w-full h-[50px] flex justify-between items-center px-5 border-b border-foreground/15">
          <h1 className="md:text-2xl text-lg font-geist-mono truncate">
            {project?.name}
          </h1>
          <div className="h-full items-center flex space-x-2 duration-300">
            <div className="flex items-center">
              <input
                onChange={(e) => setGlobalFilter(e.target.value)}
                type="text"
                placeholder="Search"
                className="focus:outline-none focus:ring-1 ring-blue-500 border border-foreground/15 rounded w-40 h-8 pl-2 bg-transparent"
              />
            </div>
            <div className="cursor-pointer p-2 hover:scale-95 flex">
              <CirclePlus className="w-7 h-7 stroke-blue-500" />
            </div>
          </div>
        </div>
        <div className="overflow-y-auto md:pb-20 pb-50">
          <Table
            tasks={task}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
