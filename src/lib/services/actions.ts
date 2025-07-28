"use server";

import { supabase } from "../supabase";
import { revalidatePath } from "next/cache";

export async function createService(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const categories = formData.getAll("categories") as string[];

  if (!name?.trim() || !description?.trim()) return;

  const { data: service, error } = await supabase
    .from("services")
    .insert({ name: name.trim(), description: description.trim() })
    .select()
    .single();

  if (error || !service) throw new Error(error?.message ?? "Service creation failed");

  const { data: categoryRows } = await supabase
    .from("categories")
    .select("id, name")
    .in("name", categories);

  if (categoryRows && categoryRows.length > 0) {
    const links = categoryRows.map((cat) => ({
      service_id: service.id,
      category_id: cat.id,
    }));

    await supabase.from("service_categories").insert(links);
  }

  revalidatePath("/admin/services");
}
