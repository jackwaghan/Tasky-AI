//Type for Individual
export type UserInfo = {
  name: string | null;
  email: string | null;
  role: string | null;
  id: string | null;
};

export type Task = {
  id: number;
  title: string;
  priority: string;
  dueDate: string;
  status: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
};

// Type for Zustand store

export type TaskStore = {
  tasks: Task[];
  addTask: (data: Task) => void;
  updateTask: (data: Task) => void;
  deleteTask: (id: number) => void;
};

export type UserStore = {
  userInfo: UserInfo;
  updateUser: (data: UserInfo) => void;
  logout: () => void;
};

export type ProjectStore = {
  projects: Project[];
  loading: boolean;
  filter: Project[];
  show: boolean;
  setShow: (data: boolean) => void;
  setFilter: (data: Project[]) => void;
  setLoading: (data: boolean) => void;
  addProject: (data: Project[]) => void;
  // updateProject: (data: Project) => void;
  // deleteProject: (id: number) => void;
};
