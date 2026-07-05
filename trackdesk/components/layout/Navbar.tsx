"use client";

import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();

  function handleLogout() {
    // later we will connect supabase logout
    router.push("/login");
  }

  return (
    <nav className="w-full bg-white border-b px-6 py-4 flex items-center justify-between">
      {/* Left Side - Logo */}
      <div className="text-xl font-bold text-gray-800">
        TrackDesk
      </div>

      {/* Center (optional - can be used for search later) */}
      <div className="hidden md:block text-gray-500 text-sm">
        Internal Task Tracker
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Profile placeholder */}
        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold">
          U
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};