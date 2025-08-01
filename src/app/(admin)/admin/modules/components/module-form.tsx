"use client";

import { createModule } from "@/lib/modules/actions";
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

export default function ModuleForm({
  variant = "button",
  defaultValue,
  onCreate,
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {variant === "button" ? (
          <Button variant="outline"><PlusIcon /> Create Module</Button>
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
      <DialogContent aria-description="Create Module Form">
        <DialogTitle>Create Module</DialogTitle>
        <form
          ref={formRef}
          action={async (formData) => {
            await createModule(formData);
            formRef.current?.reset();
            onCreate?.();
          }}
          className="flex flex-col gap-4"
        >
          <Input 
          key={defaultValue}
          name="name" 
          placeholder="Module name" 
          required
          defaultValue={defaultValue}
           />
          <Button type="submit">Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
