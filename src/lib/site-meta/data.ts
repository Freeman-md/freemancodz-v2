import { cache } from "react";
import { supabase } from "../supabase";
import { SiteMetaItem } from "@/types/site-meta";

export const getAllSiteMeta = cache(async (): Promise<SiteMetaItem[]> => {
  const { data, error } = await supabase
    .from("site_meta")
    .select("*")
    .order("key");

  if (error) throw new Error(error.message);
  return data as SiteMetaItem[];
});
