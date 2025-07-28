"use client";

import { toast } from "sonner";
import { createService } from "@/lib/services/actions";
import ServiceForm from "../components/service-form";

export default function CreateServicePage() {
  return (
    <div className="md:max-w-2xl space-y-6">
      <h1 className="text-xl font-semibold">Create Service</h1>

      <ServiceForm
        action={createService}
        onSuccess={() => {
          toast.success("Service created", {
            action: {
              label: "View All Services",
              onClick: () => (window.location.href = "/admin/services"),
            },
          });
        }}
      />
    </div>
  );
}
