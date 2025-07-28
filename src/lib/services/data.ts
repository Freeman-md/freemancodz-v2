import { cache } from "react";
import { supabase } from "../supabase";
import { RawService, Service } from "@/types/showcase";

export const getServices = cache(async (): Promise<Service[]> => {
    const { data, error } = await supabase
        .from('services')
        .select(
            `
            name, 
            description,
            service_categories (
                categories (
                    name
                )
            )
            `
        ) as unknown as { data: RawService[], error: unknown };


    if (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
    }

    const fallbackData: RawService[] = [];

    const servicesToMap = !data || data.length === 0 ? fallbackData : data;

    return servicesToMap.map(service => ({
        name: service.name,
        description: service.description,
        categories: service.service_categories.map(service_category => service_category.categories.name)
    }))

})