"use client";

import Empty from "@/components/shared/empty";
import { Service } from "@/types/showcase";
import { use } from "react";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteService } from "@/lib/services/actions";
import { AnimatePresence, motion } from "motion/react";
import Spinner from "@/components/ui/spinner";
import { useTransition, useState } from "react";

export default function ServiceList({ data }: { data: Promise<Service[]> }) {
  const services = use(data);
  const [isPending, startTransition] = useTransition();
  const [deletingName, setDeletingName] = useState<string | null>(null);

  if (services.length <= 0) {
    return <Empty classes="text-black" message="No services found" />;
  }

  const handleDelete = (name: string) => {
    setDeletingName(name);
    startTransition(async () => {
      const formData = new FormData();
      formData.set("name", name);
      await deleteService(null, formData);
      // Optionally: show toast here
      setDeletingName(null);
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence initial={false}>
        {services.map((service) => (
          <motion.div
            key={service.name}
            layout
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="rounded-xl border p-4 shadow-sm space-y-3"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">{service.name}</h3>

              <div className="flex">
                <Button variant="ghost" className="cursor-pointer">
                  <Pencil className="w-4 h-4" />
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="cursor-pointer text-red-500"
                  onClick={() => handleDelete(service.name)}
                  disabled={isPending && deletingName === service.name}
                >
                  {isPending && deletingName === service.name ? (
                    <Spinner />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              {service.description}
            </p>

            <div className="flex space-x-2 overflow-x-auto scrollbar-hide pt-1">
              {service.categories.map((category, i) => (
                <Badge key={i} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
