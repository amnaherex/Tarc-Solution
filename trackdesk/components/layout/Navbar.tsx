"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setEmail(user.email ?? "");

        const userName = user.user_metadata?.name;

        if (userName) {
          setName(userName);
        }
      }
    }

    getUser();
  }, [supabase]);

  async function handleLogout() {
    await supabase.auth.signOut();

    router.push("/login");
    router.refresh();
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      {/* Left Side */}
      <div>
        <h1 className="text-xl font-bold text-gray-800">
          TrackDesk
        </h1>

        <p className="text-sm text-gray-500">
          Task Tracker System
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex flex-col items-end">
          <span className="text-sm font-medium text-gray-700">
            Welcome {name || "User"}
          </span>

          <span className="text-xs text-gray-500">
            {email}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
};