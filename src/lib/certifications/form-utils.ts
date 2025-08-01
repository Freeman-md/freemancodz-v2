import { z } from "zod";
import { supabase } from "../supabase";
import { CertificationFormValues } from "@/types/journey";

export const certificationSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "Title is required"),
  type: z.enum(["education", "certification"]),
  issuer: z.string().min(2, "Issuer is required"),
  description: z.string().min(10, "Description is too short"),
  start_date: z.string().min(4, "Start date is required"),
  end_date: z.string().min(4, "End date is required"),
  link: z.string().url("Link must be a valid URL"),
  tools: z.array(z.string()).min(1, "Select at least one tool"),
  modules: z.array(z.string()).optional(), // optional relationship
});

export async function parseCertificationForm(formData: FormData) {
  const raw = {
    id: formData.get("id")?.toString() || "",
    title: formData.get("title")?.toString() || "",
    type: formData.get("type")?.toString() || "certification",
    issuer: formData.get("issuer")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    start_date: formData.get("start_date")?.toString() || "",
    end_date: formData.get("end_date")?.toString() || "",
    link: formData.get("link")?.toString() || "",
    tools: formData.getAll("tools").map((t) => t.toString()),
    modules: formData.getAll("modules").map((m) => m.toString()),
  };

  const result = certificationSchema.safeParse(raw);
  return { result, raw };
}

export function getDefaultCertificationFormValues(
  defaultValues: Partial<CertificationFormValues>
): CertificationFormValues {
  return {
    id: defaultValues.id || "",
    title: defaultValues.title || "",
    type: defaultValues.type || "certification",
    issuer: defaultValues.issuer || "",
    description: defaultValues.description || "",
    start_date: defaultValues.start_date || "",
    end_date: defaultValues.end_date || "",
    link: defaultValues.link || "",
    tools: defaultValues.tools || [],
    modules: defaultValues.modules || [],
  };
}

export const insertCertificationTools = async (certId: string, tools: string[]) => {
  const { data: toolRows } = await supabase
    .from("tools")
    .select("id, name")
    .in("name", tools);

  if (toolRows?.length) {
    await supabase.from("certification_tool").insert(
      toolRows.map((tool) => ({
        certification_id: certId,
        tool_id: tool.id,
      }))
    );
  }
};

export const insertCertificationModules = async (certId: string, modules: string[]) => {
  const { data: moduleRows } = await supabase
    .from("modules")
    .select("id, name")
    .in("name", modules);

  if (moduleRows?.length) {
    await supabase.from("certification_module").insert(
      moduleRows.map((module) => ({
        certification_id: certId,
        module_id: module.id,
      }))
    );
  }
};
