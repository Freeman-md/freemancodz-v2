import { cache } from "react";
import { supabase } from "../supabase";
import { RawService, Service } from "@/types/showcase";

export const getServices = cache(async (): Promise<Service[]> => {
    const { data, error } = await supabase
        .from('services')
        .select(
            `
            id,
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
        id: service.id,
        name: service.name,
        description: service.description,
        categories: service.service_categories.map(service_category => service_category.categories.name)
    }))

})

export const getServiceById = cache(async (id: string): Promise<Service | null> => {
  const { data, error } = await supabase
    .from("services")
    .select(
      `
      id,
      name,
      description,
      service_categories (
        categories (
          name
        )
      )
      `
    )
    .eq("id", id)
    .single() as unknown as { data: RawService | null; error: unknown };

  if (error) {
    if (error instanceof Error) throw new Error(error.message);
  }

  if (!data) return null;

  return {
    id: data.id,
    name: data.name,
    description: data.description,
    categories: data.service_categories.map(sc => sc.categories.name),
  };
});