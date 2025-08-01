import { cache } from "react";
import { supabase } from "../supabase";
import { Module } from "@/types/showcase";

export const getModules = cache(async(): Promise<Module[]> => {
    const { data, error } = await supabase.from('modules').select('name')

    if (error) throw new Error(error.message) 

    return data ?? []
})