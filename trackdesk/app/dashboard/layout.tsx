import { ReactNode } from "react";

import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <Navbar />

      {/* Sidebar + Page Content */}
      <div className="flex">
         {<Sidebar /> }

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}