"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Briefcase } from "lucide-react";
import { Badge } from "./badge";
import { motion, useAnimation, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { Experience } from "@/types/journey";
import { ExternalLink } from "lucide-react";

export default function TimelineItemExperience(entry: Experience) {
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

  return (
    <motion.li
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
      }}
      initial="hidden"
      animate={controls}
      className="relative ps-10 mb-8"
    >
      <div className="absolute left-0 inset-y-0 flex flex-col items-center w-6 space-y-2">
        <div className="w-6 h-6 rounded-full flex items-center justify-center z-10 bg-white text-background">
          <Briefcase className="w-4 h-4" />
        </div>
        <motion.div
          variants={{
            hidden: { height: 0 },
            visible: { height: "100%", transition: { duration: 0.8, ease: "easeInOut" } },
          }}
          initial="hidden"
          animate={controls}
          className="w-px h-full bg-white"
        />
      </div>

      <div className="flex items-center gap-2">
        <h3 className="text-xl font-semibold text-white">{entry.title}</h3>
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
        <span>{entry.company}</span>
        {entry.employment_type && <span className="text-white/80">• {entry.employment_type}</span>}
        {entry.location && <span className="text-white/80">• {entry.location}</span>}
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
        <div className="flex flex-wrap gap-2 text-xs mt-4">
          {entry.tools.map((tool) => (
            <Badge key={tool} variant="outline">{tool}</Badge>
          ))}
        </div>
      )}

      {(entry.responsibilities ?? []).length > 0 && (
        <Accordion type="single" collapsible className="mt-5">
          <AccordionItem value="res">
            <AccordionTrigger className="text-white">Responsibilities</AccordionTrigger>
            <AccordionContent>
              <ul className="pl-4 space-y-2 text-white text-sm font-medium">
                {(entry.responsibilities ?? []).map((res, i) => (
                  <li key={i} className="relative ps-4">
                    <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-white animate-pulse" />
                    {res}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </motion.li>
  );
}
