"use client";

import { useProjectStore } from "@/store/useProjectStore";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, GithubIcon, XIcon, PlayIcon } from "lucide-react"; // PlayIcon for video
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "../ui/badge";
import { getStatusBadgeVariant } from "@/lib/badge-utils";
import { cn } from "@/lib/utils";

export default function ProjectDetails() {
  const { selectedProject, clearSelectedProject } = useProjectStore();
  const [showVideo, setShowVideo] = useState(false);

  const handleClose = () => {
    clearSelectedProject();
    setShowVideo(false);
  };

  if (!selectedProject) return null;

  const {
    id,
    title,
    description,
    longdescription,
    tools,
    link,
    github,
    coverImage,
    video_url,
  } = selectedProject;

  const statusVariant = getStatusBadgeVariant(selectedProject.status ?? "Beta");

  return (
    <AnimatePresence>
      <motion.div
        key="project-details-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-auto"
        onClick={handleClose}
      >
        <motion.div
          className="relative bg-secondary rounded-xl shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <XIcon className="h-5 w-5" />
          </button>

          <motion.div
            layoutId={`project-image-${id}`}
            className="relative w-full aspect-video rounded-t-xl overflow-hidden bg-black"
          >
            {video_url && showVideo ? (
              <iframe
                src={video_url}
                title={title}
                className="w-full h-full"
                allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <Image
                  src={coverImage}
                  alt={title}
                  fill
                  className="object-cover rounded-t-xl"
                  sizes="100vw"
                  priority
                />
                {video_url && (
                  <button
                    onClick={() => setShowVideo(true)}
                    className="absolute inset-0 flex items-center justify-center z-10 bg-black/40 hover:bg-black/50 transition-colors"
                  >
                    <div className="bg-white text-black rounded-full p-4 shadow-md">
                      <PlayIcon className="h-6 w-6" />
                    </div>
                  </button>
                )}
              </>
            )}
          </motion.div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-white/60">
                {selectedProject.year}
              </span>
              <Badge
                variant="muted"
                className="uppercase text-xs tracking-wide"
              >
                {selectedProject.category}
              </Badge>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="text-3xl font-bold mb-4 text-primary"
            >
              {title}
            </motion.h2>

            <div className="flex items-center justify-between space-x-2">
              {selectedProject.status && (
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
                  {selectedProject.status}
                </Badge>
              )}

              {selectedProject.role && (
                <p className="text-xs text-white/50 italic">{selectedProject.role}</p>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="text-white/80 leading-relaxed mb-6"
            >
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>{description}</AccordionTrigger>
                  <AccordionContent>{longdescription}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>

            {selectedProject.impactNote && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.48, duration: 0.3 }}
                className="mb-6"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  Impact
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {selectedProject.impactNote}
                </p>
              </motion.div>
            )}

            {tools && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="mb-6"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  Tools Used:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {selectedProject.tags?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.3 }}
                className="mb-6"
              >
                <h3 className="text-lg font-semibold text-white mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-white/10 text-white px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="flex items-center gap-6 pt-4 border-t border-gray-700 mt-6"
            >
              <Link
                href={link}
                target="_blank"
                className="text-lg flex items-center gap-2 text-primary hover:underline"
              >
                <ExternalLink className="h-5 w-5" /> Live Project
              </Link>

              {github && (
                <Link
                  href={github}
                  target="_blank"
                  className="text-lg flex items-center gap-2 text-white/70 hover:text-white"
                >
                  <GithubIcon className="h-5 w-5" /> GitHub
                </Link>
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
