import { supabase } from "./supabase";

export async function uploadImage(file: File, folder = "uploads") {
  const fileExt = file.name.split(".").pop();
  const fileName = `${folder}/${Date.now()}.${fileExt}`;
  const bucket = "site-assets";

  const { error } = await supabase.storage.from(bucket).upload(fileName, file, {
    upsert: true,
    contentType: file.type,
  });

  if (error) throw new Error("Image upload failed");

  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fileName);
  return urlData.publicUrl;
}
