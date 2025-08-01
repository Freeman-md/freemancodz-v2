"use client";

import EntitySelector from "@/components/ui/entity-selector";
import { EntitySelectorProps } from "@/components/ui/entity-selector";
import ModuleForm from "@/app/(admin)/admin/modules/components/module-form";

type ModuleSelectorProps = Omit<
  EntitySelectorProps,
  "entities" | "entityLabel" | "renderCreateForm"
> & {
  modules: string[];
};

export default function ModuleSelector({ modules, ...rest }: ModuleSelectorProps) {
  return (
    <EntitySelector
      {...rest}
      label="Modules"
      entities={modules}
      entityLabel="Module"
      renderCreateForm={(searchTerm) => (
        <ModuleForm
          defaultValue={searchTerm}
          onCreate={rest.onReload}
          variant="link"
        />
      )}
    />
  );
}
