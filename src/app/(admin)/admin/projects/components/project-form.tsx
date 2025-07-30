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
import { Switch } from "@/components/ui/switch";
import { ProjectFormValues } from "@/types/project";
import { getDefaultProjectFormValues } from "@/lib/projects/form-utils";

type Props = {
  action: any;
  defaultValues?: ProjectFormValues;
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
    values: getDefaultProjectFormValues(defaultValues),
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

  const [isFeatured, setIsFeatured] = useState(
    formState?.values?.featured ?? defaultValues.featured ?? false
  );
  const [isPrivate, setIsPrivate] = useState(
    formState?.values?.is_private ?? defaultValues.is_private ?? false
  );

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

      <div className="space-y-2">
        <label className="text-sm font-medium">Cover Image</label>
        <Input name="cover_image" type="file" accept="image/*" />
        <p className="text-xs text-muted-foreground">
          Upload PNG or JPG. Max 5MB.
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">GitHub Repo</label>
        <Input
          name="github"
          placeholder="https://github.com/..."
          defaultValue={formState?.values?.github ?? defaultValues.github}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Live Link</label>
        <Input
          name="link"
          placeholder="https://your-project-url.com"
          defaultValue={formState?.values?.link ?? defaultValues.link}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Impact Note</label>
        <Textarea
          name="impact_note"
          placeholder="What impact did this project make?"
          rows={2}
          className="resize-none"
          defaultValue={
            formState?.values?.impact_note ?? defaultValues.impact_note
          }
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-1 items-center justify-between rounded-md border p-3">
          <div className="space-y-0.5">
            <p className="text-sm font-medium">Featured</p>
            <p className="text-sm text-muted-foreground">
              Show on the main highlights section
            </p>
          </div>
          <Switch checked={isFeatured} onCheckedChange={setIsFeatured} />
          <input
            type="hidden"
            name="featured"
            value={isFeatured ? "true" : "false"}
          />
        </div>

        <div className="flex flex-1 items-center justify-between rounded-md border p-3">
          <div className="space-y-0.5">
            <p className="text-sm font-medium">Private</p>
            <p className="text-sm text-muted-foreground">
              Only visible to you (not public)
            </p>
          </div>
          <Switch checked={isPrivate} onCheckedChange={setIsPrivate} />
          <input
            type="hidden"
            name="isPrivate"
            value={isPrivate ? "true" : "false"}
          />
        </div>
      </div>

      <Button type="submit" className="mt-4" disabled={isPending}>
        {isPending ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
