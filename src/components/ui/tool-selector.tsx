"use client";

import EntitySelector from "@/components/ui/entity-selector";
import { EntitySelectorProps } from "@/components/ui/entity-selector";
import ToolForm from "@/app/(admin)/admin/tools/components/tool-form";

type ToolSelectorProps = Omit<
  EntitySelectorProps,
  "entities" | "entityLabel" | "renderCreateForm"
> & {
  tools: string[];
};

export default function ToolSelector({ tools, ...rest }: ToolSelectorProps) {
  return (
    <EntitySelector
      {...rest}
      label="Tools"
      entities={tools}
      entityLabel="Category"
      renderCreateForm={(searchTerm) => (
        <ToolForm
          defaultValue={searchTerm}
          onCreate={rest.onReload}
          variant="link"
        />
      )}
    />
  );
}
