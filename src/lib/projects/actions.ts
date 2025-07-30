"use server"

import { supabase } from "../supabase";
import { revalidatePath } from "next/cache";
import { parseProjectForm } from "./form-utils";
import { v4 as uuidv4 } from "uuid";

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

  let cover_image = "";
  const file = formData.get("cover_image") as File | null;

  if (file && file.size > 0) {
    const filename = `project-covers/${uuidv4()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("project-assets")
      .upload(filename, file);

    if (uploadError) {
      return {
        status: "error",
        errors: { cover_image: ["Failed to upload cover image"] },
        values: raw,
      };
    }

    const { data } = supabase
      .storage
      .from("project-assets")
      .getPublicUrl(filename);

    cover_image = data.publicUrl;
  }


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
      cover_image,
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