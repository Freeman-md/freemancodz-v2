"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateSiteMeta } from "@/lib/site-meta/actions";
import StringArrayInput from "@/components/ui/string-array-input";

type Props = {
  keyName: string;
  value: string;
};

export default function MetaFormMeta({ keyName, value }: Props) {
  const [formState, formAction, isPending] = useActionState(updateSiteMeta, {
    status: "",
    errors: {} as { value: string[] },
  });

  let initial = { title: "", description: "", keywords: [] as string[] };

  try {
    const parsed = JSON.parse(value);
    initial = {
      title: parsed?.title || "",
      description: parsed?.description || "",
      keywords: Array.isArray(parsed?.keywords) ? parsed.keywords : [],
    };
  } catch {
    // use fallback initial
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="key" value={keyName} />

      <div className="space-y-2">
        <label className="text-sm font-medium">Title</label>
        <Input name="title" defaultValue={initial.title} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Input name="description" defaultValue={initial.description} />
      </div>

      <StringArrayInput
        name="keywords"
        label="Keywords"
        initial={initial.keywords}
        placeholderPrefix="Keyword"
        required={false}
        error={formState?.errors?.value?.[0]}
      />

      <div className="flex items-center justify-between">
        <Button type="submit" size="sm" disabled={isPending}>
          Save
        </Button>

        {formState?.status === "success" && (
          <p className="text-xs text-muted-foreground">Saved!</p>
        )}
        {formState?.status === "error" && !formState.errors?.value?.[0] && (
          <p className="text-xs text-red-500">Failed to update.</p>
        )}
      </div>
    </form>
  );
}
