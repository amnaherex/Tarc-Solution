//the dashboard header is the top part of the dashboard page, it contains the title and a button to create a new task.
"use client";

import Link from "next/link";

export const DashboardHeader = () => {
  return (
    <div className="flex flex-col bg-white p-3  rounded-lg text-black gap-4 md:flex-row md:items-center md:justify-between">
      {/* Left Side */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="mt-1 text-gray-500">
          Monitor your tasks and team progress.
        </p>
      </div>

     
      <Link
        href="/dashboard/tasks/create"
        className="inline-flex items-center text-black justify-center rounded-md bg-blue-600 px-5 py-2.5 text-white font-medium transition hover:bg-blue-700"
      >
       Create New Task
      </Link>
    </div>
  );
};
