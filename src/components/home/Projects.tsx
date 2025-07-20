"use client";
import { Badge } from "@/components/ui/badge";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import ProjectCard from "../projects/ProjectCard";
import { useProjects } from "@/hooks/useProjects";
import ProjectDetails from "../projects/ProjectDetails";
import { useProjectFilterStore } from "@/store/useProjectFilterStore";

export default function Projects() {
  const { activeCategories, activeTools, toggleCategory, toggleTool } =
    useProjectFilterStore();
  const ref = useRef(null);
  const isInView = useInView(ref);
  const { categories, tools, projects } = useProjects();

  return (
    <section id="projects" className="bg-secondary/50">
      <pre>{activeCategories}</pre>
      <pre>{activeTools}</pre>
      <div ref={ref} className="container py-20 pb-20 space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="uppercase text-base font-medium text-center"
        >
          I Build Stuff that Works
        </motion.h2>

        <div className="space-y-2">
          <motion.div
            className="flex items-center justify-center md:flex-wrap gap-2 overflow-x-scroll w-full mx-auto"
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
                  className={`cursor-pointer ${
                    activeCategories.includes(category)
                      ? "text-primary border-primary"
                      : "border-white/40 text-white/40 hover:text-white hover:border-white"
                  }`}
                  asChild
                >
                  <button onClick={() => toggleCategory(category)}>
                    {category}
                  </button>
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex items-center justify-center md:flex-wrap gap-2 overflow-x-scroll w-full mx-auto"
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
                  className={`cursor-pointer ${
                    activeTools.includes(tool)
                      ? "text-primary border-primary"
                      : "border-white/40 text-white/40 hover:text-white hover:border-white"
                  }`}
                  asChild
                >
                  <button onClick={() => toggleTool(tool)}>{tool}</button>
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 mt-8">
          {projects.map((project, index) => {
            return (
              <ProjectCard
                key={index}
                project={project}
                aspect={project.aspect}
                delay={index * 0.1}
              />
            );
          })}
        </div>

        <ProjectDetails />
      </div>
    </section>
  );
}
