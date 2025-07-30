import { Project } from "@/types/project";
import { cache } from "react";
import { supabase } from "../supabase";

export const getProjects = cache(async() : Promise<Project[]> => {
    const { data, error } = await supabase.from('projects').select('*');

    if (error) throw new Error(error.message)

    return data ?? []
})