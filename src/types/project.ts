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
  | "Showcase";

export type ProjectStatus = "Idea" | "In Progress" | "Beta" | "Live" | "Archived";

export type ProjectRole = "Solo Build" | "Team Lead" | "Collaborator";

// Main Project Type
export type Project = {
  id: number;
  title: string;
  description: string;
  longdescription?: string;

  // Classification
  category: ProjectCategory;
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

  // Stack & Tags
  tools?: string[];
  tags: string[];  

  // Extra context
  impactNote?: string;      // e.g. "Used by 500+ people"
};
