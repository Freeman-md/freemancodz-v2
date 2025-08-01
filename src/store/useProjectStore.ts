// store/useProjectStore.ts
import { Project } from "@/types/project";
import { create } from "zustand";
import { useProjectFilterStore } from "./useProjectFilterStore";

type ProjectStore = {
  allProjects: Project[];
  setProjects: (projects: Project[]) => void;
  filteredProjects: Project[];
  setFilteredProjects: () => void;
  selectedProject: Project | null;
  clearSelectedProject: () => void;
  selectProjectById: (id: string) => void
};

export const useProjectStore = create<ProjectStore>((set, get) => ({
  allProjects: [],
  filteredProjects: [],
  
  setProjects: (projects) => set({ allProjects: projects, filteredProjects: projects }),

  setFilteredProjects: () => {
    const { allProjects } = get();
    const { activeCategories, activeTools } = useProjectFilterStore.getState();

    const filtered = allProjects.filter((project) => {
      const categoryMatch =
        activeCategories.length === 0 ||
        project.categories.some((c) => activeCategories.includes(c));

      const toolMatch =
        activeTools.length === 0 ||
        project.tools.some((t) => activeTools.includes(t));

      return categoryMatch && toolMatch;
    });

    set({ filteredProjects: filtered });
  },

  selectedProject: null,
  clearSelectedProject: () => set({ selectedProject: null }),

  selectProjectById: (id: string) => {
    const project = get().allProjects.find((project) => project.id === id);
    if (project) set({ selectedProject: project });
  },
}));
