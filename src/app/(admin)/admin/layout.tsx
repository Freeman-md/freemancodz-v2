import { AdminSidebar } from "@/components/admin/Sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import "@/app/layout-admin.css"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <SidebarTrigger />
            {/* You can drop page title or buttons here if needed */}
          </div>

          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
