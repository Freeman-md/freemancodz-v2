import { ProjectFormValues } from "@/types/project";
import { z } from "zod";
import { supabase } from "../supabase";

export const projectSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description is too short"),
  longdescription: z.string().min(10, "Long description is too short"),
  status: z.string().min(1, "Status is required"),
  role: z.string().min(1, "Role is required"),
  year: z.coerce.number().int().min(2000, "Enter a valid year"),
  categories: z.array(z.string()).min(1, "Select at least one category"),
  tools: z.array(z.string()).min(1, "Select at least one tool"),
  github: z.string().url(),
  link: z.string().url(),
  impact_note: z.string().optional(),
  featured: z.coerce.boolean().optional(),
  is_private: z.coerce.boolean().optional(),
});

export async function parseProjectForm(formData: FormData) {
  const raw = {
    id: formData.get("id")?.toString() || "",
    title: formData.get("title")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    longdescription: formData.get("longdescription")?.toString() || "",
    status: formData.get("status")?.toString() || "",
    role: formData.get("role")?.toString() || "",
    year: formData.get("year") || "0",
    categories: formData.getAll("categories").map((c) => c.toString()),
    tools: formData.getAll("tools").map((t) => t.toString()),
    github: formData.get("github")?.toString(),
    link: formData.get("link")?.toString(),
    impact_note: formData.get("impact_note")?.toString(),
    featured: formData.get("featured") === "true",
    is_private: formData.get("isPrivate") === "true",
  };

  const result = projectSchema.safeParse(raw);
  return { result, raw };
}


export function getDefaultProjectFormValues(
  defaultValues: Partial<ProjectFormValues>
): ProjectFormValues {
  return {
    id: defaultValues.id || "",
    title: defaultValues.title || "",
    description: defaultValues.description || "",
    longdescription: defaultValues.longdescription || "",
    status: defaultValues.status ?? undefined,
    role: defaultValues.role ?? undefined,
    year: defaultValues.year || new Date().getFullYear(),
    categories: defaultValues.categories || [],
    tools: defaultValues.tools || [],
    cover_image: defaultValues.cover_image || "",
    github: defaultValues.github || "",
    link: defaultValues.link || "",
    impact_note: defaultValues.impact_note || "",
    featured: defaultValues.featured ?? false,
    is_private: defaultValues.is_private ?? false,
  };
}

export const insertProjectCategories = async (projectId: string, categories: string[]) => {
  const { data: categoryRows } = await supabase
    .from("categories")
    .select("id, name")
    .in("name", categories);

  if (categoryRows?.length) {
    await supabase.from("projects_categories").insert(
      categoryRows.map((category) => ({
        project_id: projectId,
        category_id: category.id,
      }))
    );
  }
}

export const insertProjectTools = async (projectId: string, tools: string[]) => {
  const { data: toolRows } = await supabase
    .from("tools")
    .select("id, name")
    .in("name", tools);

  if (toolRows?.length) {
    await supabase.from("projects_tools").insert(
      toolRows.map((tool) => ({
        project_id: projectId,
        tool_id: tool.id,
      }))
    );
  }
}