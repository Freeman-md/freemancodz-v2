"use server";

import { supabase } from "../supabase";
import { revalidatePath } from "next/cache";

function parseSeoMeta(formData: FormData) {
  return {
    title: formData.get("title") ?? "",
    description: formData.get("description") ?? "",
    keywords: formData.getAll("keywords").filter(Boolean),
  };
}

function parseHeadline(formData: FormData) {
  return {
    prefix: formData.get("prefix") ?? "",
    suffix: formData.get("suffix") ?? "",
    rotating_words: formData.getAll("rotating_words").filter(Boolean),
  };
}

function parseContact(formData: FormData) {
  return {
    email: formData.get("email") ?? "",
    phone: formData.get("phone") ?? "",
    blog: formData.get("blog") ?? "",
  };
}

function parseEthos(formData: FormData) {
  const ids = ["section_1", "section_2", "section_3"];
  const result: Record<string, { title: string; content: string }> = {};

  ids.forEach((id) => {
    result[id] = {
      title: formData.get(`${id}_title`) as string,
      content: formData.get(`${id}_content`) as string,
    };
  });

  return result;
}



function parseGenericValue(value: string | null) {
  if (!value) return "";
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

export async function updateSiteMeta(prevState: unknown, formData: FormData) {
  const key = formData.get("key") as string;
  const value = formData.get("value") as string | null;

  let parsed: string | object;

  try {
    switch (key) {
      case "seo_meta":
        parsed = parseSeoMeta(formData);
        break;
      case "headline":
        parsed = parseHeadline(formData);
        break;
      case "contact":
        parsed = parseContact(formData);
        break;
      case "ethos":
        parsed = parseEthos(formData);
        break;
      default:
        parsed = parseGenericValue(value);
    }
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
      errors: { value: ["Failed to update site_meta"] },
    };
  }

  revalidatePath("/admin/site-meta");

  return { status: "success" };
}
