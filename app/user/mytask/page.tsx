"use client";
import React, { useState } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Page = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Design Meeting",
      time: "10:00 AM",
      priority: "Medium",
      status: "Pending",
      date: new Date(),
    },
  ]);
  const [newTask, setNewTask] = useState({
    name: "",
    time: "",
    priority: "Medium",
    status: "Pending",
    date: new Date(),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleDateChange = (date) => {
    setNewTask({ ...newTask, date });
  };

  const addTask = () => {
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
    setNewTask({
      name: "",
      time: "",
      priority: "Medium",
      status: "Pending",
      date: new Date(),
    });
  };
  return (
    <div className="w-full h-full max-w-7xl flex mx-auto ">
      <div className="w-full h-full max-w-7xl flex mx-auto ">
        <div className="w-1/2 p-4">
          <h1 className="text-2xl font-semibold">My Tasks</h1>
          <div className="mt-4 overflow-y-scroll h-48 ">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Today</h2>
              <button className="text-sm text-blue-500">View All</button>
            </div>
            <div className="mt-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-2 bg-background rounded-lg shadow-sm border border-foreground/15"
                >
                  <div className="flex items-center">
                    <div
                      className={`w-4 h-4 rounded-full mr-2 ${task.priority === "High" ? "bg-red-500" : task.priority === "Medium" ? "bg-yellow-500" : "bg-green-500"}`}
                    ></div>
                    <p className="text-sm font-medium">{task.name}</p>
                  </div>
                  <p className="text-sm font-light">{task.time}</p>
                  <p className="text-sm font-light">{task.status}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Create Task</h2>
            <input
              type="text"
              name="name"
              value={newTask.name}
              onChange={handleInputChange}
              placeholder="Task Name"
              className="w-full p-2 mt-2 border rounded"
            />
            <input
              type="text"
              name="time"
              value={newTask.time}
              onChange={handleInputChange}
              placeholder="Time"
              className="w-full p-2 mt-2 border rounded"
            />
            <select
              name="priority"
              value={newTask.priority}
              onChange={handleInputChange}
              className="w-full p-2 mt-2 border rounded"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <select
              name="status"
              value={newTask.status}
              onChange={handleInputChange}
              className="w-full p-2 mt-2 border rounded"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
            <Calendar
              onChange={handleDateChange}
              value={newTask.date}
              className="mt-2 text-background border rounded"
            />
            <button
              onClick={addTask}
              className="w-full p-2 mt-2 bg-blue-500 text-white rounded"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
