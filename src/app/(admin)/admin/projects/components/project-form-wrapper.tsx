"use client";

import { use, useState } from "react";
import { toast } from "sonner";
import { Category, Tool } from "@/types/showcase";
import { getCategories } from "@/lib/categories/data";
import { getTools } from "@/lib/tools/data";
import { createProject, updateProject } from "@/lib/projects/actions";
import ProjectForm from "./project-form";
import Empty from "@/components/shared/empty";
import { Project } from "@/types/project";

type Props = {
  mode: "create" | "edit";
  projectData?: Promise<Project | null>;
  categoryData: Promise<Category[] | null>;
  toolData: Promise<Tool[] | null>;
};

export default function ProjectFormWrapper({
  mode,
  projectData,
  categoryData,
  toolData,
}: Props) {
  const project = projectData ? use(projectData) : null;
  const initialCategories = use(categoryData) ?? [];
  const initialTools = use(toolData) ?? [];

  const [categories, setCategories] = useState<string[]>(
    initialCategories.map((c) => c.name)
  );

  const [tools, setTools] = useState<string[]>(initialTools.map((t) => t.name));

  const reloadCategories = async () => {
    const latest = await getCategories();
    setCategories(latest.map((c) => c.name));
  };

  const reloadTools = async () => {
    const latest = await getTools();
    setTools(latest.map((t) => t.name));
  };

  if (mode === "edit" && !project)
    return <Empty classes="text-black" message="Project not found" />;

  return (
    <ProjectForm
      action={mode === "edit" ? updateProject : createProject}
      defaultValues={
        project
          ? {
              title: project.title,
              description: project.description,
              longdescription: project.longdescription,
              status: project.status,
              role: project.role,
              year: project.year,
              categories: project.categories,
              tools: project.tools,
            }
          : undefined
      }
      categories={categories}
      tools={tools}
      submitLabel={mode === "edit" ? "Update Project" : "Save Project"}
      onSuccess={() => {
        if (mode === "edit") {
          toast.success("Project updated");
        } else {
          toast.success("Project created", {
            action: {
              label: "View All Projects",
              onClick: () => (window.location.href = "/admin/projects"),
            },
          });
        }
      }}
      onReload={() => {
        reloadCategories();
        reloadTools();
      }}
    />
  );
}
