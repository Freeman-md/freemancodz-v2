"use server"

import { supabase } from "../supabase";
import { revalidatePath } from "next/cache";
import { parseProjectForm } from "./form-utils";

export const createProject = async (prevState: unknown, formData: FormData) => {
  const { result, raw } = await parseProjectForm(formData);

  if (!result.success) {
    return {
      status: "error",
      errors: result.error.flatten().fieldErrors,
      values: raw,
    };
  }

  const {
    title,
    description,
    longdescription,
    status,
    role,
    year,
    categories,
    tools,
    github,
    link,
    impact_note,
    featured,
    is_private,
  } = result.data;


  const { data: project, error } = await supabase
    .from("projects")
    .insert({
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
    })
    .select()
    .single();

  if (error || !project) {
    return {
      status: "error",
      errors: { title: ["Failed to create project"] },
    };
  }

  const { data: categoryRows } = await supabase
    .from("categories")
    .select("id, name")
    .in("name", categories);

  if (categoryRows?.length) {
    await supabase.from("projects_categories").insert(
      categoryRows.map((cat) => ({
        project_id: project.id,
        category_id: cat.id,
      }))
    );
  }

  const { data: toolRows } = await supabase
    .from("tools")
    .select("id, name")
    .in("name", tools);

  if (toolRows?.length) {
    await supabase.from("projects_tools").insert(
      toolRows.map((tool) => ({
        project_id: project.id,
        tool_id: tool.id,
      }))
    );
  }

  revalidatePath("/admin/projects");

  return { status: "success" };
};

export const updateProject = async (prevState: unknown, formData: FormData) => {
  console.log(prevState, formData)
}

export const deleteProject = async (id: string) => {
  console.log(id)
}