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

// Main Project Type
export type Project = {
  id: number;
  title: string;
  description: string;
  longdescription?: string;

  // Classification
  categories: ProjectCategory[];
  status?: ProjectStatus;
  role?: ProjectRole;

  // Media
  coverImage: string;
  video_url?: string;
  previewGif?: string;

  // Links
  link: string;
  github?: string;

  // Flags
  featured: boolean;
  isPrivate: boolean;
  year: number;

  // Stack
  tools: string[];

  // Extra context
  impactNote?: string;      // e.g. "Used by 500+ people"

  aspect?: string;
};
