'use client'

import { deleteTool } from "@/lib/tools/actions"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { use } from "react"
import { Tool } from "@/types/showcase"

export default function ToolTable({ tools } : { tools: Promise<Tool[]> }) {
  const data = use(tools)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tool</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((tool) => (
          <TableRow key={tool.name}>
            <TableCell>{tool.name}</TableCell>
            <TableCell className="text-right">
              <form action={async () => await deleteTool(tool.name)}>
                <Button type="submit" variant="destructive">
                  <Trash />
                </Button>
              </form>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
