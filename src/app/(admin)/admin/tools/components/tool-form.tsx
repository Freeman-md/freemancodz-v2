"use client";

import { createTool } from "@/lib/tools/actions";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  variant?: "button" | "link";
  defaultValue?: string;
  onCreate?: () => void;
};

export default function ToolForm({
  variant = "button",
  defaultValue,
  onCreate,
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {variant === "button" ? (
          <Button variant="outline"><PlusIcon /> Create Category</Button>
        ) : (
          <span
            className={cn(
              "text-sm underline underline-offset-4 cursor-pointer text-muted-foreground hover:text-foreground"
            )}
          >
            Create it
          </span>
        )}
      </DialogTrigger>
      <DialogContent aria-description="Create Tool Form">
        <DialogTitle>Create Tool</DialogTitle>
        <form
          ref={formRef}
          action={async (formData) => {
            await createTool(formData);
            formRef.current?.reset();
            onCreate?.();
          }}
          className="flex flex-col gap-4"
        >
          <Input 
          key={defaultValue}
          name="name" 
          placeholder="Tool name" 
          required
          defaultValue={defaultValue}
           />
          <Button type="submit">Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
