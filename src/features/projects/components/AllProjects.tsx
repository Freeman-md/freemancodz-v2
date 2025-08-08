"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import type { Project } from "@/types/project";
import Empty from "@/components/shared/empty";
import ProjectCard from "./ProjectCard";
import FilterBar from "./FilterBar";

type Props = {
  projects: Project[];
  categories: string[];
  tools: string[];
};

export default function AllProjects({ projects, categories, tools }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const parseParamList = useCallback(
    (key: string) => searchParams.get(key)?.split(",").filter(Boolean) ?? [],
    [searchParams]
  );

  const arraysEqual = (a: string[], b: string[]) =>
    a.length === b.length && a.every((v, i) => v === b[i]);

  const [activeCategories, setActiveCategories] = useState<string[]>(
    parseParamList("categories")
  );
  const [activeTools, setActiveTools] = useState<string[]>(
    parseParamList("tools")
  );

  // URL -> state for back/forward
  useEffect(() => {
    const nextCategories = parseParamList("categories");
    const nextTools = parseParamList("tools");
    if (!arraysEqual(nextCategories, activeCategories))
      setActiveCategories(nextCategories);
    if (!arraysEqual(nextTools, activeTools)) setActiveTools(nextTools);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // state -> URL when toggling
  useEffect(() => {
    const qs = new URLSearchParams();
    if (activeCategories.length)
      qs.set("categories", activeCategories.join(","));
    if (activeTools.length) qs.set("tools", activeTools.join(","));
    const query = qs.toString();
    router.replace(query ? `/projects?${query}` : "/projects", {
      scroll: false,
    });
  }, [activeCategories, activeTools, router]);

  const toggleCategory = useCallback((category: string) => {
    setActiveCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  }, []);

  const toggleTool = useCallback((tool: string) => {
    setActiveTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
    );
  }, []);

  const resetFilters = useCallback(() => {
    setActiveCategories([]);
    setActiveTools([]);
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
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
  }, [projects, activeCategories, activeTools]);

  return (
    <section className="container py-12 space-y-8">
      {categories.length > 0 && (
        <FilterBar
          label="Categories"
          items={categories}
          activeItems={activeCategories}
          onToggle={toggleCategory}
        />
      )}

      {tools.length > 0 && (
        <FilterBar
          label="Tools"
          items={tools}
          activeItems={activeTools}
          onToggle={toggleTool}
        />
      )}

      {(activeCategories.length > 0 || activeTools.length > 0) && (
        <div className="flex justify-center">
          <button
            onClick={resetFilters}
            className="text-sm px-4 py-1.5 border border-white/30 rounded-full text-white/60 hover:text-white hover:border-white transition"
            aria-label="Reset filters"
          >
            Reset filters
          </button>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onSelect={() => router.push(`/projects/${project.id}`)}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Empty message="No projects match the selected filters." />
      )}
    </section>
  );
}
