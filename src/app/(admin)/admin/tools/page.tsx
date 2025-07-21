"use client"

import { ToolForm } from "./components/ToolForm"
import { ToolTable } from "./components/ToolTable"
import { useTools } from "./hooks/use-tools"

export default function ToolsPage() {
  const { tools, addTool, deleteTool, loading } = useTools()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Tools</h1>
        <ToolForm onSubmit={addTool} />
      </div>

      {loading ? (
        <p>Loading tools...</p>
      ) : (
        <ToolTable tools={tools} onDelete={deleteTool} />
      )}
    </div>
  )
}
