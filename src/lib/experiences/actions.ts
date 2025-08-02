"use server";

import { supabase } from "../supabase";
import { revalidatePath } from "next/cache";
import {
  parseExperienceForm,
  insertExperienceTools,
  insertExperienceCategories,
} from "./form-utils";

export const createExperience = async (prevState: unknown, formData: FormData) => {
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

    console.log(error)

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
  await Promise.all([
    supabase.from("experience_tool").delete().eq("experience_id", id),
    supabase.from("experience_category").delete().eq("experience_id", id),
  ]);

  await supabase.from("experiences").delete().eq("id", id);
  revalidatePath("/admin/experiences");
};
