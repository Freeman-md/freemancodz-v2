import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Briefcase, ExternalLink } from "lucide-react";
import { Badge } from "./badge";
import { useProjectStore } from "@/store/useProjectStore";
import { ScrollArea, ScrollBar } from "./scroll-area";
import { Project } from "@/types/project";
import Image from "next/image";

export type TimelineItemProps = {
  title: string;
  company?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  date?: string;
  tools?: string[];
  link?: string;
  projects?: Pick<Project, "id" | "title" | "coverImage" | "link">[];
  responsibilities?: string[];
};

export default function TimelineItem({
  title,
  company,
  description,
  startDate,
  endDate,
  date,
  tools = [],
  link,
  projects = [],
  responsibilities = [],
}: TimelineItemProps) {
  const renderDate = () => {
    if (startDate && endDate) return `${startDate} – ${endDate}`;
    if (date) return date;
    return null;
  };

  const { selectProjectById } = useProjectStore();

  return (
    <li className="relative ps-10 mb-8">
      {/* Line + Icon */}
      <div className="absolute left-0 inset-y-0 flex flex-col items-center w-6 space-y-2">
        <div className="w-6 h-6 rounded-full flex items-center justify-center z-10 bg-white text-background">
          <Briefcase className="w-4 h-4" />
        </div>
        <div className="w-px h-full bg-white" />
      </div>

      <div className="flex items-center gap-2">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <ExternalLink className="w-4 h-4 hover:scale-110 transition-transform" />
          </a>
        )}
      </div>

      {/* Company */}
      {company && (
        <p className="text-primary/80 font-medium text-sm mt-1">{company}</p>
      )}

      {/* Date */}
      {renderDate() && (
        <p className="text-muted-foreground text-xs italic mt-0.5">
          {renderDate()}
        </p>
      )}

      {/* Description */}
      {description && (
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}

      {/* Tools / Tech Stack */}
      {tools?.length > 0 && (
        <div className="flex flex-wrap gap-2 text-xs mt-4 text-muted-foreground">
          {tools.map((tool) => (
            <Badge key={tool} variant="outline">
              {tool}
            </Badge>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <ScrollArea className="mt-5 w-full whitespace-nowrap rounded-md">
          <div className="flex w-max space-x-4 p-2">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => selectProjectById(project.id)}
                className="relative shrink-0 cursor-pointer rounded-md overflow-hidden border border-white/10 hover:border-primary transition"
              >
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  width={100}
                  height={100}
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-2 py-1">
                  {project.title}
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}

      {/* Responsibilities */}
      {responsibilities?.length > 0 && (
        <Accordion type="single" collapsible className="mt-5">
          <AccordionItem value="res">
            <AccordionTrigger className="text-white">
              Responsibilities
            </AccordionTrigger>
            <AccordionContent>
              <ul className="pl-4 space-y-2 text-white text-sm font-medium">
                {responsibilities.map((res, i) => (
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
    </li>
  );
}
