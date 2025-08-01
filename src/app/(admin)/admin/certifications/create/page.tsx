import { getTools } from "@/lib/tools/data";
import { getModules } from "@/lib/modules/data";
import CertificationFormWrapper from "../components/certification-form-wrapper";

export default function CreateCertificationPage() {
  const tools = getTools();
  const modules = getModules();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Create Certification</h1>

      <CertificationFormWrapper
        mode="create"
        toolData={tools}
        moduleData={modules}
      />
    </div>
  );
}
