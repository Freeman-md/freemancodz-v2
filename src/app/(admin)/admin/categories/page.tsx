import TableSkeleton from "@/components/ui/table-skeleton";
import { getCategories } from "@/lib/categories/data";
import { Suspense } from "react";
import CategoryTable from "./components/category-table";
import CategoryForm from "./components/category-form";

export default function Page() {
  const categories = getCategories();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Categories</h1>

        <CategoryForm />
      </div>

      <Suspense fallback={<TableSkeleton />}>
        <CategoryTable data={categories} />
      </Suspense>
    </div>
  );
}
