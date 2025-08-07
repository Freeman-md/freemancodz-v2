"use client";

import { Award, ExternalLink, GraduationCap } from "lucide-react";
import { Badge } from "./badge";
import { motion, useAnimation, useInView } from "motion/react";
import { Certification } from "@/types/journey";
import { useEffect, useRef } from "react";

export default function TimelineItemCertification(entry: Certification) {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const renderDate = () => {
    if (entry.start_date && entry.end_date)
      return `${entry.start_date} – ${entry.end_date}`;
    return null;
  };

  const icon =
    entry.type === "education" ? (
      <GraduationCap className="w-4 h-4" />
    ) : (
      <Award className="w-4 h-4" />
    );

  return (
    <motion.li
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      }}
      initial="hidden"
      animate={controls}
      className="relative ps-10 mb-8"
    >
      <div className="absolute left-0 inset-y-0 flex flex-col items-center w-6 space-y-2">
        <div className="w-6 h-6 rounded-full flex items-center justify-center z-10 bg-white text-background">
          {icon}
        </div>
        <motion.div
          variants={{
            hidden: { height: 0 },
            visible: {
              height: "100%",
              transition: { duration: 0.8, ease: "easeInOut" },
            },
          }}
          initial="hidden"
          animate={controls}
          className="w-px h-full bg-white"
        />
      </div>

      <div className="flex items-center gap-2">
        <h3 className="text-xl font-semibold text-white">
          {entry.title}
          {entry.grade && (
            <span className="text-primary"> • {entry.grade}</span>
          )}
        </h3>
        {entry.link && (
          <a
            href={entry.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-primary transition-colors"
          >
            <ExternalLink className="w-4 h-4 hover:scale-110 transition-transform" />
          </a>
        )}
      </div>

      <div className="text-primary/80 font-medium text-sm mt-1 flex flex-wrap gap-2">
        <span>{entry.issuer}</span>
      </div>

      {renderDate() && (
        <p className="text-white/80 text-xs italic mt-0.5">{renderDate()}</p>
      )}

      {entry.description && (
        <p className="mt-3 text-sm text-white/80 leading-relaxed">
          {entry.description}
        </p>
      )}

      {(entry.tools ?? []).length > 0 && (
  <div className="mt-4 space-y-1">
    <p className="text-xs text-white font-medium">Tools</p>
    <div
      className="text-xs flex flex-wrap gap-2 overflow-x-auto max-h-[5.5rem] pr-1 pb-1 scroll-smooth"
      style={{
        display: "flex",
        flexWrap: "wrap",
        overflowX: "auto",
        maxHeight: "5.5rem",
      }}
    >
      {entry.tools.map((tool) => (
        <Badge
          key={tool}
          variant="outline"
          className="whitespace-nowrap shrink-0"
        >
          {tool}
        </Badge>
      ))}
    </div>
  </div>
)}

{(entry.modules ?? []).length > 0 && (
  <div className="mt-4 space-y-1">
    <p className="text-xs text-white font-medium">Modules</p>
    <div
      className="text-xs flex flex-wrap gap-2 overflow-x-auto max-h-[5.5rem] pr-1 pb-1 scroll-smooth"
      style={{
        display: "flex",
        flexWrap: "wrap",
        overflowX: "auto",
        maxHeight: "5.5rem",
      }}
    >
      {entry.modules.map((module) => (
        <Badge
          key={module}
          variant="outline"
          className="whitespace-nowrap shrink-0"
        >
          {module}
        </Badge>
      ))}
    </div>
  </div>
)}

    </motion.li>
  );
}
