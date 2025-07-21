"use client";
import { useProjectStore } from "@/store/useProjectStore";
import { Project } from "@/types/project";
import { motion } from "framer-motion";
import { ExternalLink, GithubIcon, InfoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { getStatusBadgeVariant } from "@/lib/badge-utils";
import { cn } from "@/lib/utils";

type Props = {
  project: Project;
  aspect?: string;
  delay?: number;
};

export default function ProjectCard({
  project,
  aspect = "aspect-[4/3]",
  delay = 0,
}: Props) {
  const { selectProjectById } = useProjectStore();

  const handleViewMoreClick = () => {
    selectProjectById(project.id);
  };

  const statusVariant = getStatusBadgeVariant(project.status ?? "Beta");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="break-inside-avoid rounded-xl overflow-hidden group relative"
    >
      <div className={`relative ${aspect} rounded-xl overflow-hidden`}>
        <motion.div
          layoutId={`project-image-${project.id}`}
          className="absolute inset-0 rounded-xl overflow-hidden group-hover:z-10"
          data-cursor="hover"
          data-cursor-label="More Info"
          onClick={handleViewMoreClick}
        >
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>

        <div className="absolute inset-0 bg-black/60 transition-opacity duration-300 group-hover:opacity-0 z-10 group-hover:z-0" />

        <button
          onClick={handleViewMoreClick}
          className="absolute top-2 right-2 z-10 cursor-pointer"
        >
          <div className="bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <InfoIcon className="text-sm" />
            <span>View more</span>
          </div>
        </button>
      </div>

      <div className="pt-3 space-y-2 px-1">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-white/60">{project.year}</span>
          {project.status && (
            <Badge
              variant={
                statusVariant.variant as React.ComponentProps<
                  typeof Badge
                >["variant"]
              }
              className={cn(
                "uppercase text-xs tracking-wide",
                statusVariant.className
              )}
            >
              {project.status}
            </Badge>
          )}
        </div>

        <h3 className="text-base font-semibold text-white group-hover:text-primary">
          {project.title}
        </h3>

        {project.role && (
          <p className="text-xs text-white/50 italic">{project.role}</p>
        )}

        <p className="text-sm text-white/70 leading-snug">
          {project.description}
        </p>

        <div className="flex items-center gap-4 pt-2">
          <Link
            href={project.link}
            target="_blank"
            className="text-sm flex items-center gap-1 text-primary hover:underline"
          >
            <ExternalLink /> Live
          </Link>

          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              className="text-sm flex items-center gap-1 text-white/70 hover:text-white"
            >
              <GithubIcon width={20} /> GitHub
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
