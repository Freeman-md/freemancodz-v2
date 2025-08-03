import { Suspense } from "react";
import TableSkeleton from "@/components/ui/table-skeleton";
import ContactMessageTable from "./components/contact-messages-table";
import { getContactMessages } from "@/lib/contact-messages/data";

export const metadata = { title: "Contact Messages | Admin" };

export default async function ContactMessagesPage() {
  const contactMessages = getContactMessages();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Contact Messages</h1>
      </div>

      <Suspense fallback={<TableSkeleton />}>
        <ContactMessageTable data={contactMessages} />
      </Suspense>
    </div>
  );
}
