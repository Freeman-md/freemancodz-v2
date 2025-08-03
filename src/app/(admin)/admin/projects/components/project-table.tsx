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
import { Edit2Icon, ImageIcon, Trash } from "lucide-react";
import { use, useState } from "react";
import { Project } from "@/types/project";
import Empty from "@/components/shared/empty";
import { deleteProject } from "@/lib/projects/actions";
import LinkButton from "@/components/ui/link-button";
import ImageUploadModal from "./image-upload-modal";
import Image from "next/image";

export default function ProjectTable({ data }: { data: Promise<Project[]> }) {
  const projects = use(data);
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);

  if (projects.length === 0) {
    return <Empty classes="text-black" message="No projects found" />;
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cover</TableHead>
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
              <TableCell>
                {project.cover_image ? (
                  <a
                    href={project.cover_image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Image
                      src={project.cover_image}
                      alt={`Cover image of ${project.title}`}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-md object-cover"
                    />
                  </a>
                ) : (
                  <span className="text-muted-foreground text-xs">None</span>
                )}
              </TableCell>

              <TableCell>{project.title}</TableCell>
              <TableCell>{project.status}</TableCell>
              <TableCell>{project.role}</TableCell>
              <TableCell>{project.year}</TableCell>
              <TableCell>{project.featured ? "✅" : "❌"}</TableCell>
              <TableCell>{project.is_private ? "🔒" : "🌐"}</TableCell>

              <TableCell className="flex justify-end items-center gap-2">
                <LinkButton
                  url={`/admin/projects/edit/${project.id}`}
                  icon={<Edit2Icon className="w-4 h-4" />}
                />

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setOpenProjectId(project.id)}
                >
                  <ImageIcon className="w-4 h-4" />
                </Button>

                <form action={async () => await deleteProject(project.id)}>
                  <Button
                    type="submit"
                    variant="destructive"
                    size="icon"
                    className="cursor-pointer"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {openProjectId && (
        <ImageUploadModal
          open={true}
          projectId={openProjectId}
          currentUrl={
            projects.find((p) => p.id === openProjectId)?.cover_image ?? undefined
          }
          onClose={() => setOpenProjectId(null)}
        />
      )}
    </>
  );
}
