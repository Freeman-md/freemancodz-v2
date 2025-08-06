"use server"

import { supabase } from "../supabase";
import { revalidatePath } from "next/cache";
import { insertProjectCategories, insertProjectTools, parseProjectForm } from "./form-utils";

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
    categories,
    tools,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    id,
    ...projectData
  } = result.data;


  const { data: project, error } = await supabase
    .from("projects")
    .insert(projectData)
    .select()
    .single();

  if (error || !project) {
    return {
      status: "error",
      errors: { title: ["Failed to create project"] },
    };
  }

  insertProjectCategories(project.id, categories)

  insertProjectTools(project.id, tools)

  revalidatePath("/admin/projects");

  return { status: "success" };
};

export async function updateProject(prevState: unknown, formData: FormData) {
  const { result, raw } = await parseProjectForm(formData);

  if (!result.success) {
    return {
      status: "error",
      errors: result.error.flatten().fieldErrors,
      values: raw,
    };
  }

  const { categories, tools, id: projectId, ...projectData } = result.data;

  const { data: project, error } = await supabase
    .from("projects")
    .update(projectData)
    .eq("id", projectId)
    .select()
    .single();

  if (error || !project) {
    return {
      status: "error",
      errors: { name: ["Failed to update project"] },
      values: raw,
    };
  }

  await supabase.from("project_category").delete().eq("project_id", project.id);
  await supabase.from("project_category").delete().eq("project_id", project.id);

  insertProjectCategories(project.id, categories)
  insertProjectTools(project.id, tools)

  revalidatePath("/admin/projects");
  revalidatePath("/")

  return { status: "success" };
}


export async function updateProjectImage(projectId: string, imageUrl: string) {
  const { error } = await supabase
    .from("projects")
    .update({ cover_image: imageUrl })
    .eq("id", projectId);

  if (error) {
    throw new Error("Failed to update project image.");
  }

  revalidatePath("/admin/projects");
}

export const deleteProject = async (id: string) => {
  await supabase.from("projects").delete().eq("id", id)
  revalidatePath('/admin/projects')
}