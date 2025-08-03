"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ImageUploader from "@/components/ui/image-uploader";
import { useState, startTransition } from "react";
import { updateProjectImage } from "@/lib/projects/actions"; // ✅

type Props = {
  open: boolean;
  onClose: () => void;
  projectId: string;
  currentUrl?: string;
};

export default function ImageUploadModal({ open, onClose, projectId, currentUrl }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSaving, setIsSaving] = useState(false);

  const handleSuccess = (url: string) => {
    setIsSaving(true);

    startTransition(async () => {
      try {
        await updateProjectImage(projectId, url);
      } catch (err) {
        console.error("Image update failed:", err);
      } finally {
        setIsSaving(false);
        onClose();
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Project Image</DialogTitle>
        </DialogHeader>

        <ImageUploader
          folder={`projects/${projectId}`}
          initialUrl={currentUrl}
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}
