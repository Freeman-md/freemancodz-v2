"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import ToolSelector from "@/components/ui/tool-selector";
import ModuleSelector from "@/components/ui/module-selector";
import ProjectSelector from "@/components/ui/project-selector";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  CertificationFormErrors,
  CertificationFormValues,
} from "@/types/journey";
import { getDefaultCertificationFormValues } from "@/lib/certifications/form-utils";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: any;
  defaultValues?: CertificationFormValues;
  tools: string[];
  modules: string[];
  projects: string[]
  onSuccess?: () => void;
  onReload: () => void;
  submitLabel?: string;
};

export default function CertificationForm({
  action,
  defaultValues = {},
  onSuccess,
  onReload,
  tools,
  modules,
  projects,
  submitLabel = "Save Certification",
}: Props) {
  const [selectedTools, setSelectedTools] = useState<string[]>(
    defaultValues.tools || []
  );
  const [selectedModules, setSelectedModules] = useState<string[]>(
    defaultValues.modules || []
  );
  const [selectedProjects, setSelectedProjects] = useState<string[]>(
    defaultValues.projects || []
  );

  const [formState, formAction, isPending] = useActionState(action, {
    status: "",
    errors: {},
    values: getDefaultCertificationFormValues(defaultValues),
  });

  const errors = formState?.errors as CertificationFormErrors;

  useEffect(() => {
    if (formState.status === "success") {
      if (!defaultValues?.title) {
        setSelectedTools([]);
        setSelectedModules([]);
        setSelectedProjects([]);
      }
      onSuccess?.();
    }
  }, [formState.status, onSuccess, defaultValues.title]);

  useEffect(() => {
    if (formState.status === "error") {
      if (formState.values?.tools) setSelectedTools(formState.values.tools);
      if (formState.values?.modules)
        setSelectedModules(formState.values.modules);
      if (formState.values?.projects)
        setSelectedProjects(formState.values.projects);
    }
  }, [formState]);

  return (
    <form className="space-y-4" action={formAction}>
      {defaultValues.id && (
        <input type="hidden" name="id" value={defaultValues.id} />
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium">Title</label>
        <Input
          name="title"
          placeholder="Certification title"
          defaultValue={formState?.values?.title ?? defaultValues.title}
        />
        {errors?.title && (
          <small className="text-sm text-red-500">{errors.title[0]}</small>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Issuer</label>
        <Input
          name="issuer"
          placeholder="e.g. Microsoft, Google"
          defaultValue={formState?.values?.issuer ?? defaultValues.issuer}
        />
        {errors?.issuer && (
          <small className="text-sm text-red-500">{errors.issuer[0]}</small>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Type</label>
        <Select name="type" defaultValue={defaultValues.type}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="certification">Certification</SelectItem>
            <SelectItem value="education">Education</SelectItem>
          </SelectContent>
        </Select>
        {errors?.type && (
          <small className="text-sm text-red-500">{errors.type[0]}</small>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea
          name="description"
          placeholder="Brief description (max 200 chars)"
          maxLength={200}
          rows={3}
          className="resize-none"
          defaultValue={
            formState?.values?.description ?? defaultValues.description
          }
        />
        {errors?.description && (
          <small className="text-sm text-red-500">
            {errors.description[0]}
          </small>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Start Date</label>
          <Input
            name="start_date"
            type="date"
            defaultValue={
              formState?.values?.start_date ?? defaultValues.start_date
            }
          />
          {errors?.start_date && (
            <small className="text-sm text-red-500">
              {errors.start_date[0]}
            </small>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">End Date</label>
          <Input
            name="end_date"
            type="date"
            defaultValue={formState?.values?.end_date ?? defaultValues.end_date}
          />
          {errors?.end_date && (
            <small className="text-sm text-red-500">{errors.end_date[0]}</small>
          )}
        </div>
      </div>

      <ToolSelector
        selected={selectedTools}
        onChange={setSelectedTools}
        error={errors?.tools?.[0]}
        tools={tools}
        onReload={onReload}
      />
      {selectedTools.map((tool) => (
        <input key={tool} type="hidden" name="tools" value={tool} />
      ))}

      <ModuleSelector
        selected={selectedModules}
        onChange={setSelectedModules}
        error={errors?.modules?.[0]}
        modules={modules}
        onReload={onReload}
      />
      {selectedModules.map((module) => (
        <input key={module} type="hidden" name="modules" value={module} />
      ))}

      <ProjectSelector
        selected={selectedProjects}
        onChange={setSelectedProjects}
        error={errors?.projects?.[0]}
        projects={projects}
        onReload={onReload}
      />
      {selectedProjects.map((project) => (
        <input key={project} type="hidden" name="projects" value={project} />
      ))}

      <div className="space-y-2">
        <label className="text-sm font-medium">Link</label>
        <Input
          name="link"
          placeholder="https://..."
          defaultValue={formState?.values?.link ?? defaultValues.link}
        />
        {errors?.link && (
          <small className="text-sm text-red-500">{errors.link[0]}</small>
        )}
      </div>

      <Button type="submit" className="mt-4" disabled={isPending}>
        {isPending ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
