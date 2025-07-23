'use client'

import { deleteTool } from "@/lib/tools/actions"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"

export default function ToolTable({ tools }: { tools: { name: string }[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tool</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tools.map((tool) => (
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
