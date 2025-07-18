"use client";
import { Badge } from "@/components/ui/badge";
import { useProjectsData } from "@/hooks/useProjectsData";

import { motion, useInView } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";


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

        <div className="-space-y-1">
          <div className="flex items-center justify-center md:flex-wrap overflow-x-scroll w-full mx-auto">
            {categories.map((category, index) => (
              <Badge
                variant="outline"
                className="rounded-full p-2 m-2 border-white/40 text-white/40 transition duration-500 hover:text-white hover:border-white"
                asChild
                key={index}
              >
                <button className="cursor-pointer">{category}</button>
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-center md:flex-wrap overflow-x-scroll w-full mx-auto">
            {tools.map((tool, index) => (
              <Badge
                variant="outline"
                className="rounded-full p-2 m-2 border-white/40 text-white/40 transition duration-500 hover:text-white hover:border-white"
                asChild
                key={index}
              >
                <button className="cursor-pointer">{tool}</button>
              </Badge>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
<div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 mt-8">
  {projects.map((project, index) => {
    // Cycle aspect ratio based on index
    let aspectClass = "aspect-[4/3]";
    if (index % 3 === 1) aspectClass = "aspect-square";
    if (index % 3 === 2) aspectClass = "aspect-[5/6]"; // optional tighter vertical

    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="break-inside-avoid rounded-xl overflow-hidden border border-white/10 hover:shadow-lg hover:border-white/20 transition-all duration-300 group"
      >
        <Link href={project.link} target="_blank">
          <div className={`relative ${aspectClass} bg-black`}>
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="p-4 space-y-1">
            <h3 className="text-lg font-semibold text-white group-hover:text-primary">
              {project.title}
            </h3>
            <p className="text-sm text-white/70 leading-snug">{project.description}</p>
          </div>
        </Link>
      </motion.div>
    );
  })}
</div>

      </div>
    </section>
  );
}
