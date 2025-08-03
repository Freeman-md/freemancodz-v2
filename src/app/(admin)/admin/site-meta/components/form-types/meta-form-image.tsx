"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateSiteMeta } from "@/lib/site-meta/actions";
import { uploadImage } from "@/lib/upload";
import Image from "next/image";

type Props = {
  keyName: string;
  value: string;
};

export default function MetaFormImage({ keyName, value }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(() => {
    try {
      return JSON.parse(value);
    } catch {
      return "";
    }
  });

  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    startTransition(async () => {
      try {
        const url = await uploadImage(file, keyName);

        const formData = new FormData();
        formData.set("key", keyName);
        formData.set("value", JSON.stringify(url));

        const result = await updateSiteMeta({}, formData);

        if (result.status === "success") {
          setPreviewUrl(url);
          setMessage("Saved!");
        } else {
          setMessage(result.errors?.value?.[0] || "Failed to update.");
        }
      } catch {
        setMessage("Something went wrong.");
      }

      setTimeout(() => setMessage(null), 3000);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {previewUrl && (
        <div className="relative w-full max-w-sm aspect-[16/9] overflow-hidden rounded-md border">
          <Image
            src={previewUrl}
            alt="Uploaded image preview"
            fill
            className="object-cover"
          />
        </div>
      )}

      <Input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />

      <div className="flex items-center justify-between">
        <Button type="submit" size="sm" disabled={isPending || !file}>
          Upload & Save
        </Button>
        {message && (
          <p className="text-xs text-muted-foreground">{message}</p>
        )}
      </div>
    </form>
  );
}
