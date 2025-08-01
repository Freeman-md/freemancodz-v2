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
import { Edit2Icon, Trash, ExternalLink } from "lucide-react";
import { use } from "react";
import Empty from "@/components/shared/empty";
import { deleteCertification } from "@/lib/certifications/actions";
import LinkButton from "@/components/ui/link-button";
import { Certification } from "@/types/journey";
import { Badge } from "@/components/ui/badge";

export default function CertificationTable({
  data,
}: {
  data: Promise<Certification[]>;
}) {
  const certifications = use(data);

  if (certifications.length <= 0) {
    return <Empty classes="text-black" message="No certifications found" />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Issuer</TableHead>
          <TableHead>Validity</TableHead>
          <TableHead>Tools</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {certifications.map((certification) => (
          <TableRow key={certification.id}>
            <TableCell>{certification.title}</TableCell>
            <TableCell>
              <Badge variant="outline">{certification.type}</Badge>
            </TableCell>
            <TableCell>{certification.issuer}</TableCell>
            <TableCell>
              {certification.start_date}
              {certification.end_date ? ` → ${certification.end_date}` : ""}
            </TableCell>
            <TableCell>
              {certification.tools?.length || certification.tool_count || 0}
            </TableCell>
            <TableCell className="flex space-x-2 justify-end items-center">
              {certification.link && (
                <a
                  href={certification.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View Credential"
                >
                  <Button variant="outline" size="icon">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              )}

              <LinkButton
                url={`/admin/certifications/edit/${certification.id}`}
                icon={<Edit2Icon className="w-4 h-4" />}
              />

              <form
                action={async () => await deleteCertification(certification.id)}
              >
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
