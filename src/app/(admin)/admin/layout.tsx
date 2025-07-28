"use client";

import { AdminSidebar } from "@/components/admin/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import "@/app/layout-admin.css";
import { Toaster } from "@/components/ui/sonner";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <SidebarTrigger />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>

          <Toaster />
        </main>
      </div>
    </SidebarProvider>
  );
}
