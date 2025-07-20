import { create } from 'zustand';
import type { Project } from '@/types/project';

type ProjectStore = {
  selectedProject: Project | null;
  setSelectedProject: (project: Project) => void;
  clearSelectedProject: () => void;
};

export const useProjectStore = create<ProjectStore>((set) => ({
  selectedProject: null,
  setSelectedProject: (project) => set({ selectedProject: project }),
  clearSelectedProject: () => set({ selectedProject: null }),
}));
