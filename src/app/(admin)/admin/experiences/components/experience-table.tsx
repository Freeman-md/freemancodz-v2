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
import Empty from "@/components/shared/empty";
import LinkButton from "@/components/ui/link-button";
import { Experience } from "@/types/journey";
import { deleteExperience } from "@/lib/experiences/actions";

export default function ExperienceTable({
  data,
}: {
  data: Promise<Experience[]>;
}) {
  const experiences = use(data);

  if (experiences.length <= 0) {
    return <Empty classes="text-black" message="No experiences found" />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Tools</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {experiences.map((exp) => (
          <TableRow key={exp.id}>
            <TableCell>{exp.title}</TableCell>
            <TableCell>{exp.company}</TableCell>
            <TableCell>{exp.location}</TableCell>
            <TableCell>
              {exp.start_date}
              {exp.end_date ? ` → ${exp.end_date}` : ""}
            </TableCell>
            <TableCell>
              {exp.tools?.length || exp.tool_count || 0}
            </TableCell>
            <TableCell className="flex space-x-2 justify-end items-center">
              <LinkButton
                url={`/admin/experiences/edit/${exp.id}`}
                icon={<Edit2Icon className="w-4 h-4" />}
              />
              <form action={async () => await deleteExperience(exp.id)}>
                <Button type="submit" variant="destructive" size="icon">
                  <Trash className="w-4 h-4" />
                </Button>
              </form>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
