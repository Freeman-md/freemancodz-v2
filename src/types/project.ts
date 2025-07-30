import { Category, Tool } from "./showcase";

// Enums / Union Types
export type ProjectCategory =
  | "Frontend"
  | "Backend"
  | "Fullstack"
  | "AI"
  | "Tooling"
  | "DevOps"
  | "Mobile"
  | "SaaS"
  | "Showcase"
  | "Automation"
  | "Cross-platform"
  | "Tooling"
  | "Widget"
  | "Desktop"
  | "Cloud"
  | "Developer Tools"
  | "Feedback"
  | "File Sharing";

export type ProjectStatus = "Idea" | "In Progress" | "Beta" | "Live" | "Archived";

export type ProjectRole = "Solo Build" | "Team Lead" | "Collaborator";

export type ProjectFormErrors = {
  [K in keyof ProjectFormValues]?: string[];
};

export type ProjectFormValues = Partial<
  Project & {
    categories: string[];
    tools: string[];
  }
>;


// Main Project Type
export type RawProject = {
  id: string;
  title: string;
  description: string;
  longdescription?: string;

  // Classification
  projects_categories: {
    categories: Category;
  }[];
  status?: ProjectStatus;
  role?: ProjectRole;

  // Media
  cover_image: string;
  video_url?: string;

  // Links
  link: string;
  github?: string;

  // Flags
  featured: boolean;
  is_private: boolean;
  year: number;

  // Stack
  projects_tools: {
    tools: Tool;
  }[];

  // Extra context
  impact_note?: string;      // e.g. "Used by 500+ people"

  aspect?: string;
};

export type Project = Omit<RawProject, "projects_categories" | "projects_tools"> & {
  categories: string[];
  tools: string[];
};