"use client";

import { useRouter } from "next/navigation";

export const DashboardHeader = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between mb-6">
      {/* Left Side */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Welcome back! Here’s what’s happening with your tasks.
        </p>
      </div>

      {/* Right Side */}
      <button
        onClick={() => router.push("/dashboard/tasks/new")}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        + Create Task
      </button>
    </div>
  );
};