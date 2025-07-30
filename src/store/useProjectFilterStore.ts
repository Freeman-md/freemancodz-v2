import { create } from "zustand";
import { useProjectStore } from "./useProjectStore";

type ProjectFilterStore = {
  activeCategories: Array<string>;
  toggleCategory: (category: string) => void;
  setCategories: (categories: string[]) => void;
  activeTools: Array<string>;
  toggleTool: (tool: string) => void;
  resetFilters: () => void;
};

export const useProjectFilterStore = create<ProjectFilterStore>((set, get) => ({
  activeCategories: [],
  activeTools: [],

  toggleCategory: (category) => {
    const { activeCategories } = get();
    const newCategories = activeCategories.includes(category)
      ? activeCategories.filter((c) => c !== category)
      : [...activeCategories, category];

    set({ activeCategories: newCategories });
    useProjectStore.getState().setFilteredProjects();
  },

  setCategories: (categories) => {
    set({ activeCategories: [...new Set(categories)] });
    useProjectStore.getState().setFilteredProjects();
  },

  toggleTool: (tool) => {
    const { activeTools } = get();
    const newTools = activeTools.includes(tool)
      ? activeTools.filter((t) => t !== tool)
      : [...activeTools, tool];

    set({ activeTools: newTools });
    useProjectStore.getState().setFilteredProjects();
  },

  resetFilters: () => {
    set({ activeCategories: [], activeTools: [] });
    useProjectStore.getState().setFilteredProjects();
  },
}));
