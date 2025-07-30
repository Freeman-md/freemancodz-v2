"use client";

import EntitySelector from "@/components/ui/entity-selector";
import CategoryForm from "@/app/(admin)/admin/categories/components/category-form";
import { EntitySelectorProps } from "@/components/ui/entity-selector";

type CategorySelectorProps = Omit<
  EntitySelectorProps,
  "entities" | "entityLabel" | "renderCreateForm"
> & {
  categories: string[];
};

export default function CategorySelector({
  categories,
  ...rest
}: CategorySelectorProps) {
  return (
    <EntitySelector
      {...rest}
      label="Categories"
      entities={categories}
      entityLabel="Category"
      renderCreateForm={(searchTerm) => (
        <CategoryForm
          defaultValue={searchTerm}
          onCreate={rest.onReload}
          variant="link"
        />
      )}
    />
  );
}
