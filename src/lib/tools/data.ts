import { cache } from "react";
import { supabase } from "../supabase";
import { Tool } from "@/types/showcase";

export const getTools = cache(async(): Promise<Tool[]> => {
      await new Promise((resolve) => setTimeout(resolve, 2000))

    const { data, error } = await supabase.from('tools').select('name')

    if (error) throw new Error(error.message) 

    return data ?? []
})