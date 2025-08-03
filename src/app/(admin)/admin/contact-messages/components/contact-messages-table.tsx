"use client";

import { markContactMessageAsRead } from "@/lib/contact-messages/actions";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import { use } from "react";
import Empty from "@/components/shared/empty";
import { ContactMessage } from "@/types/contact-message";

export default function ContactMessageTable({
  data,
}: {
  data: Promise<ContactMessage[]>;
}) {
  const contactMessages = use(data);

  if (contactMessages.length <= 0) {
    return <Empty classes="text-black" message="No contact messages found" />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Read</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contactMessages.map((contactMessage) => (
          <TableRow key={contactMessage.id}>
            <TableCell>{contactMessage.name}</TableCell>
            <TableCell>{contactMessage.email}</TableCell>
            <TableCell>{contactMessage.message}</TableCell>
            <TableCell>{contactMessage.read}</TableCell>
            <TableCell className="text-right">
              <form
                action={async () =>
                  await markContactMessageAsRead(contactMessage.id)
                }
              >
                <Button type="submit" variant="destructive">
                  <EyeIcon />
                </Button>
              </form>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
