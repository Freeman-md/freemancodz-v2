"use server";

import { supabase } from "../supabase";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3, "Name is required"),
  description: z.string().min(10, "Description is too short"),
  categories: z.array(z.string()).min(1, "Select at least one category")
});

export async function createService(prevState: unknown, formData: FormData) {
  const raw = {
    name: formData.get("name")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    categories: formData.getAll("categories").map((category) => category.toString()),
  };


  const result = schema.safeParse(raw);

  if (!result.success) {
    return {
      status: "error",
      errors: result.error.flatten().fieldErrors,
      values: raw,
    };
  }

  const { name, description, categories } = result.data;

  const { data: service, error } = await supabase
    .from("services")
    .insert({ name, description })
    .select()
    .single();

  if (error || !service) {
    return { status: "error", errors: { name: ["Failed to create service"] } };
  }

  const { data: categoryRows } = await supabase
    .from("categories")
    .select("id, name")
    .in("name", categories);

  if (categoryRows && categoryRows.length > 0) {
    const links = categoryRows.map((cat) => ({
      service_id: service.id,
      category_id: cat.id
    }));

    await supabase.from("service_categories").insert(links);
  }

  revalidatePath("/admin/services");

  return { status: "success" };
}

export async function updateService(prevState: unknown, formData: FormData) {
  const raw = {
    name: formData.get("name")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    categories: formData.getAll("categories").map((c) => c.toString()),
  };

  const result = schema.safeParse(raw);

  if (!result.success) {
    return {
      status: "error",
      errors: result.error.flatten().fieldErrors,
      values: raw,
    };
  }

  const { name, description, categories } = result.data;

  const { data: service, error } = await supabase
    .from("services")
    .update({ description })
    .eq("name", name)
    .select()
    .single();

  if (error || !service) {
    return {
      status: "error",
      errors: { name: ["Failed to update service"] },
      values: raw,
    };
  }

  await supabase.from("service_categories").delete().eq("service_id", service.id);

  const { data: categoryRows } = await supabase
    .from("categories")
    .select("id, name")
    .in("name", categories);

  if (categoryRows && categoryRows.length > 0) {
    const links = categoryRows.map((cat) => ({
      service_id: service.id,
      category_id: cat.id
    }));

    await supabase.from("service_categories").insert(links);
  }

  revalidatePath("/admin/services");

  return { status: "success" };
}

export async function deleteService(prevState: unknown, formData: FormData) {
  const name = formData.get("name")?.toString();
  if (!name?.trim()) return { status: "error" };

  await supabase.from("services").delete().eq("name", name);
  revalidatePath("/admin/services");

  return { status: "success" };
}