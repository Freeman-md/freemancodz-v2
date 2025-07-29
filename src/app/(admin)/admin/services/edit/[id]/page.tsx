import { getServiceById } from "@/lib/services/data";
import { Suspense } from "react";
import EditServiceForm from "../../components/edit-service-form";
import FormSkeleton from "@/components/ui/form-skeleton";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const service = getServiceById(id);

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