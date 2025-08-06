"use server";

import { revalidatePath } from "next/cache";
import {
  parseExperienceForm,
} from "./form-utils";
import { createClient } from "@/utils/supabase/server";

export const createExperience = async (prevState: unknown, formData: FormData) => {
  const supabase = await createClient()
  const { result, raw } = await parseExperienceForm(formData);

  if (!result.success) {
    return {
      status: "error",
      errors: result.error.flatten().fieldErrors,
      values: raw,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { tools, categories, id, ...experienceData } = result.data;

  const { data: experience, error } = await supabase
    .from("experiences")
    .insert(experienceData)
    .select()
    .single();

  console.log(error, experienceData)

  if (error || !experience) {
    return {
      status: "error",
      errors: { title: ["Failed to create experience"] },
    };
  }

  await Promise.all([
    insertExperienceTools(experience.id, tools),
    insertExperienceCategories(experience.id, categories ?? []),
  ]);

  revalidatePath("/admin/experiences");

  return { status: "success" };
};

export const updateExperience = async (prevState: unknown, formData: FormData) => {
  const supabase = await createClient()
  const { result, raw } = await parseExperienceForm(formData);

  if (!result.success) {
    return {
      status: "error",
      errors: result.error.flatten().fieldErrors,
      values: raw,
    };
  }

  const { tools, categories, id: expId, ...experienceData } = result.data;

  const { data: experience, error } = await supabase
    .from("experiences")
    .update(experienceData)
    .eq("id", expId)
    .select()
    .single();

  if (error || !experience) {
    return {
      status: "error",
      errors: { title: ["Failed to update experience"] },
      values: raw,
    };
  }

  await Promise.all([
    supabase.from("experience_tool").delete().eq("experience_id", experience.id),
    supabase.from("experience_category").delete().eq("experience_id", experience.id),
  ]);

  await Promise.all([
    insertExperienceTools(experience.id, tools),
    insertExperienceCategories(experience.id, categories ?? []),
  ]);

  revalidatePath("/admin/experiences");

  return { status: "success" };
};

export const deleteExperience = async (id: string) => {
  const supabase = await createClient()

  await Promise.all([
    supabase.from("experience_tool").delete().eq("experience_id", id),
    supabase.from("experience_category").delete().eq("experience_id", id),
  ]);

  await supabase.from("experiences").delete().eq("id", id);
  revalidatePath("/admin/experiences");
};


const insertExperienceTools = async (experienceId: string, tools: string[]) => {
  const supabase = await createClient()

  const { data: toolRows } = await supabase
    .from("tools")
    .select("id, name")
    .in("name", tools);

  if (toolRows?.length) {
    await supabase.from("experience_tool").insert(
      toolRows.map((tool) => ({
        experience_id: experienceId,
        tool_id: tool.id,
      }))
    );
  }
};

const insertExperienceCategories = async (experienceId: string, categories: string[]) => {
  const supabase = await createClient()

  const { data: categoryRows } = await supabase
    .from("categories")
    .select("id, name")
    .in("name", categories);

  if (categoryRows?.length) {
    await supabase.from("experience_category").insert(
      categoryRows.map((category) => ({
        experience_id: experienceId,
        category_id: category.id,
      }))
    );
  }
};
