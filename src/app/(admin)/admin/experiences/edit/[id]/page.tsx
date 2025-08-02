import { getTools } from "@/lib/tools/data";
import ExperienceFormWrapper from "../../components/experience-form-wrapper";
import { getExperienceById } from "@/lib/experiences/data";
import { getCategories } from "@/lib/categories/data";

export default async function EditCertificationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const experience = getExperienceById(id)
  const categories = getCategories();
  const tools = getTools();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Edit Project</h1>

      <ExperienceFormWrapper
        mode="edit"
        experienceData={experience}
        categoryData={categories}
        toolData={tools}
      />
    </div>
  );
}
