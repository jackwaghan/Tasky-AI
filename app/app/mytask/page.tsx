"use client";
import { useWindow } from "@/Hook/window";
import React from "react";
import { CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Projects } from "@/lib/data";

const LoadingProject = Array.from({ length: 8 }, (_, i) => i);
const Page = () => {
  const [search, setSearch] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [project, setProject] = React.useState<
    { id: number; name: string; description: string }[] | []
  >(Projects);
  const Mobile = useWindow();
  const Router = useRouter();
  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  React.useEffect(() => {
    if (search.length === 0) {
      setProject(Projects);
      return;
    }
    setProject(
      Projects.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);
  console.log(search);

  if (typeof Mobile === "undefined") return null;
  return (
    <div className={`${Mobile ? "pl-0" : "pl-[70px]"} w-full h-full `}>
      <div className="max-w-7xl mx-auto flex w-full h-full flex-col">
        <div className="md:mt-10 w-full h-[50px] flex justify-between items-center px-5 border-b border-foreground/15  ">
          <h1 className="md:text-2xl text-lg font-geist-mono">Projects</h1>
          <div className=" h-full items-center flex space-x-2 duration-300">
            <div className="flex items-center">
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search"
                className="focus:outline-none focus:ring-1 ring-blue-500 border border-foreground/15 rounded  w-40 h-8 pl-2 bg-transparent"
              />
            </div>
            <div className="cursor-pointer p-2  hover:scale-95 flex  ">
              <CirclePlus className="w-7 h-7 stroke-blue-500" />
            </div>
          </div>
        </div>
        {project.length !== 0 ? (
          <div className="w-full px-5 grid md:grid-cols-3 lg:grid-cols-4 md:gap-10 space-y-5 overflow-y-auto pt-10 pb-50 ">
            {!isLoading
              ? project.map((item) => (
                  <div
                    key={item.id}
                    className="border border-foreground/15 rounded p-5 w-full h-[200px] flex flex-col hover:shadow-xl duration-300 hover:border-foreground/30 cursor-pointer "
                    onClick={() => Router.push(`/app/project/${item.id}`)}
                  >
                    <h1 className="">{item.name}</h1>

                    <p className="text-foreground/50 mt-10">
                      {item.description}
                    </p>
                  </div>
                ))
              : LoadingProject.map((item, id) => (
                  <div
                    key={id}
                    className=" rounded p-5 w-full h-[200px] flex flex-col animate-pulse bg-foreground/10"
                  />
                ))}
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="font-geist-mono text-xl">No Projects</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
