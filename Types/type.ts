//Type for Individual
export type UserInfo = {
  name: string;
  email: string;
  role: string;
  id: string;
};

export type Task = {
  id: number;
  title: string;
  priority: string;
  dueDate: string;
  status: string;
};

export type Project = {
  id: number;
  title: string;
  description: string;
  tasks: Task[];
};

// Type for Zustand store

export type TaskStore = {
  tasks: Task[];
  addTask: (data: Task) => void;
  updateTask: (data: Task) => void;
  deleteTask: (id: number) => void;
};
