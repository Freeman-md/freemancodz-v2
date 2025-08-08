"use client";

import { useInView, motion } from "motion/react";
import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ProjectCategory } from "@/types/project";
import { Service } from "@/types/showcase";

export default function WhatIDo({ services }: { services: Service[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const router = useRouter();

  const handleServiceClick = useCallback((categories: ProjectCategory[]) => {
    const unique = Array.from(new Set(categories)).filter(Boolean);
    if (unique.length === 0) {
      router.push("/projects");
      return;
    }

    const qs = new URLSearchParams({ categories: unique.join(",") });
    router.push(`/projects?${qs.toString()}`);
  }, [router]);

  return (
    <section id="what-i-do" className="relative overflow-hidden">
      <div ref={ref} className="py-40 space-y-8 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="uppercase text-base font-medium container"
        >
          What I Do
        </motion.h2>

        <div className="relative">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-t border-white/20 py-6 transition duration-500 hover:bg-primary hover:text-secondary relative max-md:cursor-pointer"
              data-cursor="hover"
              data-cursor-label="View projects"
              onClick={() => handleServiceClick(service.categories as ProjectCategory[])}
            >
              <div className="container py-0">
                <h3 className="uppercase text-xl md:text-3xl lg:text-5xl font-semibold">
                  {service.name}
                </h3>
              </div>

              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-1/2 right-10 -translate-y-1/2 w-[280px] text-sm leading-relaxed hidden sm:block"
                >
                  <p className="text-secondary">{service.description}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 1.2, ease: "easeOut" }}
        className="absolute -right-60 sm:-right-40 md:-right-120 -rotate-45 bottom-0 w-[70vw] h-[80vh] pointer-events-none"
      >
        <Image
          src="/images/me-sideways.png"
          alt="Freemancodz - Headshot"
          fill
          className="object-contain"
          priority
        />
      </motion.div>
    </section>
  );
}
