import { Project } from "@/types/project";

export function useProjects() {
  const categories = [
    "Web App Development",
    "Native App Development",
    "DevOps & Infrastructure",
    "Agentic App Development",
  ];

  const tools = [
    "Next.js",
    "Nuxt.js",
    "C#",
    "Azure",
    "TypeScript",
    "Git",
    "GitHub",
    "JavaScript",
    "TypeScript",
    "Tailwind CSS",
  ];

  const rawProjects: Project[] = [
    {
      title: "FileTidy",
      category: "Native App Development",
      description: "Cross-platform file organization tool built with Avalonia and .NET.",
      coverImage: "/images/filetidy-og-image.png",
      link: "https://github.com/freemancodz/filetidy",
    },
    {
      title: "SnappShare",
      category: "Web App Development",
      description: "Fast, secure file sharing built with .NET, Azure Blob Storage & Vue.js.",
      coverImage: "/images/snappshare-og-image.png",
      link: "https://snappshare.vercel.app",
    },

    {
      title: "TellTheDev",
      category: "Feedback Tooling",
      description: "Lightweight dev feedback widget built with Vite, Supabase & TailwindCSS.",
      coverImage: "/images/tellthedev-og-image.png",
      link: "https://tellthedev.vercel.app",
    },

  ];

  // Enhance with aspect ratios
  const projects = rawProjects.map((project, index) => {
    let aspect = "aspect-[4/3]";
    if (index % 3 === 1) aspect = "aspect-square";
    if (index % 3 === 2) aspect = "aspect-[5/6]";

    return { ...project, aspect };
  });

  return {
    categories,
    tools,
    projects,
  };
}
