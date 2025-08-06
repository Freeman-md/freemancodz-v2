"use client";

import { useEducation } from "@/hooks/useEducation";
import { useRef } from "react";
import { useInView, motion } from "motion/react";
import TimelineItem from "../ui/timeline-item";
import { Certification, Experience } from "@/types/journey";

export default function Journey({
  experiences
} : {
  experiences: Experience[],
  certifications?: Certification[],
}) {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const { educationData } = useEducation();

  return (
    <section id="journey" className="bg-dot-pattern">
      <div ref={ref} className="container py-40 pb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="uppercase text-base font-medium mb-16"
        >
          My Journey So Far
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-20 relative">
          <div className="flex flex-col gap-6">
            <h3 className="text-white text-lg font-semibold uppercase tracking-wide">
              Experience
            </h3>
            <ol className="relative">
              {experiences.map((experience) => (
                <TimelineItem key={experience.id} {...experience} />
              ))}
            </ol>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-white text-lg font-semibold uppercase tracking-wide">
              Certifications
            </h3>
            <ol className="relative space-y-8">
              {educationData.map((exp) => (
                <TimelineItem key={exp.id} {...exp} />
              ))}

              {/* {certificationData.map((exp) => (
                <TimelineItem key={exp.id} {...exp} />
              ))} */}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
