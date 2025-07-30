import { Project } from "./project";

export type TimelineItemBase = {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  date?: string;
  tools?: string[];
  modules?: string[];
  link?: string;
  location?: string;
  projects?: Pick<Project, "id" | "title" | "cover_image" | "link">[];
};


export type Experience = TimelineItemBase & {
  type: 'experience',
  company: string;
  employmentType?: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  responsibilities?: string[];
};

export type Certification = TimelineItemBase & {
  type: 'certification';
  issuer: string;
  grade?: string;
}

export type Education = TimelineItemBase & {
  type: 'education'
  school: string;
  degree: string;
  grade?: string;
};

export type TimeLineEntry = Experience | Education | Certification