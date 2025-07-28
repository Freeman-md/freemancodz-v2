"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useActionState, useState } from "react";
import { useEffect } from "react";
import { createService } from "@/lib/services/actions";
import { toast } from "sonner";
import CategorySelector from "../components/category-selector";

export default function CreateServicePage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [formState, formAction, isPending] = useActionState(createService, {
    status: "",
    errors: {},
    values: {
      name: "",
      description: "",
      categories: [],
    },
  });

  const errors = formState?.errors as {
    name?: string[];
    description?: string[];
    categories?: string[];
  };

  useEffect(() => {
    if (formState.status === "success") {
      setSelectedCategories([]);

      toast.success("Service created", {
        action: {
          label: "View All Services",
          onClick: () => {
            window.location.href = "/admin/services";
          },
        },
      });
    }
  }, [formState.status]);

  useEffect(() => {
    if (formState?.status === "error" && formState.values?.categories) {
      setSelectedCategories(formState.values.categories as string[]);
    }
  }, [formState]);

  return (
    <div className="md:max-w-2xl space-y-6">
      <h1 className="text-xl font-semibold">Create Service</h1>

      {formState?.status === "error" && !errors && (
        <p className="text-sm text-red-500">Something went wrong.</p>
      )}

      <form className="space-y-4" action={formAction}>
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input
            name="name"
            placeholder="Service title"
            defaultValue={formState?.values?.name}
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
            defaultValue={formState?.values?.description}
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
        />

        {selectedCategories.map((category) => (
          <input
            key={category}
            type="hidden"
            name="categories"
            value={category}
          />
        ))}

        <Button type="submit" className="mt-4" disabled={isPending}>
          {isPending ? "Saving..." : "Save Service"}
        </Button>
      </form>
    </div>
  );
}
