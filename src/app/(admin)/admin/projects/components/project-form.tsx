"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { useActionState } from "react";
import CategorySelector from "@/components/ui/category-selector";
import ToolSelector from "@/components/ui/tool-selector";

type Props = {
  action: any;
  defaultValues?: {
    title?: string;
    description?: string;
    longdescription?: string;
    categories?: string[];
    tools?: string[];
    status?: string;
    role?: string;
    year?: number;
  };
  categories: string[];
  tools: string[];
  onSuccess?: () => void;
  onReload: () => void;
  submitLabel?: string;
};

export default function ProjectForm({
  action,
  defaultValues = {},
  onSuccess,
  onReload,
  categories,
  tools,
  submitLabel = "Save Project",
}: Props) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    defaultValues.categories || []
  );

  const [selectedTools, setSelectedTools] = useState<string[]>(
    defaultValues.tools || []
  );

  const [formState, formAction, isPending] = useActionState(action, {
    status: "",
    errors: {},
    values: {
      title: defaultValues.title || "",
      description: defaultValues.description || "",
      longdescription: defaultValues.longdescription || "",
      status: defaultValues.status || "",
      role: defaultValues.role || "",
      year: defaultValues.year || new Date().getFullYear(),
      categories: defaultValues.categories || [],
      tools: defaultValues.tools || [],
    },
  });

  const errors = formState?.errors as {
    title?: string[];
    description?: string[];
    longdescription?: string[];
    status?: string[];
    role?: string[];
    year?: string[];
    categories?: string[];
    tools?: string[];
  };

  useEffect(() => {
    if (formState.status === "success") {
      if (!defaultValues?.title) {
        setSelectedCategories([]);
        setSelectedTools([]);
      }
      onSuccess?.();
    }
  }, [formState.status, onSuccess, defaultValues.title]);

  useEffect(() => {
    if (formState?.status === "error") {
      if (formState.values?.categories)
        setSelectedCategories(formState.values.categories as string[]);
      if (formState.values?.tools)
        setSelectedTools(formState.values.tools as string[]);
    }
  }, [formState]);

  return (
    <form className="space-y-4" action={formAction}>
      <div className="space-y-2">
        <label className="text-sm font-medium">Title</label>
        <Input
          name="title"
          placeholder="Project title"
          defaultValue={formState?.values?.title ?? defaultValues.title}
        />
        {errors?.title && (
          <small className="text-sm text-red-500">{errors.title[0]}</small>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Short Description</label>
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

      <div className="space-y-2">
        <label className="text-sm font-medium">Long Description</label>
        <Textarea
          name="longdescription"
          placeholder="More detailed project description"
          rows={6}
          className="resize-none"
          defaultValue={
            formState?.values?.longdescription ?? defaultValues.longdescription
          }
        />
        {errors?.longdescription && (
          <small className="text-sm text-red-500">
            {errors.longdescription[0]}
          </small>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select name="status" defaultValue={defaultValues.status}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beta">Beta</SelectItem>
              <SelectItem value="Live">Live</SelectItem>
              <SelectItem value="Archived">Archived</SelectItem>
              <SelectItem value="In Development">In Development</SelectItem>
            </SelectContent>
          </Select>
          {errors?.status && (
            <small className="text-sm text-red-500">{errors.status[0]}</small>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Role</label>
          <Select name="role" defaultValue={defaultValues.role}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Solo Build">Solo Build</SelectItem>
              <SelectItem value="Team Lead">Team Lead</SelectItem>
              <SelectItem value="Collaborator">Collaborator</SelectItem>
            </SelectContent>
          </Select>
          {errors?.role && (
            <small className="text-sm text-red-500">{errors.role[0]}</small>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Year</label>
          <Input
            name="year"
            type="number"
            min="2000"
            max={new Date().getFullYear()}
            defaultValue={formState?.values?.year ?? defaultValues.year}
          />
          {errors?.year && (
            <small className="text-sm text-red-500">{errors.year[0]}</small>
          )}
        </div>
      </div>

      <CategorySelector
        selected={selectedCategories}
        onChange={setSelectedCategories}
        error={errors?.categories?.[0]}
        categories={categories}
        onReload={onReload}
      />

      {selectedCategories.map((category) => (
        <input
          key={category}
          type="hidden"
          name="categories"
          value={category}
        />
      ))}

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

      <Button type="submit" className="mt-4" disabled={isPending}>
        {isPending ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
