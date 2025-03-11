import { create, UseBoundStore, StoreApi } from "zustand";
import { UserInfo, TaskStore } from "../Types/type";
import { Task } from "../Types/type";
import { Project } from "../Types/type";

export const useUser = create((set) => ({
  userInfo: { name: null, email: null, role: null, id: null },
  updateUser: (data: UserInfo) => set({ userInfo: data }),
  logout: () =>
    set({ userInfo: { name: null, email: null, role: null, id: null } }),
}));

export const useTask: UseBoundStore<StoreApi<TaskStore>> = create((set) => ({
  tasks: [],
  addTask: (data: Task) =>
    set((state: { tasks: Task[] }) => ({ tasks: [...state.tasks, data] })),
  updateTask: (data: Task) =>
    set((state: { tasks: Task[] }) => ({
      tasks: state.tasks.map((task) => (task.id === data.id ? data : task)),
    })),
  deleteTask: (id: number) =>
    set((state: { tasks: Task[] }) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
}));

export const useProject = create((set) => ({
  projects: [],
  addProject: (data: Project) =>
    set((state: { projects: Project[] }) => ({
      projects: [...state.projects, data],
    })),
  updateProject: (data: Project) =>
    set((state: { projects: Project[] }) => ({
      projects: state.projects.map((project) =>
        project.id === data.id ? data : project
      ),
    })),
  deleteProject: (id: number) =>
    set((state: { projects: Project[] }) => ({
      projects: state.projects.filter((project) => project.id !== id),
    })),
}));

export const useSearch = create((set) => ({
  search: "",
  setSearch: (data: string) => set({ search: data }),
}));

export const useWindow = create((set) => ({
  mobile: undefined,
  setMobile: (data: boolean) => set({ mobile: data }),
}));
