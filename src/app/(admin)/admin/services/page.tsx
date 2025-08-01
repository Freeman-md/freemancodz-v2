import CardsSkeleton from "@/components/ui/cards-skeleton";
import { getServices } from "@/lib/services/data";
import { Suspense } from "react";
import ServiceList from "./components/service-list";
import LinkButton from "@/components/ui/link-button";

export default function Page() {
  const services = getServices();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Services</h1>

        <LinkButton url="/admin/services/create" text="Create Service" />
      </div>

      <Suspense fallback={<CardsSkeleton />}>
        <ServiceList data={services} />
      </Suspense>
    </div>
  );
}
