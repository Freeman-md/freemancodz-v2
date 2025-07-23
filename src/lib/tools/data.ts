import { cache } from "react";
import { supabase } from "../supabase";

export const getTools = cache(async() => {
    const { data, error } = await supabase.from('tools').select('name')

    if (error) throw new Error(error.message) 

    return data ?? []
})