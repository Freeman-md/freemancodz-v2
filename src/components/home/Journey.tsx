"use client";

import { useExperience } from "@/hooks/useExperience";
// import { useEducation } from "@/hooks/useEducation";
// import { useCertifications } from "@/hooks/useCertifications";
import { useRef } from "react";
import { useInView, motion } from "motion/react";
import TimelineItem from "../ui/timeline-item";

export default function Journey() {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const { experienceData } = useExperience();

  console.log(experienceData)
  // const { educationData } = useEducation();
  // const { certificationData } = useCertifications();

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
          <ol className="relative">
            {experienceData.map((exp) => (
              <TimelineItem key={exp.id} {...exp} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
