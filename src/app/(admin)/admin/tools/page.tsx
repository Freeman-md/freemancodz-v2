import { getTools } from "@/lib/tools/data"
import { Suspense } from "react"
import ToolTableSkeleton from "./components/ToolTableSkeleton"
import ToolTable from "./components/ToolTable"
import ToolForm from "./components/ToolForm"

export const metadata = { title: "Tools | Admin" }


export default async function ToolsPage() {
  const tools = await getTools()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Tools</h1>
        <ToolForm />
      </div>

       <Suspense fallback={<ToolTableSkeleton />}>
        <ToolTable tools={tools} />
      </Suspense>
    </div>
  )
}
