import { ProjectCategory } from "@/types/project";
import { create } from "zustand";

type ProjectFilterStore = {
  activeCategories: Array<ProjectCategory>;
  toggleCategory: (category: ProjectCategory) => void;
  setCategories: (categories: ProjectCategory[]) => void
  activeTools: Array<string>;
  toggleTool: (tool: string) => void;
  resetFilters: () => void;
};

export const useProjectFilterStore = create<ProjectFilterStore>((set) => ({
  activeCategories: [],
  activeTools: [],
  
  toggleCategory: (category) => {
    set((state) => ({
      activeCategories: state.activeCategories.includes(category)
        ? state.activeCategories.filter((c) => c !== category)
        : [...state.activeCategories, category],
    }));
  },

  toggleTool: (tool) => {
    set((state) => ({
      activeTools: state.activeTools.includes(tool)
        ? state.activeTools.filter((t) => t !== tool)
        : [...state.activeTools, tool],
    }));
  },
  
  setCategories: (categories) => set({ activeCategories: categories }),


  resetFilters: () => {
    set({
      activeCategories: [],
      activeTools: []
    })
  }
}));
