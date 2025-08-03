"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateSiteMeta } from "@/lib/site-meta/actions";

type Props = {
  keyName: string;
  value: string;
};

export default function MetaFormContact({ keyName, value }: Props) {
  const [formState, formAction, isPending] = useActionState(updateSiteMeta, {
    status: "",
    errors: {} as { value: string[] },
  });

  let initial = { email: "", phone: "", blog: "" };

  try {
    const parsed = JSON.parse(value);
    initial = {
      email: parsed?.email || "",
      phone: parsed?.phone || "",
      blog: parsed?.blog || "",
    };
  } catch {
    // fallback to empty
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="key" value={keyName} />

      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <Input name="email" type="email" defaultValue={initial.email} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Phone</label>
        <Input name="phone" type="text" defaultValue={initial.phone} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Blog Link</label>
        <Input name="blog" type="url" defaultValue={initial.blog} />
      </div>

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
