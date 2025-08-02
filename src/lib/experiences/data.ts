import { Experience } from "@/types/journey";
import { cache } from "react";
import { supabase } from "../supabase";

export const getExperiences = cache(async (): Promise<Experience[]> => {
  const { data, error } = await supabase
    .from("experiences")
    .select(`
      id,
      title,
      company,
      employment_type,
      location,
      start_date,
      end_date,
      experience_tool (
        tools (
          name
        )
      )
    `) as unknown as {
    data: Experience[];
    error: unknown;
  };

  if (error) {
    if (error instanceof Error) throw new Error(error.message);
  }

  const experiences = data.map((experience) => ({
    ...experience,
    tool_count: experience.experience_tool.length,
  }));

  return experiences ?? [];
});

export const getExperienceById = cache(async (id: string): Promise<Experience | null> => {
  const { data, error } = await supabase
    .from("experiences")
    .select(`
      id,
      title,
      company,
      employment_type,
      location,
      start_date,
      end_date,
      responsibilities,
      experience_tool (
        tools (
          name
        )
      ),
      experience_category (
        categories (
          name
        )
      )
    `)
    .eq("id", id)
    .single() as unknown as { data: Experience | null; error: unknown };

  if (error) {
    if (error instanceof Error) throw new Error(error.message);
  }

  if (!data) return null;

  return {
    ...data,
    tools: data.experience_tool.map((et) => et.tools.name),
    categories: data.experience_category.map((ec) => ec.categories.name),
  };
});
