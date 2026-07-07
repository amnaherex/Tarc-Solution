"use client";

import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";

type RecentTask = {
  id: number;
  title: string;
  description: string;
  updatedAt: string;
  priority: "HIGH" | "MEDIUM" | "LOW"; 
};

export default function DashboardPage() {
  const [recentTasks, setRecentTasks] = useState<RecentTask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchRecentTasks() {
      try {
        const response = await fetch("/api/tasks");

        if (!response.ok) {
          throw new Error("Failed to fetch recent tasks.");
        }

        const tasks: RecentTask[] = await response.json();

        if (!isMounted) {
          return;
        }

        setRecentTasks(tasks.slice(0, 5));
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchRecentTasks();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <DashboardHeader />

      <DashboardStats />

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
  <div className="mb-6 flex items-center justify-between">
    <div>
      <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
      <p className="mt-1 text-sm text-gray-500">
        Latest updates from your tasks
      </p>
    </div>

    <div className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
      {recentTasks.length} Tasks
    </div>
  </div>

  {loading ? (
    <div className="flex items-center justify-center py-12">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
    </div>
  ) : recentTasks.length === 0 ? (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 py-12">
      <div className="mb-3 text-5xl">📝</div>
      <p className="font-medium text-gray-700">
        No recent task activity
      </p>
      <p className="mt-1 text-sm text-gray-500">
        Recent updates will appear here.
      </p>
    </div>
  ) : (
    <div className="space-y-4">
      {recentTasks.map((task) => (
        <div
          key={task.id}
          className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
        >
          {/* Left Priority Bar */}
          <div
            className={`absolute left-0 top-0 h-full w-1 ${
              task.priority === "HIGH"
                ? "bg-red-500"
                : task.priority === "MEDIUM"
                ? "bg-yellow-500"
                : "bg-blue-500"
            }`}
          />

          <div className="ml-2 flex items-start justify-between gap-5">
            <div className="flex-1">
              <div className="mb-3 flex items-center gap-3">
                <h3 className="text-base font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
                  {task.title}
                </h3>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                    task.priority === "HIGH"
                      ? "bg-red-100 text-red-700"
                      : task.priority === "MEDIUM"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {task.priority}
                </span>
              </div>

              <p className="leading-relaxed text-sm text-gray-600 line-clamp-2">
                {task.description}
              </p>
            </div>

            <div className="flex flex-col items-end">
              <span className="rounded-lg bg-gray-100 px-3 py-1 text-xs text-gray-500">
                {new Date(task.updatedAt).toLocaleDateString()}
              </span>

              <span className="mt-2 text-xs text-gray-400">
                {new Date(task.updatedAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</section>
    </div>
  );
}
