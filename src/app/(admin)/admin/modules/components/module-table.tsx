'use client'

import { deleteModule } from "@/lib/modules/actions"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { use } from "react"
import { Module } from "@/types/showcase"
import Empty from "@/components/shared/empty"

export default function ModuleTable({ data } : { data: Promise<Module[]> }) {
  const modules = use(data)

  if (modules.length <= 0) {
      return (
        <Empty classes="text-black" message="No modules found" />
      );
    }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Module</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {modules.map((module) => (
          <TableRow key={module.name}>
            <TableCell>{module.name}</TableCell>
            <TableCell className="text-right">
              <form action={async () => await deleteModule(module.name)}>
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
