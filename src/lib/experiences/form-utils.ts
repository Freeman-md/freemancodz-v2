import { z } from "zod";
import { ExperienceFormValues } from "@/types/journey";

// 🧩 Schema
export const experienceSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "Title is required"),
  company: z.string().min(2, "Company is required"),
  employment_type: z.string().optional(),
  location: z.string().min(2, "Location is required"),
  start_date: z.string().min(4, "Start date is required"),
  end_date: z.string().min(4, "End date is required"),
  tools: z.array(z.string()).min(1, "Select at least one tool"),
  categories: z.array(z.string()).optional(),
  responsibilities: z.array(z.string()).min(1, "List at least one responsibility"),
});

// 🧪 Parser
export async function parseExperienceForm(formData: FormData) {
  const raw = {
    id: formData.get("id")?.toString() || "",
    title: formData.get("title")?.toString() || "",
    company: formData.get("company")?.toString() || "",
    employment_type: formData.get("employment_type")?.toString() || "",
    location: formData.get("location")?.toString() || "",
    start_date: formData.get("start_date")?.toString() || "",
    end_date: formData.get("end_date")?.toString() || "",
    tools: formData.getAll("tools").map((tool) => tool.toString()),
    categories: formData.getAll("categories").map((category) => category.toString()),
    responsibilities: formData.getAll("responsibilities").map((responsibility) => responsibility.toString()),
  };

  const result = experienceSchema.safeParse(raw);
  return { result, raw };
}

// 🧩 Default Values
export function getDefaultExperienceFormValues(
  defaultValues: Partial<ExperienceFormValues>
): ExperienceFormValues {
  return {
    id: defaultValues.id || "",
    title: defaultValues.title || "",
    company: defaultValues.company || "",
    employment_type: defaultValues.employment_type || "Full-time",
    location: defaultValues.location || "",
    start_date: defaultValues.start_date || "",
    end_date: defaultValues.end_date || "",
    tools: defaultValues.tools || [],
    categories: defaultValues.categories || [],
    responsibilities: defaultValues.responsibilities || [],
  };
}