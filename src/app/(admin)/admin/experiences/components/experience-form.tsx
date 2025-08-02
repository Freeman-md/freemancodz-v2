"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import ToolSelector from "@/components/ui/tool-selector";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ExperienceFormErrors, ExperienceFormValues } from "@/types/journey";
import { getDefaultExperienceFormValues } from "@/lib/experiences/form-utils";
import CategorySelector from "@/components/ui/category-selector";
import StringArrayInput from "@/components/ui/string-array-input";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: any;
  defaultValues?: ExperienceFormValues;
  tools: string[];
  categories: string[];
  onSuccess?: () => void;
  onReload: () => void;
  submitLabel?: string;
};

export default function ExperienceForm({
  action,
  defaultValues = {},
  onSuccess,
  onReload,
  tools,
  categories,
  submitLabel = "Save Experience",
}: Props) {
  const [selectedTools, setSelectedTools] = useState<string[]>(
    defaultValues.tools || []
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    defaultValues.categories || []
  );
  const [responsibilities, setResponsibilities] = useState<string[]>(
    defaultValues.responsibilities?.length
      ? defaultValues.responsibilities
      : [""]
  );

  const [formState, formAction, isPending] = useActionState(action, {
    status: "",
    errors: {},
    values: getDefaultExperienceFormValues(defaultValues),
  });

  const errors = formState?.errors as ExperienceFormErrors;

  useEffect(() => {
    if (formState.status === "success") {
      if (!defaultValues?.title) {
        setSelectedTools([]);
        setSelectedCategories([]);
        setResponsibilities([""]);
      }
      onSuccess?.();
    }
  }, [formState.status, onSuccess, defaultValues.title]);

  useEffect(() => {
    if (formState.status === "error") {
      if (formState.values?.tools) setSelectedTools(formState.values.tools);
      if (formState.values?.categories)
        setSelectedCategories(formState.values.categories);
      if (formState.values?.responsibilities)
        setResponsibilities(formState.values.responsibilities);
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
          placeholder="Experience title"
          defaultValue={formState?.values?.title ?? defaultValues.title}
        />
        {errors?.title && (
          <small className="text-sm text-red-500">{errors.title[0]}</small>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Employer / Company</label>
        <Input
          name="company"
          placeholder="e.g. Google, Startup XYZ"
          defaultValue={formState?.values?.company ?? defaultValues.company}
        />
        {errors?.company && (
          <small className="text-sm text-red-500">{errors.company[0]}</small>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Location</label>
        <Input
          name="location"
          placeholder="Location"
          defaultValue={formState?.values?.location ?? defaultValues.location}
        />
        {errors?.location && (
          <small className="text-sm text-red-500">{errors.location[0]}</small>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Employment Type</label>
        <Select
          name="employment_type"
          defaultValue={defaultValues.employment_type}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Full-time">Full-time</SelectItem>
            <SelectItem value="Part-time">Part-time</SelectItem>
            <SelectItem value="Contract">Contract</SelectItem>
            <SelectItem value="Internship">Internship</SelectItem>
          </SelectContent>
        </Select>
        {errors?.employment_type && (
          <small className="text-sm text-red-500">
            {errors.employment_type[0]}
          </small>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea
          name="description"
          placeholder="Brief overview (max 200 chars)"
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
            type="string"
            placeholder="e.g. Aug 2022"
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
            type="string"
            placeholder="e.g. Mar 2024 or Present"
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

      <CategorySelector
        selected={selectedCategories}
        onChange={setSelectedCategories}
        error={errors?.categories?.[0]}
        categories={categories}
        onReload={onReload}
      />
      {selectedCategories.map((tool) => (
        <input key={tool} type="hidden" name="categories" value={tool} />
      ))}

      <StringArrayInput
        name="responsibilities"
        label="Responsibilities"
        initial={responsibilities}
        placeholderPrefix="Responsibility"
        error={errors?.responsibilities?.[0]}
      />

      <Button type="submit" className="mt-4" disabled={isPending}>
        {isPending ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
