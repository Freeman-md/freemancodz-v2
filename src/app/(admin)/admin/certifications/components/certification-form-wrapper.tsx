"use client";

import { use, useState } from "react";
import { toast } from "sonner";
import { Tool, Module } from "@/types/showcase";
import { Certification } from "@/types/journey";
import { getTools } from "@/lib/tools/data";
import { getModules } from "@/lib/modules/data";
import {
  createCertification,
  updateCertification,
} from "@/lib/certifications/actions";
import CertificationForm from "./certification-form";
import { getDefaultCertificationFormValues } from "@/lib/certifications/form-utils";
import Empty from "@/components/shared/empty";
import { Project } from "@/types/project";

type Props = {
  mode: "create" | "edit";
  certificationData?: Promise<Certification | null>;
  toolData: Promise<Tool[] | null>;
  moduleData: Promise<Module[] | null>;
  projectData: Promise<Project[] | null>;
};

export default function CertificationFormWrapper({
  mode,
  certificationData,
  toolData,
  moduleData,
  projectData
}: Props) {
  const certification = certificationData ? use(certificationData) : null;
  const initialTools = use(toolData) ?? [];
  const initialModules = use(moduleData) ?? [];
  const initialProjects = use(projectData) ?? []

  const [tools, setTools] = useState<string[]>(initialTools.map((t) => t.name));
  const [modules, setModules] = useState<string[]>(
    initialModules.map((m) => m.name)
  );

  const projects: string[] = initialProjects.map(project => project.title)

  const reloadTools = async () => {
    const latest = await getTools();
    setTools(latest.map((t) => t.name));
  };

  const reloadModules = async () => {
    const latest = await getModules();
    setModules(latest.map((m) => m.name));
  };

  if (mode === "edit" && !certification)
    return <Empty classes="text-black" message="Certification not found" />;

  return (
    <CertificationForm
      action={mode === "edit" ? updateCertification : createCertification}
      defaultValues={
        certification
          ? getDefaultCertificationFormValues(certification)
          : undefined
      }
      tools={tools}
      modules={modules}
      projects={projects}
      submitLabel={
        mode === "edit" ? "Update Certification" : "Save Certification"
      }
      onSuccess={() => {
        if (mode === "edit") {
          toast.success("Certification updated");
        } else {
          toast.success("Certification created", {
            action: {
              label: "View All Items",
              onClick: () => (window.location.href = "/admin/certifications"),
            },
          });
        }
      }}
      onReload={() => {
        reloadTools();
        reloadModules();
      }}
    />
  );
}
