"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import CategorySelector from "../../../../../components/ui/category-selector";

type Props = {
  action: any; 
  defaultValues?: {
    name?: string;
    description?: string;
    categories?: string[];
  };
  categories: string[],
  onSuccess?: () => void;
  onReload: () => void;
  submitLabel?: string;
};

export default function ServiceForm({
  action,
  defaultValues = {},
  onSuccess,
  onReload,
  categories,
  submitLabel = "Save Service",
}: Props) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    defaultValues.categories || []
  );

  const [formState, formAction, isPending] = useActionState(action, {
    status: "",
    errors: {},
    values: {
      name: defaultValues.name || "",
      description: defaultValues.description || "",
      categories: defaultValues.categories || [],
    },
  });

  const errors = formState?.errors as {
    name?: string[];
    description?: string[];
    categories?: string[];
  };

  useEffect(() => {
    if (formState.status === "success") {
      if (!defaultValues?.name) setSelectedCategories([]);
      onSuccess?.();
    }
  }, [formState.status, onSuccess, defaultValues.name]);

  useEffect(() => {
    if (formState?.status === "error" && formState.values?.categories) {
      setSelectedCategories(formState.values.categories as string[]);
    }
  }, [formState]);

  return (
    <form className="space-y-4" action={formAction}>
      <div className="space-y-2">
        <label className="text-sm font-medium">Title</label>
        <Input
          name="name"
          placeholder="Service title"
          defaultValue={formState?.values?.name ?? defaultValues.name}
        />
        {errors?.name && (
          <small className="text-sm text-red-500">{errors.name[0]}</small>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea
          name="description"
          placeholder="Brief description (max 200 chars)"
          maxLength={200}
          rows={3}
          className="resize-none"
          defaultValue={
            formState?.values?.description ?? defaultValues.description
          }
        />
        {errors?.description && (
          <small className="text-sm text-red-500">
            {errors.description[0]}
          </small>
        )}
      </div>

      <CategorySelector
        selected={selectedCategories}
        onChange={setSelectedCategories}
        error={errors?.categories?.[0]}
        categories={categories}
        onReload={onReload}
      />

      {selectedCategories.map((category) => (
        <input key={category} type="hidden" name="categories" value={category} />
      ))}

      <Button type="submit" className="mt-4" disabled={isPending}>
        {isPending ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
