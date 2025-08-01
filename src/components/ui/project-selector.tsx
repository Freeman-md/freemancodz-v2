"use client";

import EntitySelector from "@/components/ui/entity-selector";
import { EntitySelectorProps } from "@/components/ui/entity-selector";

type ToolSelectorProps = Omit<
  EntitySelectorProps,
  "entities" | "entityLabel" | "renderCreateForm"
> & {
  projects: string[];
};

export default function ToolSelector({ projects, ...rest }: ToolSelectorProps) {
  return (
    <EntitySelector
      {...rest}
      label="Projects"
      entities={projects}
      entityLabel="Project"
    />
  );
}
