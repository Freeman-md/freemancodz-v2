"use client";

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
} from "@/components/ui/sidebar";

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
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const groups = [
  {
    label: "Content",
    items: [
      { title: "Dashboard", href: "/admin", icon: IconHome },
      { title: "Projects", href: "/admin/projects", icon: IconFolder },
      { title: "Experience", href: "/admin/experience", icon: IconBriefcase },
      { title: "Education", href: "/admin/education", icon: IconSchool },
      {
        title: "Certifications",
        href: "/admin/certifications",
        icon: IconCertificate,
      },
    ],
  },
  {
    label: "Showcase",
    items: [
      { title: "Tools", href: "/admin/tools", icon: IconTool },
      { title: "Services", href: "/admin/services", icon: IconLayoutGrid },
      {
        title: "Categories",
        href: "/admin/categories",
        icon: IconLayersDifference,
      },
      { title: "Modules", href: "/admin/modules", icon: IconBrain },
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
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader />

      <SidebarContent>
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(item.href);

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.href}
                          className={`flex items-center gap-2 px-2.5 py-2 rounded text-sm transition-colors ${
                            isActive
                              ? "bg-muted text-foreground font-medium"
                              : "hover:bg-muted/50 text-muted-foreground"
                          }`}
                        >
                          <item.icon className="w-4 h-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
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
  );
}
