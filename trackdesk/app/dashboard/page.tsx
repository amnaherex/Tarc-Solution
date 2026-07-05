"use client";

import { useState } from "react";
import { Task } from "../types/task";    
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { TaskFilters } from "@/components/tasks/TaskFilters";
import { TaskTable } from "@/components/tasks/TaskTable";

export default function DashboardPage() {
  // FILTER STATES
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  // TEMP DATA (seed simulation)
  const tasks: Task[] = [
  {
    id: 1,
    title: "Setup Prisma",
    description: "Initialize database schema",
    status: "TODO",
    priority: "HIGH",
    dueDate: "2026-07-10",
    assignedToId: 1,
  },
  {
    id: 2,
    title: "Build Auth",
    description: "Implement Supabase login",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
    dueDate: "2026-07-08",
    assignedToId: 1,
  },
];

  // FILTER LOGIC
  const filteredTasks = tasks.filter((task) => {
    const matchSearch =
      task.title.toLowerCase().includes(search.toLowerCase());

    const matchStatus = status ? task.status === status : true;
    const matchPriority = priority ? task.priority === priority : true;

    return matchSearch && matchStatus && matchPriority;
  });

  return (
    <>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6">
          <DashboardHeader />

          <DashboardStats />

          <TaskFilters
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
            priority={priority}
            setPriority={setPriority}
          />

          <TaskTable tasks={filteredTasks} />
        </main>
      </div>
    </>
  );
}