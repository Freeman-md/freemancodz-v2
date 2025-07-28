"use client"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { createCategory } from "@/lib/categories/actions";
import { cn } from "@/lib/utils"; // shadcn utility for conditional classes

type Props = {
  variant?: "button" | "link";
    defaultValue?: string;
};

export default function CategoryForm({ variant = "button", defaultValue }: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {variant === "button" ? (
          <Button variant="outline">+ Create Category</Button>
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
      <DialogContent aria-description="Create Category Form">
        <DialogTitle>Create Category</DialogTitle>
        <form
          ref={formRef}
          action={async (formData) => {
            await createCategory(formData);
            formRef.current?.reset();
          }}
          className="flex flex-col gap-4"
        >
          <Input name="name" placeholder="Category name" required defaultValue={defaultValue} />
          <Button type="submit">Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
