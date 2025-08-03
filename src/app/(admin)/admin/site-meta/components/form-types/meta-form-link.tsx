"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateSiteMeta } from "@/lib/site-meta/actions";

type Props = {
  keyName: string;
  value: string;
};

export default function MetaFormLink({ keyName, value }: Props) {
  const [formState, formAction, isPending] = useActionState(updateSiteMeta, {
    status: "",
    errors: {} as { value: string[] },
  });

  let initial = "";

  try {
    initial = JSON.parse(value);
  } catch {}

  return (
    <form action={formAction} className="space-y-2">
      <input type="hidden" name="key" value={keyName} />
      <Input type="url" name="value" defaultValue={initial} />
      <div className="flex items-center justify-between">
        <Button type="submit" size="sm" disabled={isPending}>
          Save
        </Button>
        {formState?.status === "success" && (
          <p className="text-xs text-muted-foreground">Saved!</p>
        )}
        {formState?.status === "error" && (
          <p className="text-xs text-red-500">{formState.errors?.value?.[0]}</p>
        )}
      </div>
    </form>
  );
}
