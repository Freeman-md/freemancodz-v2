"use client";
import { Badge } from "@/components/ui/badge";
import { useProjectsData } from "@/hooks/useProjectsData";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import ProjectCard from "../ui/ProjectCard";

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const { categories, tools, projects } = useProjectsData();

  return (
    <section id="projects" className="bg-secondary/50">
      <div ref={ref} className="container py-20 pb-20 space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="uppercase text-base font-medium text-center"
        >
          I Build Stuff that Works
        </motion.h2>

        <div>
          <motion.div
            className="flex items-center justify-center md:flex-wrap overflow-x-scroll w-full mx-auto"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              visible: { transition: { staggerChildren: 0.07 } },
              hidden: {},
            }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Badge
                  variant="outline"
                  className="rounded-full p-2 m-2 border-white/40 text-white/40 transition duration-500 hover:text-white hover:border-white"
                  asChild
                >
                  <button className="cursor-pointer">{category}</button>
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex items-center justify-center md:flex-wrap overflow-x-scroll w-full mx-auto"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              visible: { transition: { staggerChildren: 0.05 } },
              hidden: {},
            }}
          >
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Badge
                  variant="outline"
                  className="rounded-full p-2 m-2 border-white/40 text-white/40 transition duration-500 hover:text-white hover:border-white"
                  asChild
                >
                  <button className="cursor-pointer">{tool}</button>
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 mt-8">
          {projects.map((project, index) => {
            let aspect = "aspect-[4/3]";
            if (index % 3 === 1) aspect = "aspect-square";
            if (index % 3 === 2) aspect = "aspect-[5/6]";
            return (
              <ProjectCard
                key={index}
                project={project}
                aspect={aspect}
                delay={index * 0.1}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
