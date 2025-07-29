"use client";

import { use, useState } from "react";
import { toast } from "sonner";
import { Category, Service } from "@/types/showcase";
import { getCategories } from "@/lib/categories/data";
import { createService, updateService } from "@/lib/services/actions";
import ServiceForm from "./service-form";
import Empty from "@/components/shared/empty";

type Props = {
  mode: "create" | "edit";
  serviceData?: Promise<Service | null>; // only for edit
  categoryData: Promise<Category[] | null>;
};

export default function ServiceFormWrapper({ mode, serviceData, categoryData }: Props) {
  const service = serviceData ? use(serviceData) : null;
  const initialCategories = use(categoryData) ?? [];

  const [categories, setCategories] = useState<string[]>(
    initialCategories.map((c) => c.name)
  );

  const reloadCategories = async () => {
    const latest = await getCategories();
    setCategories(latest.map((c) => c.name));
  };

  if (mode === "edit" && !service)
    return <Empty classes="text-black" message="Service not found" />;

  return (
    <ServiceForm
      action={mode === "edit" ? updateService : createService}
      defaultValues={
        service
          ? {
              name: service.name,
              description: service.description,
              categories: service.categories,
            }
          : undefined
      }
      categories={categories}
      submitLabel={mode === "edit" ? "Update Service" : "Save Service"}
      onSuccess={() => {
        if (mode === "edit") {
          toast.success("Service updated");
        } else {
          toast.success("Service created", {
            action: {
              label: "View All Services",
              onClick: () => (window.location.href = "/admin/services"),
            },
          });
        }
      }}
      onReload={reloadCategories}
    />
  );
}
