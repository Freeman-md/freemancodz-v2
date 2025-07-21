import { AdminSidebar } from "@/components/admin/Sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
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
