import { useProject, useUser } from "@/Hook/Zustand";
import { v4 as uuid } from "uuid";
import { X } from "lucide-react";
import React from "react";

const Modal = () => {
  const { setShow, setFilter, projects, addProject } = useProject();
  const { userInfo } = useUser();
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const newProject = {
      id: uuid(),
      title,
      description,
    };
    const response = await fetch("/api/projects", {
      method: "POST",
      body: JSON.stringify({
        id: userInfo.id,
        projects,
        newProject,
      }),
    });
    if (!response.ok) {
      console.log("error");
      return;
    }
    setLoading(false);
    setShow(false);
    setFilter([...projects, newProject]);
    addProject([...projects, newProject]);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="relative border border-foreground/15 rounded-lg pb-10 bg-background flex flex-col">
        <h1 className="text-lg font-geist-mono p-3 w-full text-center">
          Create Project
        </h1>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-4 p-10 "
        >
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="bg-foreground/10 rounded border-foreground/20 focus:outline-none  px-2 py-1 "
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="bg-foreground/10 rounded border-foreground/20 focus:outline-none  px-2 py-1 "
          />
          <button
            type="submit"
            className="bg-foreground/30 p-1 rounded cursor-pointer "
          >
            {loading ? "Loading..." : "Create"}
          </button>
        </form>
        <div
          className="absolute right-2 top-2 p-1 border border-foreground/15 rounded cursor-pointer hover:bg-foreground/10 hover:scale-95 duration-300"
          onClick={() => setShow(false)}
        >
          <X className="w-6 h-6 " />
        </div>
      </div>
    </div>
  );
};

export default Modal;
