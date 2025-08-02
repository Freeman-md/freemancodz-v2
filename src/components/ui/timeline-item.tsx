import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Award, Briefcase, ExternalLink, GraduationCap } from "lucide-react";
import { motion, useInView, useAnimation } from "motion/react";
import { Badge } from "./badge";
// import { useProjectStore } from "@/store/useProjectStore";
// import { ScrollArea, ScrollBar } from "./scroll-area";
// import Image from "next/image";
import { useRef, useEffect } from "react";
import { TimeLineEntry } from "@/types/journey";

export default function TimelineItem(entry: TimeLineEntry) {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const renderDate = () => {
    if (entry.start_date && entry.end_date)
      return `${entry.start_date} – ${entry.end_date}`;
    return null;
  };

  // const { selectProjectById } = useProjectStore();

  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.li
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut",
          },
        },
      }}
      initial="hidden"
      animate={controls}
      className="relative ps-10 mb-8"
    >
      <div className="absolute left-0 inset-y-0 flex flex-col items-center w-6 space-y-2">
        <div className="w-6 h-6 rounded-full flex items-center justify-center z-10 bg-white text-background">
          {entry.type === "experience" && <Briefcase className="w-4 h-4" />}
          {entry.type === "education" && <GraduationCap className="w-4 h-4" />}
          {entry.type === "certification" && <Award className="w-4 h-4" />}
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
        {entry.type === "education" ? (
          <h3 className="text-xl font-semibold text-white">
            {entry.title}
            <span className="text-primary">
              {entry.grade && ` • ${entry.grade}`}
            </span>
          </h3>
        ) : (
          <h3 className="text-xl font-semibold text-white">{entry.title}</h3>
        )}

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

      {entry.type && ["experience", "certification"].includes(entry.type) && (
        <div className="text-primary/80 font-medium text-sm mt-1 flex flex-wrap flex-row items-center gap-2">
          <span>
            {entry.type === "experience" && entry.company}
            {(entry.type === "certification" || entry.type === "education") &&
              entry.issuer}
          </span>

          {entry.type === "experience" && entry.employment_type && (
            <span className="text-white/80">• {entry.employment_type}</span>
          )}

          {entry.type === "experience" && entry.location && (
            <span className="text-white/80">• {entry.location}</span>
          )}
        </div>
      )}

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
          {(entry.tools ?? []).map((tool) => (
            <Badge key={tool} variant="outline">
              {tool}
            </Badge>
          ))}
        </div>
      )}

      {entry.type === 'certification' && (entry.modules ?? []).length > 0 && (
        <div className="flex flex-wrap gap-2 text-xs mt-4">
          {(entry.modules ?? []).map((moduleItem) => (
            <Badge key={moduleItem} variant="outline">
              {moduleItem}
            </Badge>
          ))}
        </div>
      )}

      {/* Projects */}
      {/* {(entry.projects ?? []).length > 0 && (
        <ScrollArea className="mt-5 w-full whitespace-nowrap rounded-md">
          <div className="flex w-max space-x-4 p-2">
            {(entry.projects ?? []).map((project) => (
              <div
                key={project.id}
                onClick={() => selectProjectById(project.id!)}
                className="relative shrink-0 cursor-pointer rounded-md overflow-hidden border border-white/10 hover:border-primary transition"
              >
                {project.cover_image && (
                  <Image
                    src={project.cover_image}
                    alt={project.title!}
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-2 py-1">
                  {project.title}
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )} */}

      {entry.type === "experience" &&
        (entry.responsibilities ?? []).length > 0 && (
          <Accordion type="single" collapsible className="mt-5">
            <AccordionItem value="res">
              <AccordionTrigger className="text-white">
                Responsibilities
              </AccordionTrigger>
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
