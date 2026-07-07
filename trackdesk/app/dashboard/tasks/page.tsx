"use client";

import { useEffect, useState } from "react";

import { TaskFilters } from "@/components/tasks/TaskFilters";
import { TaskTable } from "@/components/tasks/TaskTable";

export type Task = {
  id: number;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate: string;
  assignedToId: number;
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const response = await fetch("/api/tasks");

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();

      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus = status ? task.status === status : true;

    const matchesPriority = priority
      ? task.priority === priority
      : true;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );
  });

  return (
    <div className="space-y-6 ">
      <h1 className="text-4xl text-black font-bold">
        Tasks
      </h1>

      <TaskFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        priority={priority}
        setPriority={setPriority}
      />

      <TaskTable tasks={filteredTasks} />
    </div>
  );
}