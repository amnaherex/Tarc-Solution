"use client";

import { useEffect, useState } from "react";
import { StatCard } from "./StatCard";

type Task = {
  id: number;
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  dueDate: string;
};

export const DashboardStats = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const response = await fetch("/api/tasks");
      console.log("Response from /api/tasks:");
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();

      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  }

  const totalTasks = tasks.length;

  const todoTasks = tasks.filter(
    (task) => task.status === "TODO"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "IN_PROGRESS"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "COMPLETED"
  ).length;

  const overdueTasks = tasks.filter((task) => {
    return (
      task.status !== "COMPLETED" &&
      new Date(task.dueDate) < new Date()
    );
  }).length;

  return (
    <div className="grid gap-6 sm:grid-cols-2 text-black lg:grid-cols-5">
      <StatCard
        title="Total Tasks"
        value={totalTasks}
      />

      <StatCard
        title="To Do"
        value={todoTasks}
      />

      <StatCard
        title="In Progress"
        value={inProgressTasks}
      />

      <StatCard
        title="Completed"
        value={completedTasks}
      />

      <StatCard
        title="Overdue"
        value={overdueTasks}
      />
    </div>
  );
};