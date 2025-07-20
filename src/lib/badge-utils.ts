import type { ProjectStatus } from "@/types/project";

export const getStatusBadgeVariant = (
  status: ProjectStatus
): { variant: "default" | "outline"; className: string } => {
  switch (status) {
    case "Idea":
      return { variant: "outline", className: "text-yellow-400 border-yellow-400" };
    case "In Progress":
      return { variant: "outline", className: "text-blue-400 border-blue-400" };
    case "Beta":
      return { variant: "outline", className: "text-orange-400 border-orange-400" };
    case "Live":
      return { variant: "default", className: "text-secondary" };
    case "Archived":
      return { variant: "outline", className: "text-gray-400 border-gray-600" };
    default:
      return { variant: "outline", className: "" };
  }
};
