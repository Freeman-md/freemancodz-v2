import LinkButton from "@/components/ui/link-button";
import TableSkeleton from "@/components/ui/table-skeleton";
import { getExperiences } from "@/lib/experiences/data";
import { Suspense } from "react";
import ExperienceTable from "./components/experience-table";

export default function Page() {
  const experiences = getExperiences();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Experience</h1>

        <LinkButton url="/admin/experiences/create" text="Create Experience" />
      </div>

      <Suspense fallback={<TableSkeleton />}>
        <ExperienceTable data={experiences} />
      </Suspense>
    </div>
  );
}
