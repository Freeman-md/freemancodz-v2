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

export default function MetaFormHeadline({ keyName, value }: Props) {
  const [formState, formAction, isPending] = useActionState(updateSiteMeta, {
    status: "",
    errors: {} as { value: string[] },
  });

  let initial = { prefix: "", suffix: "", rotating_words: [] as string[] };

  try {
    const parsed = JSON.parse(value);
    initial = {
      prefix: parsed?.prefix || "",
      suffix: parsed?.suffix || "",
      rotating_words: Array.isArray(parsed?.rotating_words)
        ? parsed.rotating_words
        : [],
    };
  } catch {
    // fallback
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="key" value={keyName} />

      <div className="space-y-2">
        <label className="text-sm font-medium">Prefix</label>
        <Input name="prefix" defaultValue={initial.prefix} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Suffix</label>
        <Input name="suffix" defaultValue={initial.suffix} />
      </div>

      <StringArrayInput
        name="rotating_words"
        label="Rotating Words"
        initial={initial.rotating_words}
        placeholderPrefix="Word"
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
