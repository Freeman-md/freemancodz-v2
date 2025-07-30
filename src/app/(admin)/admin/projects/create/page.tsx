import { getCategories } from "@/lib/categories/data";
import { getTools } from "@/lib/tools/data";
import ProjectFormWrapper from "../components/project-form-wrapper";

export default function CreateProjectPage() {
  const categories = getCategories();
  const tools = getTools();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Create Project</h1>

      <ProjectFormWrapper 
        mode="create" 
        categoryData={categories} 
        toolData={tools}
        />

    </div>
  );
}
