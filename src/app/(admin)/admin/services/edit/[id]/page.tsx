
import { notFound } from "next/navigation";
import { getServiceById } from "@/lib/services/data";
import { Suspense } from "react";
import EditServiceForm from "../../components/edit-service-form";
import FormSkeleton from "@/components/ui/form-skeleton";

export default function EditServicePage({ params }: { params: { id: string } }) {
  const service = getServiceById(params.id);

  if (!service) return notFound();

  return (
    <div className="md:max-w-2xl space-y-6">
      <h1 className="text-xl font-semibold">Edit Service</h1>

      <Suspense fallback={<FormSkeleton />}>
        <EditServiceForm 
          data={service}
        />
      </Suspense>
    </div>
  );
}
