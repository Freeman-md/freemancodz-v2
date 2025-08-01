import { getTools } from "@/lib/tools/data";
import { Suspense } from "react";
import TableSkeleton from "@/components/ui/table-skeleton";
import ToolTable from "./components/tool-table";
import ToolForm from "./components/tool-form";

export const metadata = { title: "Tools | Admin" };

export default async function ToolsPage() {
  const tools = getTools();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Tools</h1>
        <ToolForm />
      </div>

      <Suspense fallback={<TableSkeleton />}>
        <ToolTable data={tools} />
      </Suspense>
    </div>
  );
}
