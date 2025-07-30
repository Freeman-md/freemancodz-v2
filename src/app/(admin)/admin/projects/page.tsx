import AdminCreateButton from "@/components/ui/admin-create-button";
import TableSkeleton from "@/components/ui/table-skeleton";
import { getProjects } from "@/lib/projects/data";
import { Suspense } from "react";
import ProjectTable from "./components/project-table";

export default function Page() {
  const projects = getProjects();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Projects</h1>

        <AdminCreateButton url="/admin/projects/create" text="Create Project" />
      </div>

      <Suspense fallback={<TableSkeleton />}>
        <ProjectTable data={projects} />
      </Suspense>
    </div>
  );
}
