import { getServiceById } from "@/lib/services/data";
import { Suspense } from "react";
import FormSkeleton from "@/components/ui/form-skeleton";
import { getCategories } from "@/lib/categories/data";
import ServiceFormWrapper from "../../components/service-form-wrapper";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const service = getServiceById(id);
  const categories = getCategories();

  return (
    <div className="md:max-w-2xl space-y-6">
      <h1 className="text-xl font-semibold">Edit Service</h1>

      <Suspense fallback={<FormSkeleton />}>
        <ServiceFormWrapper
          mode="edit"
          serviceData={service}
          categoryData={categories}
        />
      </Suspense>
    </div>
  );
}
