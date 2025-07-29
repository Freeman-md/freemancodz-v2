"use client"

import { Service } from "@/types/showcase"
import { use } from "react"
import ServiceForm from "./service-form"
import { updateService } from "@/lib/services/actions"
import { toast } from "sonner"
import Empty from "@/components/shared/empty"

export default function EditServiceForm({
    data
}: {
    data: Promise<Service | null>
}) {
    const service = use(data)

    if (!service) return <Empty classes="text-black" message={`Service not found`} />;

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