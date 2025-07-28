import { cache } from "react";
import { supabase } from "../supabase";
import { Services } from "@/types/showcase";

export const getServices = cache(async (): Promise<Services[]> => {
    const { data, error } = await supabase
        .from('services')
        .select('name, description');


    if (error) throw new Error(error.message)

    return data ?? []
})