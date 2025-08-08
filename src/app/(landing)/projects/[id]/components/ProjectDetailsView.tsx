"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, GithubIcon, PlayIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getStatusBadgeVariant } from "@/lib/badge-utils";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

export default function ProjectDetailsView({ project }: { project: Project }) {
  const [showVideo, setShowVideo] = useState(false);
  const {
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
    <section className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="mx-auto max-w-4xl"
      >
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
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
                className="object-cover"
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
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm text-white/60">{year}</span>
          {status && (
            <Badge
              variant={
                statusVariant.variant as React.ComponentProps<typeof Badge>["variant"]
              }
              className={cn("uppercase text-xs tracking-wide", statusVariant.className)}
            >
              {status}
            </Badge>
          )}
        </div>

        <h1 className="mt-3 text-3xl font-bold text-primary">{title}</h1>
        {role && <p className="text-xs text-white/50 italic mt-1">{role}</p>}

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.25 }}
          className="mt-4 text-white/80 leading-relaxed"
        >
          {description}
        </motion.p>

        {longdescription && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.25 }}
            className="mt-4 text-white/80 leading-relaxed"
          >
            {longdescription}
          </motion.p>
        )}

        {impact_note && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.25 }}
            className="mt-6"
          >
            <h3 className="text-lg font-semibold text-white mb-2">Impact</h3>
            <p className="text-white/80 leading-relaxed">{impact_note}</p>
          </motion.div>
        )}

        {tools?.length ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14, duration: 0.25 }}
            className="mt-6"
          >
            <h3 className="text-lg font-semibold text-white mb-2">Tools Used</h3>
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
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.25 }}
          className="flex flex-wrap items-center gap-6 pt-6 border-t border-gray-700 mt-8"
        >
          {link && (
            <Link href={link} target="_blank" className="text-lg flex items-center gap-2 text-primary hover:underline">
              <ExternalLink className="h-5 w-5" /> Live Project
            </Link>
          )}
          {github && (
            <Link href={github} target="_blank" className="text-lg flex items-center gap-2 text-white/70 hover:text-white">
              <GithubIcon className="h-5 w-5" /> GitHub
            </Link>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
