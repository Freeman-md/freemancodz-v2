import { Project } from "./project";

export type ExperienceItem = {
  id: string;
  title: string;
  company: string;
  description?: string;
  startDate: string;
  endDate: string;
  tools?: string[];
  responsibilities?: string[];
  link?: string;
  projects?: Pick<Project, "id" | "title" | "coverImage" | "link">[];
};
