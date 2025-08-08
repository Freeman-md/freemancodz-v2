"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import type { Project } from "@/types/project";
import { Badge } from "@/components/ui/badge";
import ProjectCard from "../../components/projects/ProjectCard";

type AllProjectsProps = {
  projects: Project[];
  categories: string[];
  tools: string[];
};

export default function AllProjects({ projects, categories, tools }: AllProjectsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  /** ---------- Helpers ---------- */

  const parseParamList = useCallback((key: string) => {
    return searchParams.get(key)?.split(",").filter(Boolean) ?? [];
  }, [searchParams]);

  const arraysEqual = (a: string[], b: string[]) =>
    a.length === b.length && a.every((v, i) => v === b[i]);

  /** ---------- Local state (derived from URL on load) ---------- */

  const [activeCategories, setActiveCategories] = useState<string[]>(parseParamList("categories"));
  const [activeTools, setActiveTools] = useState<string[]>(parseParamList("tools"));

  /** ---------- Keep URL -> State in sync on back/forward navigation ---------- */
  useEffect(() => {
    const nextCategories = parseParamList("categories");
    const nextTools = parseParamList("tools");

    if (!arraysEqual(nextCategories, activeCategories)) {
      setActiveCategories(nextCategories);
    }
    if (!arraysEqual(nextTools, activeTools)) {
      setActiveTools(nextTools);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]); // intentionally not including active* to avoid loops

  /** ---------- Keep State -> URL in sync when user toggles ---------- */
  useEffect(() => {
    const qs = new URLSearchParams();
    if (activeCategories.length) qs.set("categories", activeCategories.join(","));
    if (activeTools.length) qs.set("tools", activeTools.join(","));
    const query = qs.toString();
    router.replace(query ? `/projects?${query}` : "/projects", { scroll: false });
  }, [activeCategories, activeTools, router]);

  /** ---------- Toggle handlers ---------- */

  const toggleCategory = useCallback((category: string) => {
    setActiveCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
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

  /** ---------- Filtering ---------- */

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategoryFilter =
        activeCategories.length === 0 ||
        project.categories.some((category) => activeCategories.includes(category));

      const matchesToolFilter =
        activeTools.length === 0 ||
        project.tools.some((tool) => activeTools.includes(tool));

      return matchesCategoryFilter && matchesToolFilter;
    });
  }, [projects, activeCategories, activeTools]);

  /** ---------- UI ---------- */

  return (
    <section className="container py-12 space-y-8">
      {/* Categories filter bar */}
      {categories.length > 0 && (
        <FilterBar
          label="Categories"
          items={categories}
          activeItems={activeCategories}
          onToggle={toggleCategory}
        />
      )}

      {/* Tools filter bar */}
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

      {/* Projects grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-12">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Optional empty state when filters hide everything */}
      {filteredProjects.length === 0 && (
        <p className="text-center text-sm text-white/60">No projects match the selected filters.</p>
      )}
    </section>
  );
}

/**
 * FilterBar
 * - Renders a labeled, scrollable row of toggleable badges
 * - Uses shadcn Badge with clear selected vs unselected styles
 * - Keeps layout compact and skimmable
 */
type FilterBarProps = {
  label: string;
  items: string[];
  activeItems: string[];
  onToggle: (value: string) => void;
};

function FilterBar({ label, items, activeItems, onToggle }: FilterBarProps) {
  if (items.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="text-xs uppercase tracking-wide text-white/50">{label}</div>

      {/* Horizontal scroll on small screens, wraps on larger screens */}
      <div
        className="
          flex items-center gap-2 w-full
          overflow-x-auto whitespace-nowrap
          scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent
          md:flex-wrap md:whitespace-normal
        "
        role="listbox"
        aria-label={`${label} filters`}
      >
        {items.map((item) => {
          const isActive = activeItems.includes(item);
          return (
            <Badge
              key={item}
              role="option"
              aria-selected={isActive}
              onClick={() => onToggle(item)}
              // Use 'outline' as base, then override colors by state
              variant="outline"
              className={[
                "cursor-pointer select-none",
                isActive
                  ? "text-primary border-primary"
                  : "border-white/40 text-white/40 hover:text-white hover:border-white",
              ].join(" ")}
              asChild
            >
              <button type="button">{item}</button>
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
