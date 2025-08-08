import { getCategories } from "@/lib/categories/data";
import { getTools } from "@/lib/tools/data";
import { getAllProjectsForCards } from "@/lib/projects/data";
import AllProjects from "./components/AllProjects";

export default async function ProjectsPage() {
  const [projects, categories, tools] = await Promise.all([
    getAllProjectsForCards(),
    getCategories(),
    getTools(),
  ]);

  const modifiedCategories = categories.map(category => category.name);
  const modifiedTools = tools.map(tool => tool.name);

  return <AllProjects projects={projects} categories={modifiedCategories} tools={modifiedTools} />;
}
