"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, GithubIcon, XIcon, PlayIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { getStatusBadgeVariant } from "@/lib/badge-utils";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

type Props = {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenFullPage?: () => void;
};

export default function ProjectDetailsModal({
  project,
  open,
  onOpenChange,
  onOpenFullPage,
}: Props) {
  const [showVideo, setShowVideo] = useState(false);

  const handleClose = useCallback(() => {
    setShowVideo(false);
    onOpenChange(false);
  }, [onOpenChange]);

  useEffect(() => {
    // reset video when project changes or modal closes
    setShowVideo(false);
  }, [project, open]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, handleClose]);

  if (!open || !project) return null;

  const {
    id,
    title,
    description,
    longdescription,
    tools,
    link,
    github,
    cover_image,
    video_url,
    year,
    status,
    role,
    impact_note,
  } = project;

  const statusVariant = getStatusBadgeVariant(status ?? "Beta");

  return (
    <AnimatePresence>
      <motion.div
        key="project-details-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} details`}
          className="relative bg-secondary rounded-xl shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
        >
          {/* Close */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="Close"
          >
            <XIcon className="h-5 w-5" />
          </button>

          {/* Media */}
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
                  src={cover_image}
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
                    aria-label="Play video"
                  >
                    <div className="bg-white text-black rounded-full p-4 shadow-md">
                      <PlayIcon className="h-6 w-6" />
                    </div>
                  </button>
                )}
              </>
            )}
          </motion.div>

          {/* Body */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-white/60">{year}</span>
              {status && (
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
                  {status}
                </Badge>
              )}
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="text-3xl font-bold mb-4 text-primary"
            >
              {title}
            </motion.h2>

            {role && <p className="text-xs text-white/50 italic">{role}</p>}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.25 }}
              className="text-white/80 leading-relaxed mb-6"
            >
              <Accordion type="single" collapsible>
                <AccordionItem value="summary">
                  <AccordionTrigger>{description}</AccordionTrigger>
                  <AccordionContent>{longdescription}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>

            {impact_note && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.25 }}
                className="mb-6"
              >
                <h3 className="text-lg font-semibold text-white mb-2">Impact</h3>
                <p className="text-white/80 leading-relaxed">{impact_note}</p>
              </motion.div>
            )}

            {tools?.length ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.25 }}
                className="mb-6"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  Tools Used:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tech, i) => (
                    <span
                      key={`${tech}-${i}`}
                      className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ) : null}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.25 }}
              className="flex flex-wrap items-center gap-6 pt-4 border-t border-gray-700 mt-6"
            >
              {link && (
                <Link
                  href={link}
                  target="_blank"
                  className="text-lg flex items-center gap-2 text-primary hover:underline"
                >
                  <ExternalLink className="h-5 w-5" /> Live Project
                </Link>
              )}

              {github && (
                <Link
                  href={github}
                  target="_blank"
                  className="text-lg flex items-center gap-2 text-white/70 hover:text-white"
                >
                  <GithubIcon className="h-5 w-5" /> GitHub
                </Link>
              )}

              {onOpenFullPage && (
                <button
                  onClick={onOpenFullPage}
                  className="text-lg text-white/70 hover:text-white underline underline-offset-4"
                >
                  Open full page
                </button>
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}