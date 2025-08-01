import { getTools } from "@/lib/tools/data";
import { getProjects } from "@/lib/projects/data";
import CertificationFormWrapper from "../../components/certification-form-wrapper";
import { getCertificationById } from "@/lib/certifications/data";
import { getModules } from "@/lib/modules/data";

export default async function EditCertificationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const certification = getCertificationById(id)
  const project = getProjects();
  const modules = getModules();
  const tools = getTools();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Edit Project</h1>

      <CertificationFormWrapper
        mode="edit"
        certificationData={certification}
        projectData={project}
        moduleData={modules}
        toolData={tools}
      />
    </div>
  );
}
