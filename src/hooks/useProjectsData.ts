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
      coverImage: "/images/filetidy.png",
      link: "https://github.com/freemancodz/filetidy",
    },
    {
      title: "PlanPilot",
      category: "Agentic App Development",
      description: "AI project planner using LangGraph & Next.js.",
      coverImage: "/images/planpilot.png",
      link: "https://planpilot.ai",
    },
    {
      title: "PlanPilot",
      category: "Agentic App Development",
      description: "AI project planner using LangGraph & Next.js.",
      coverImage: "/images/planpilot.png",
      link: "https://planpilot.ai",
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
