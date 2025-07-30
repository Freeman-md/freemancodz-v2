import { Project } from "@/types/project";
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