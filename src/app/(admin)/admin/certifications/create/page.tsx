import { getTools } from "@/lib/tools/data";
import { getModules } from "@/lib/modules/data";
import CertificationFormWrapper from "../components/certification-form-wrapper";
import { getProjects } from "@/lib/projects/data";

export default function CreateCertificationPage() {
  const tools = getTools();
  const modules = getModules();
  const projects = getProjects()

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Create Certification</h1>

      <CertificationFormWrapper
        mode="create"
        toolData={tools}
        moduleData={modules}
        projectData={projects}
      />
    </div>
  );
}
