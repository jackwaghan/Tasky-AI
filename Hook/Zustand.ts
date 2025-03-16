import { create } from "zustand";
import { UserInfo, TaskStore, UserStore, ProjectStore } from "../Types/type";
import { Task } from "../Types/type";
import { Project } from "../Types/type";

export const useUser = create<UserStore>((set) => ({
  userInfo: { name: null, email: null, role: null, id: null },
  updateUser: (data: UserInfo) => set({ userInfo: data }),
  logout: () =>
    set({ userInfo: { name: null, email: null, role: null, id: null } }),
}));

export const useTask = create<TaskStore>()((set) => ({
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

export const useProject = create<ProjectStore>((set) => ({
  projects: [],
  loading: false,
  filter: [],
  show: false,
  setShow: (data: boolean) => set({ show: data }),
  setFilter: (data: Project[]) =>
    set({ filter: [...data.map((filter) => filter)] }),
  setLoading: (data: boolean) => set({ loading: data }),
  addProject: (data: Project[]) =>
    set(() => ({
      projects: [...data.map((project) => project)],
    })),
  // updateProject: (data: Project) =>
  //   set((state: { projects: Project[] }) => ({
  //     projects: state.projects.map((project) =>
  //       project.id === data.id ? data : project
  //     ),
  //   })),
  // deleteProject: (id: number) =>
  //   set((state: { projects: Project[] }) => ({
  //     projects: state.projects.filter((project) => project.id !== id),
  //   })),
}));

export const useSearch = create((set) => ({
  search: "",
  setSearch: (data: string) => set({ search: data }),
}));

export const useWindow = create((set) => ({
  mobile: undefined,
  setMobile: (data: boolean) => set({ mobile: data }),
}));
