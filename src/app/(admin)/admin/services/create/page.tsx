import { getCategories } from "@/lib/categories/data";
import ServiceFormWrapper from "../components/service-form-wrapper";

export default function CreateServicePage() {
  const categories = getCategories();

  return (
    <div className="md:max-w-2xl space-y-6">
      <h1 className="text-xl font-semibold">Create Service</h1>

      <ServiceFormWrapper mode="create" categoryData={categories} />

    </div>
  );
}
