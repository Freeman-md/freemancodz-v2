"use client";

import Empty from "@/components/shared/empty";
import { Service } from "@/types/showcase";
import { use } from "react";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteService } from "@/lib/services/actions";
import { AnimatePresence, motion } from "motion/react";

export default function ServiceList({ data }: { data: Promise<Service[]> }) {
  const services = use(data);

  if (services.length <= 0) {
    return <Empty classes="text-black" message="No services found" />;
  }

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
              {/* Title */}
              <h3 className="text-lg font-semibold">{service.name}</h3>

              {/* Icons */}
              <div className="flex">
                <Button variant="ghost" className="cursor-pointer">
                  <Pencil className="w-4 h-4" />
                </Button>

                <form action={async () => await deleteService(service.name)}>
                  <Button
                    type="submit"
                    variant="ghost"
                    className="cursor-pointer text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </form>
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
