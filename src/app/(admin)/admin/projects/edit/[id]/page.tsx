import { getCategories } from "@/lib/categories/data";
import { getTools } from "@/lib/tools/data";
import ProjectFormWrapper from "../../components/project-form-wrapper";
import { getProjectById } from "@/lib/projects/data";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = getProjectById(id);
  const categories = getCategories();
  const tools = getTools();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Edit Project</h1>

      <ProjectFormWrapper
        mode="edit"
        projectData={project}
        categoryData={categories}
        toolData={tools}
      />
    </div>
  );
}
