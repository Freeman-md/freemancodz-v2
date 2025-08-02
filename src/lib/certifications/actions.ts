"use server";

import { supabase } from "../supabase";
import { revalidatePath } from "next/cache";
import {
  parseCertificationForm,
  insertCertificationTools,
  insertCertificationModules,
  insertCertificationProjects,
} from "./form-utils";

export const createCertification = async (prevState: unknown, formData: FormData) => {
  const { result, raw } = await parseCertificationForm(formData);

  if (!result.success) {
    return {
      status: "error",
      errors: result.error.flatten().fieldErrors,
      values: raw,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { tools, modules, projects, id, ...certificationData } = result.data;

  const { data: certifcation, error } = await supabase
    .from("certifications")
    .insert(certificationData)
    .select()
    .single();

  if (error || !certifcation) {
    return {
      status: "error",
      errors: { title: ["Failed to create certification"] },
    };
  }

  await insertCertificationTools(certifcation.id, tools);
  await insertCertificationModules(certifcation.id, modules ?? []);
  await insertCertificationProjects(certifcation.id, projects ?? []);

  revalidatePath("/admin/certifications");

  return { status: "success" };
};

export const updateCertification = async (prevState: unknown, formData: FormData) => {
  const { result, raw } = await parseCertificationForm(formData);

  if (!result.success) {
    return {
      status: "error",
      errors: result.error.flatten().fieldErrors,
      values: raw,
    };
  }

  const { tools, modules, projects, id: certId, ...certificationData } = result.data;

  const { data: cert, error } = await supabase
    .from("certifications")
    .update(certificationData)
    .eq("id", certId)
    .select()
    .single();

  if (error || !cert) {
    return {
      status: "error",
      errors: { title: ["Failed to update certification"] },
      values: raw,
    };
  }

  await Promise.all([
    supabase.from("certification_tool").delete().eq("certification_id", cert.id),
    supabase.from("certification_module").delete().eq("certification_id", cert.id),
    supabase.from("certification_project").delete().eq("certification_id", cert.id),
  ]);

  await Promise.all([
    insertCertificationTools(cert.id, tools),
    insertCertificationModules(cert.id, modules ?? []),
    insertCertificationProjects(cert.id, projects ?? []),
  ])

  revalidatePath("/admin/certifications");

  return { status: "success" };
};

export const deleteCertification = async (id: string) => {
  await supabase.from("certifications").delete().eq("id", id);
  revalidatePath("/admin/certifications");
};
