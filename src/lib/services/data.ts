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

    const fallbackData: RawService[] = [
        {
            name: "Cloud Deployment",
            description: "Automated deployment pipelines for modern cloud infrastructure.",
            service_categories: [
                { categories: { name: "DevOps" } },
                { categories: { name: "Cloud" } }
            ]
        },
        {
            name: "UI/UX Design",
            description: "Clean and modern interface design for web and mobile apps.",
            service_categories: [
                { categories: { name: "Design" } },
                { categories: { name: "Frontend" } }
            ]
        },
        {
            name: "API Integration",
            description: "Seamless integration with third-party APIs and internal services.",
            service_categories: [
                { categories: { name: "Backend" } },
                { categories: { name: "Integration" } }
            ]
        },
        {
            name: "Data Visualization",
            description: "Interactive dashboards and graphs using real-time data.",
            service_categories: [
                { categories: { name: "Analytics" } },
                { categories: { name: "Frontend" } }
            ]
        },
        {
            name: "Authentication Setup",
            description: "Secure login, OAuth, and role-based access control systems.",
            service_categories: [
                { categories: { name: "Security" } },
                { categories: { name: "Backend" } }
            ]
        },
        {
            name: "Performance Optimization",
            description: "Speed and scalability improvements across frontend and backend.",
            service_categories: [
                { categories: { name: "Performance" } },
                { categories: { name: "Fullstack" } }
            ]
        }
    ];

    const servicesToMap = !data || data.length === 0 ? fallbackData : data;

    return servicesToMap.map(service => ({
        name: service.name,
        description: service.description,
        categories: service.service_categories.map(service_category => service_category.categories.name)
    }))

})