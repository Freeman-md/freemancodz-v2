import { Project } from "@/types/project";
import { cache } from "react";
import { supabase } from "../supabase";

export const getProjects = cache(async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from("projects")
    .select("id, title, status, cover_image, role, year, featured, is_private")
    .order('year', { ascending: false }) as unknown as {
      data: Project[];
      error: unknown;
    };

  if (error) {
    if (error instanceof Error) throw new Error(error.message);
  }

  return data ?? []
});

export const getFeaturedProjects = cache(async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from("projects")
    .select(
      `
      id,
      title,
      description,
      longdescription,
      status,
      role,
      year,
      github,
      link,
      impact_note,
      featured,
      is_private,
      cover_image,
      project_category (
        categories (
          name
        )
      ),
      project_tool (
        tools (
          name
        )
      )
      `
    )
    .eq("featured", true)
    .order("year", { ascending: false }) as unknown as {
      data: Project[];
      error: unknown;
    };

  if (error) {
    if (error instanceof Error) throw new Error(error.message);
  }

  if (!data) return [];

  return data.map((project) => ({
    ...project,
    categories: project.project_category
      ? project.project_category.map((pc) => pc.categories.name)
      : [],
    tools: project.project_tool
      ? project.project_tool.map((pt) => pt.tools.name)
      : [],
  }));
});

export const getProjectById = cache(async (id: string): Promise<Project | null> => {
  const { data, error } = await supabase
    .from("projects")
    .select(
      `
      id,
      title,
      description,
      longdescription,
      status,
      role,
      year,
      github,
      link,
      impact_note,
      featured,
      is_private,
      cover_image,
      project_category (
        categories (
          name
        )
      ),
      project_tool (
        tools (
          name
        )
      )
      `
    )
    .eq("id", id)
    .single() as unknown as { data: Project | null; error: unknown };

  if (error) {
    if (error instanceof Error) throw new Error(error.message);
  }

  if (!data) return null;

  return {
    ...data,
    categories: data.project_category ? data.project_category.map(pc => pc.categories.name) : [],
    tools: data.project_tool ? data.project_tool.map(pc => pc.tools.name) : [],
  };
});