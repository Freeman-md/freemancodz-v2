import { Project, RawProject } from "@/types/project";
import { cache } from "react";
import { supabase } from "../supabase";

export const getProjects = cache(async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from("projects")
    .select("id, title, status, role, year, featured, is_private")
    .order('year', { ascending: false }) as unknown as {
      data: Project[];
      error: unknown;
    };

  if (error) {
    if (error instanceof Error) throw new Error(error.message);
  }

  return data ?? []
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
      projects_categories (
        categories (
          name
        )
      ),
      projects_tools (
        tools (
          name
        )
      )
      `
    )
    .eq("id", id)
    .single() as unknown as { data: RawProject | null; error: unknown };

  if (error) {
    if (error instanceof Error) throw new Error(error.message);
  }

  if (!data) return null;

  return {
    ...data,
    categories: data.projects_categories.map(pc => pc.categories.name),
    tools: data.projects_tools.map(pc => pc.tools.name),
  };
});