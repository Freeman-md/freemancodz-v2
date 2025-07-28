import CardsSkeleton from "@/components/ui/cards-skeleton";
import { getServices } from "@/lib/services/data";
import { Suspense } from "react";
import ServiceList from "./components/service-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

export default function Page() {
    const services = getServices()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Services</h1>

        <Button asChild variant="outline">
          <div>
            <PlusIcon />
          <Link href="/admin/services/create">Create Service</Link>
          </div>
        </Button>
      </div>

      <Suspense fallback={<CardsSkeleton />}>
        <ServiceList 
            data={services}
        />
      </Suspense>
    </div>
  );
}
