"use client";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Project } from "@/types/project";
import Empty from "@/components/shared/empty";
import ProjectCard from "./ProjectCard";
import ProjectDetailsModal from "./ProjectDetailsModal";

export default function ProjectsList({ projects }: { projects: Project[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref);

  const selectedProject = projects.find((project) => project.id === selectedId);

  return (
    <section id="projects">
      <div ref={ref} className="container py-20 pb-20 space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="uppercase text-base font-medium text-center"
        >
          I Build Stuff that Works
        </motion.h2>

        {projects.length ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-12 mt-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                aspect={project.aspect}
                delay={index * 0.1}
                onSelect={() => setSelectedId(project.id)}
              />
            ))}
          </div>
        ) : (
          <Empty title="No featured projects at the moment." />
        )}

        {selectedProject && (
          <ProjectDetailsModal
            project={selectedProject}
            open={!!selectedProject}
            onOpenChange={(open) => !open && setSelectedId(null)}
            onOpenFullPage={() =>
              selectedProject &&
              window.open(`/projects/${selectedProject.id}`, "_self")
            }
          />
        )}
      </div>
    </section>
  );
}
