import { getTools } from "@/lib/tools/data";
import ExperienceFormWrapper from "../components/experience-form-wrapper";
import { getCategories } from "@/lib/categories/data";

export default function CreateExperiencePage() {
  const tools = getTools();
  const categories = getCategories()

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Create Experience</h1>

      <ExperienceFormWrapper
        mode="create"
        toolData={tools}
        categoryData={categories}
      />
    </div>
  );
}
