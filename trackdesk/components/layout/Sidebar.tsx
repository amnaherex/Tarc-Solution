"use client";

import { useRouter } from "next/navigation";

export const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className="h-screen w-64 bg-white border-r p-6 flex flex-col justify-between">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="text-2xl font-bold mb-8 text-gray-800">
          TrackDesk
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="text-left px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700"
          >
            📊 Dashboard
          </button>

          <button
            onClick={() => router.push("/dashboard/tasks")}
            className="text-left px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700"
          >
            🗂 Tasks
          </button>

          <button
            onClick={() => router.push("/dashboard")}
            className="text-left px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700"
          >
            ➕ Create Task
          </button>
        </nav>
      </div>

      {/* Bottom Section */}
      <div>
        <button
          onClick={() => router.push("/login")}
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};