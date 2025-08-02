"use server";

import { supabase } from "../supabase";
import { revalidatePath } from "next/cache";

export const updateSiteMeta = async (formData: FormData) => {
  const key = formData.get("key") as string;
  const raw = formData.get("value") as string;

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return {
      status: "error",
      errors: { value: ["Invalid JSON format."] },
    };
  }

  const { error } = await supabase
    .from("site_meta")
    .update({ value: parsed })
    .eq("key", key);

  if (error) {
    return {
      status: "error",
      errors: { value: ["Failed to update."] },
    };
  }

  revalidatePath("/admin/site-meta");
  return { status: "success" };
};
