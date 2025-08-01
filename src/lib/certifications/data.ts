import { Certification } from "@/types/journey";
import { cache } from "react";
import { supabase } from "../supabase";

export const getCertifications = cache(async (): Promise<Certification[]> => {
  const { data, error } = await supabase
    .from("certifications")
    .select(`
    id,
    title,
    type,
    issuer,
    start_date,
    end_date,
    link,
    certification_tool (
      tool_id
    )
  `) as unknown as {
      data: Certification[];
      error: unknown;
    };

  if (error) {
    if (error instanceof Error) throw new Error(error.message);
  }

  const certifications = data.map((certification) => ({
    ...certification,
    tool_count: certification.certification_tool.length,
  }));

  return certifications ?? []
});

export const getCertificationById = cache(async (id: string): Promise<Certification | null> => {
  const { data, error } = await supabase
    .from("certifications")
    .select(
      `
      id,
    title,
    type,
    issuer,
    start_date,
    end_date,
    link,
    certification_tool (
      tool_id
    ),
    certification_module (
      module_id
    )
      certification_project (
      project_id
    )
      `
    )
    .eq("id", id)
    .single() as unknown as { data: Certification | null; error: unknown };

  if (error) {
    if (error instanceof Error) throw new Error(error.message);
  }

  if (!data) return null;

  return {
    ...data,
    tools: data.certification_tool.map(certification_tool => certification_tool.tools.name),
    modules: data.certification_module.map(certification_module => certification_module.modules.name),
    projects: data.certification_project.map(certification_project => certification_project.projects.title),
  };
});