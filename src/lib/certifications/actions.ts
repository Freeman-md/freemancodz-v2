"use server";

import { supabase } from "../supabase";
import { revalidatePath } from "next/cache";
import {
  parseCertificationForm,
  insertCertificationTools,
  insertCertificationModules,
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
  const { tools, modules, id, ...certificationData } = result.data;

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

  const { tools, modules, id: certId, ...certificationData } = result.data;

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

  await supabase.from("certification_tool").delete().eq("certification_id", cert.id);
  await supabase.from("certification_module").delete().eq("certification_id", cert.id);

  await insertCertificationTools(cert.id, tools);
  await insertCertificationModules(cert.id, modules ?? []);

  revalidatePath("/admin/certifications");

  return { status: "success" };
};

export const deleteCertification = async (id: string) => {
  await supabase.from("certifications").delete().eq("id", id);
  revalidatePath("/admin/certifications");
};
