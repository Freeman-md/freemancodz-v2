// hooks/useProjectsData.ts
export function useProjectsData() {
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

  const rawProjects = [
    {
      title: "FileTidy",
      category: "Native App Development",
      description: "Cross-platform file organization tool built with Avalonia and .NET.",
      coverImage: "/images/filetidy-og-image.png",
      link: "https://github.com/freemancodz/filetidy",
    },
    {
      title: "SkillBridge",
      category: "Agentic App Development",
      description: "AI **** using LangGraph & Next.js.",
      coverImage: "/images/filetidy-og-image.png",
      link: "https://skillbridge.ai",
    },
    {
      title: "SkillBridge",
      category: "Agentic App Development",
      description: "AI ***** planner using LangGraph & Next.js.",
      coverImage: "/images/filetidy-og-image.png",
      link: "https://skillbridge.ai",
    },
  ];

  // Enhance with aspect ratios
  const projects = rawProjects.map((project, index) => {
    let aspect = "aspect-[4/3]";
    if (index % 3 === 1) aspect = "aspect-square";
    if (index % 3 === 2) aspect = "aspect-[5/6]";

    return { ...project, aspect };
  });

  return { categories, tools, projects };
}
