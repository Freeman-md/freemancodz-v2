import LinkButton from "@/components/ui/link-button";
import TableSkeleton from "@/components/ui/table-skeleton";
import { getCertifications } from "@/lib/certifications/data";
import { Suspense } from "react";
import CertificationTable from "./components/certification-table";

export default function Page() {
  const certifications = getCertifications();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Certification</h1>

        <LinkButton url="/admin/certifications/create" text="Create Item" />
      </div>

      <Suspense fallback={<TableSkeleton />}>
        <CertificationTable data={certifications} />
      </Suspense>
    </div>
  );
}
