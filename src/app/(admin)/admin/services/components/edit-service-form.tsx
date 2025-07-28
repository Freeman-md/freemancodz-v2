"use client"

import { Service } from "@/types/showcase"
import { use } from "react"
import ServiceForm from "./service-form"
import { updateService } from "@/lib/services/actions"
import { notFound } from "next/navigation"
import { toast } from "sonner"

export default function EditServiceForm({
    data
}: {
    data: Promise<Service | null>
}) {
    const service = use(data)

    if (!service) return notFound();

    return (
        <ServiceForm
        action={updateService}
        defaultValues={{
          name: service.name,
          description: service.description,
          categories: service.categories,
        }}
        submitLabel="Update Service"
        onSuccess={() => {
          toast.success("Service updated");
        }}
      />
    )
}