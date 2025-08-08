"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import type { Project } from "@/types/project";
import ProjectCard from "../../components/projects/ProjectCard";

type Props = {
  projects: Project[];
  categories: string[];
  tools: string[];
};

export default function AllProjects({ projects, categories, tools }: Props) {
  const params = useSearchParams();
  const router = useRouter();

  // read initial filters from URL
  const [activeCategories, setActiveCategories] = useState<string[]>(
    params.get("categories")?.split(",").filter(Boolean) ?? []
  );
  const [activeTools, setActiveTools] = useState<string[]>(
    params.get("tools")?.split(",").filter(Boolean) ?? []
  );

  // keep URL in sync
  useEffect(() => {
    const qs = new URLSearchParams();
    if (activeCategories.length)
      qs.set("categories", activeCategories.join(","));
    if (activeTools.length) qs.set("tools", activeTools.join(","));
    router.replace(`/projects?${qs.toString()}`, { scroll: false });
  }, [activeCategories, activeTools, router]);

  const filteredProjects = projects.filter((project) => {
    const matchesCategoryFilter =
      activeCategories.length === 0 ||
      project.categories.some((category) =>
        activeCategories.includes(category)
      );

    const matchesToolFilter =
      activeTools.length === 0 ||
      project.tools.some((tool) => activeTools.includes(tool));

    return matchesCategoryFilter && matchesToolFilter;
  });


  return (
    <section className="container py-12 space-y-6">
      {/* Filter bars using categories/tools, toggling sets */}
      {/* Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-12">
        {filteredProjects.map((p) => (
          <ProjectCard
            key={p.id}
            project={p}
          />
        ))}
      </div>
    </section>
  );
}
