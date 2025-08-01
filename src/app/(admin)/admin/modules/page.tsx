import { Suspense } from "react";
import TableSkeleton from "@/components/ui/table-skeleton";
import { getModules } from "@/lib/modules/data";
import ModuleForm from "./components/module-form";
import ModuleTable from "./components/module-table";

export const metadata = { title: "Modules | Admin" };

export default async function ModulesPage() {
  const modules = getModules();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Modules</h1>
        <ModuleForm />
      </div>

      <Suspense fallback={<TableSkeleton />}>
        <ModuleTable data={modules} />
      </Suspense>
    </div>
  );
}
