"use client"

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

import {
  IconHome,
  IconFolder,
  IconBrain,
  IconBriefcase,
  IconCertificate,
  IconSchool,
  IconInfoCircle,
  IconMail,
  IconUser,
  IconSettings,
  IconLogout,
  IconTool,
  IconLayoutGrid,
  IconLayersDifference,
} from "@tabler/icons-react"
import Link from "next/link"

const groups = [
  {
    label: "Content",
    items: [
      { title: "Dashboard", href: "/admin", icon: IconHome },
      { title: "Projects", href: "/admin/projects", icon: IconFolder },
      { title: "Skills", href: "/admin/skills", icon: IconBrain },
      { title: "Experience", href: "/admin/experience", icon: IconBriefcase },
      { title: "Education", href: "/admin/education", icon: IconSchool },
      { title: "Certifications", href: "/admin/certifications", icon: IconCertificate },
    ],
  },
  {
    label: "Showcase",
    items: [
      { title: "Tools", href: "/admin/tools", icon: IconTool },
      { title: "Services", href: "/admin/services", icon: IconLayoutGrid },
      { title: "Categories", href: "/admin/categories", icon: IconLayersDifference },
    ],
  },
  {
    label: "Site Info",
    items: [
      { title: "About Me", href: "/admin/about", icon: IconInfoCircle },
      { title: "Contact Info", href: "/admin/contact", icon: IconMail },
    ],
  },
  {
    label: "Admin",
    items: [
      { title: "Profile", href: "/admin/profile", icon: IconUser },
      { title: "Settings", href: "/admin/settings", icon: IconSettings },
    ],
  },
]

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />

      <SidebarContent>
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.href}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button className="w-full flex items-center">
                <IconLogout className="w-4 h-4" />
                <span>Sign out</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
