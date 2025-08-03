"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateSiteMeta } from "@/lib/site-meta/actions";
import SimpleEditor from "@/components/ui/simple-editor";

type Props = {
  keyName: string;
  value: string;
};

const sectionIds = ["section_1", "section_2", "section_3"];

export default function MetaFormSectionBlocks({ keyName, value }: Props) {
  const [formState, formAction, isPending] = useActionState(updateSiteMeta, {
    status: "",
    errors: {} as { value: string[] },
  });

  const initial: Record<string, { title: string; content: string }> = {};

  try {
    const parsed = JSON.parse(value);
    sectionIds.forEach((id) => {
      initial[id] = {
        title: parsed?.[id]?.title || "",
        content: parsed?.[id]?.content || "",
      };
    });
  } catch {
    sectionIds.forEach((id) => {
      initial[id] = { title: "", content: "" };
    });
  }

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="key" value={keyName} />

      {sectionIds.map((id, index) => (
        <div key={id} className="space-y-4 border p-4 rounded-md">
          <h3 className="font-medium text-sm text-muted-foreground">
            Section {index + 1}
          </h3>

          <div>
            <label className="text-sm font-medium">Title</label>
            <Input
              name={`${id}_title`}
              defaultValue={initial[id].title}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Content</label>
            <SimpleEditor
              name={`${id}_content`}
              defaultValue={initial[id].content}
            />
          </div>
        </div>
      ))}

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
