"use client";

import { useState, useTransition } from "react";
import { uploadImage } from "@/lib/upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

type Props = {
  folder?: string;
  initialUrl?: string;
  onSuccess: (url: string) => void;
};

export default function ImageUploader({ folder = "uploads", initialUrl = "", onSuccess }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(initialUrl);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleUpload = () => {
    if (!file) return;

    startTransition(async () => {
      try {
        const url = await uploadImage(file, folder);
        setPreviewUrl(url);
        setMessage("Uploaded!");
        onSuccess(url);
      } catch (error) {
        console.log(error)
        setMessage("Upload failed.");
      }

      setTimeout(() => setMessage(null), 3000);
    });
  };

  return (
    <div className="space-y-3">
      {previewUrl && (
        <div className="relative w-full max-w-sm aspect-[16/9] overflow-hidden rounded-md border">
          <Image src={previewUrl} alt="Preview" fill className="object-cover" />
        </div>
      )}

      <Input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />

      <div className="flex items-center justify-between">
        <Button onClick={handleUpload} size="sm" disabled={isPending || !file}>
          Upload
        </Button>
        {message && <p className="text-xs text-muted-foreground">{message}</p>}
      </div>
    </div>
  );
}
