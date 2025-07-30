"use server"

import { z } from "zod";
import { supabase } from "../supabase";
import { revalidatePath } from "next/cache";

const projectSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description is too short"),
  longdescription: z.string().min(10, "Long description is too short"),
  status: z.string().min(1, "Status is required"),
  role: z.string().min(1, "Role is required"),
  year: z.coerce.number().int().min(2000, "Enter a valid year"),
  categories: z.array(z.string()).min(1, "Select at least one category"),
  tools: z.array(z.string()).min(1, "Select at least one tool"),
});


export const createProject = async (prevState: unknown, formData: FormData) => {
  const raw = {
    title: formData.get("title")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    longdescription: formData.get("longdescription")?.toString() || "",
    status: formData.get("status")?.toString() || "",
    role: formData.get("role")?.toString() || "",
    year: Number(formData.get("year") || 0),
    categories: formData.getAll("categories").map((c) => c.toString()),
    tools: formData.getAll("tools").map((t) => t.toString()),
  };

  const result = projectSchema.safeParse(raw);

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
    const projectCategoryLinks = categoryRows.map((cat) => ({
      project_id: project.id,
      category_id: cat.id,
    }));

    await supabase.from("projects_categories").insert(projectCategoryLinks);
  }

  const { data: toolRows } = await supabase
    .from("tools")
    .select("id, name")
    .in("name", tools);

  if (toolRows?.length) {
    const projectToolLinks = toolRows.map((tool) => ({
      project_id: project.id,
      tool_id: tool.id,
    }));

    await supabase.from("projects_tools").insert(projectToolLinks);
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