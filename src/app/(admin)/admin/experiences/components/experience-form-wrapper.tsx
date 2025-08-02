"use client";

import { use, useState } from "react";
import { toast } from "sonner";
import { Category, Tool } from "@/types/showcase";
import { Experience } from "@/types/journey";
import { getTools } from "@/lib/tools/data";
import {
  createExperience,
  updateExperience,
} from "@/lib/experiences/actions";
import ExperienceForm from "./experience-form";
import { getDefaultExperienceFormValues } from "@/lib/experiences/form-utils";
import Empty from "@/components/shared/empty";
import { getCategories } from "@/lib/categories/data";

type Props = {
  mode: "create" | "edit";
  experienceData?: Promise<Experience | null>;
  toolData: Promise<Tool[] | null>;
  categoryData: Promise<Category[] | null>;
};

export default function ExperienceFormWrapper({
  mode,
  experienceData,
  toolData,
  categoryData,
}: Props) {
  const experience = experienceData ? use(experienceData) : null;
  const initialTools = use(toolData) ?? [];
  const initialCategories = use(categoryData) ?? [];

  const [tools, setTools] = useState<string[]>(initialTools.map((tool) => tool.name));
  const [categories, setCategories] = useState<string[]>(initialCategories.map((category) => category.name));

  const reloadTools = async () => {
    const latest = await getTools();
    setTools(latest.map((t) => t.name));
  };

  const reloadCategories = async () => {
    const latest = await getCategories();
    setCategories(latest.map((category) => category.name));
  };

  if (mode === "edit" && !experience)
    return <Empty classes="text-black" message="Experience not found" />;

  return (
    <ExperienceForm
      action={mode === "edit" ? updateExperience : createExperience}
      defaultValues={
        experience
          ? getDefaultExperienceFormValues(experience)
          : undefined
      }
      tools={tools}
      categories={categories}
      submitLabel={
        mode === "edit" ? "Update Experience" : "Save Experience"
      }
      onSuccess={() => {
        if (mode === "edit") {
          toast.success("Experience updated");
        } else {
          toast.success("Experience created", {
            action: {
              label: "View All Items",
              onClick: () => (window.location.href = "/admin/experiences"),
            },
          });
        }
      }}
      onReload={() => {
        reloadTools();
        reloadCategories();
      }}
    />
  );
}
