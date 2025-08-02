"use client";

import { updateSiteMeta } from "@/lib/site-meta/actions";
import { useTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  keyName: string;
  type: string;
  value: string;
  setValue: (val: string) => void;
};

export default function MetaForm({ keyName, type, value, setValue }: Props) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.set("key", keyName);
    formData.set("value", value);

    startTransition(async () => {
      const result = await updateSiteMeta(formData);
      if (result.status === "success") {
        setMessage("Saved!");
      } else {
        setMessage("Failed to update.");
      }

      setTimeout(() => setMessage(null), 2000);
    });
  };

  return (
    <div className="space-y-2">
      <Textarea
        className="min-h-[160px] font-mono text-xs"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="flex items-center justify-between">
        <Button size="sm" disabled={isPending} onClick={handleSubmit}>
          Save
        </Button>
        {message && <p className="text-xs text-muted-foreground">{message}</p>}
      </div>
    </div>
  );
}
