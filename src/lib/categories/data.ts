import { cache } from "react";
import { supabase } from "../supabase";
import { Category } from "@/types/showcase";

export const getCategories = cache(async (): Promise<Category[]> => {
    const { data, error } = await supabase.from('categories').select('name');

    if (error) throw new Error(error.message)

    return data ?? []
})