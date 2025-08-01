import { Project } from "./project";
import { Tool, Module } from "./showcase";

export type Certification = {
  id: string;
  type: 'education' | 'certification';
  title: string;
  issuer: string;
  start_date?: string;
  end_date?: string;
  grade?: string;
  description?: string;
  link?: string;
  featured?: boolean;
  is_private?: boolean;
  certification_tool: {
    tools: Tool;
  }[];
  certification_module: {
    modules: Module;
  }[];
  certification_project: {
    projects: Project;
  }[];
  tools: string[];
  modules: string[];
  projects?: string[];
  tool_count?: number
};


export type CertificationFormValues = Partial<Certification>;

export type CertificationFormErrors = {
  [K in keyof CertificationFormValues]?: string[];
};

export type Experience = {
  id: string;
  title: string;
  description?: string;
  start_date: string;
  end_date?: string;
  date?: string;
  tools?: string[];
  modules?: string[];
  link?: string;
  location?: string;
  projects?: Partial<Project>[];
  type: 'experience',
  company: string;
  employmentType?: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  responsibilities?: string[];
};

export type TimeLineEntry = Experience | Certification