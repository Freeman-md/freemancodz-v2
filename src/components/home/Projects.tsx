'use client'

import { motion, useInView } from "motion/react";
import { useRef } from "react";

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <section id="projects" className="bg-secondary/50">
      <div ref={ref} className="container py-20 pb-20 space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="uppercase text-base font-medium"
        >
          I Build Stuff that Works
        </motion.h2>
      </div>
    </section>
  );
}
