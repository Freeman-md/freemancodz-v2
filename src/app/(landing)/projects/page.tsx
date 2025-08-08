import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore SaaS platforms, cloud-native apps, and UI/UX projects built by Freeman Madudili, full-stack .NET & JavaScript developer.",
  keywords: [
    "Freeman Madudili",
    "projects",
    "portfolio",
    "full-stack developer",
    ".NET",
    "JavaScript",
    "Next.js",
    "cloud-native",
    "SaaS",
    "UI/UX",
    "software engineer",
  ],
};
import { getCategories } from "@/lib/categories/data";
import { getTools } from "@/lib/tools/data";
import { getAllProjectsForCards } from "@/lib/projects/data";
import AllProjects from "../../../features/projects/components/AllProjects";

export default async function ProjectsPage() {
  const [projects, categories, tools] = await Promise.all([
    getAllProjectsForCards(),
    getCategories(),
    getTools(),
  ]);

  const categoryNames = categories.map((category) => category.name);
  const toolNames = tools.map((tool) => tool.name);

  const usedCategorySet = new Set(projects.flatMap((p) => p.categories ?? []));
  const usedToolSet = new Set(projects.flatMap((p) => p.tools ?? []));

  const filteredCategories = categoryNames.filter((name) =>
    usedCategorySet.has(name)
  );
  const filteredTools = toolNames.filter((name) => usedToolSet.has(name));

  return (
    <AllProjects
      projects={projects}
      categories={filteredCategories}
      tools={filteredTools}
    />
  );
}
