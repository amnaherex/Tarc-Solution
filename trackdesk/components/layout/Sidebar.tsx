"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
    },
    {
      name: "Tasks",
      href: "/dashboard/tasks",
    },
    {
      name: "Create Task",
      href: "/dashboard/tasks/create",
    },
  ];

  return (
    <aside className="w-64 min-h-[calc(100vh-64px)] bg-white border-r border-gray-200">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" &&
                pathname.startsWith(item.href));

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block rounded-md px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};