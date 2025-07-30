"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2Icon, Trash } from "lucide-react";
import { use } from "react";
import { Project } from "@/types/project";
import Empty from "@/components/shared/empty";
import { deleteProject } from "@/lib/projects/actions";
import LinkButton from "@/components/ui/link-button";

export default function ProjectTable({ data }: { data: Promise<Project[]> }) {
  const projects = use(data);

  if (projects.length <= 0) {
    return <Empty classes="text-black" message="No projects found" />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Featured</TableHead>
          <TableHead>Private</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell>{project.title}</TableCell>
            <TableCell>{project.status}</TableCell>
            <TableCell>{project.role}</TableCell>
            <TableCell>{project.year}</TableCell>
            <TableCell>{project.featured ? "✅" : "❌"}</TableCell>
            <TableCell>{project.is_private ? "🔒" : "🌐"}</TableCell>
            <TableCell className="flex space-x-2 justify-end items-center">
              <form action={async () => await deleteProject(project.id)}>
                <Button type="submit" variant="destructive">
                  <Trash />
                </Button>
              </form>

              <LinkButton
                url={`/admin/projects/edit/${project.id}`}
                icon={<Edit2Icon />}
               />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
