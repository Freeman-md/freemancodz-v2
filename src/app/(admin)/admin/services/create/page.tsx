"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import { useActionState, useState } from "react";
import { getCategories } from "@/lib/categories/data";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import CategoryForm from "../../categories/components/CategoryForm"; // reuse
import { CheckIcon, XCircleIcon } from "lucide-react";
import { IconCrop11 } from "@tabler/icons-react";
import { createService } from "@/lib/services/actions";
import { toast } from "sonner";

export default function CreateServicePage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [formState, formAction, isPending] = useActionState(createService, {
    status: "",
    errors: {},
    values: {
      name: "",
      description: "",
      categories: [],
    },
  });

  const errors = formState?.errors as {
    name?: string[];
    description?: string[];
    categories?: string[];
  };

  const selectCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prev) => prev.filter((c) => c !== category));
    } else {
      setSelectedCategories((prev) => [...prev, category]);
    }
  };

  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data.map((cat) => cat.name));
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (formState.status === "success") {
      setSelectedCategories([]);

      toast.success("Service created", {
        action: {
          label: "View All Services",
          onClick: () => {
            window.location.href = "/admin/services";
          },
        },
      });
    }
  }, [formState.status]);

  useEffect(() => {
    if (formState?.status === "error" && formState.values?.categories) {
      setSelectedCategories(formState.values.categories as string[]);
    }
  }, [formState]);

  return (
    <div className="md:max-w-2xl space-y-6">
      <h1 className="text-xl font-semibold">Create Service</h1>

      {formState?.status === "error" && !errors && (
        <p className="text-sm text-red-500">Something went wrong.</p>
      )}

      <form className="space-y-4" action={formAction}>
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input
            name="name"
            placeholder="Service title"
            defaultValue={formState?.values?.name}
          />
          {errors?.name && (
            <small className="text-sm text-red-500">{errors.name[0]}</small>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea
            name="description"
            placeholder="Brief description (max 200 chars)"
            maxLength={200}
            rows={3}
            className="resize-none"
            defaultValue={formState?.values?.description}
          />
          {errors?.description && (
            <small className="text-sm text-red-500">
              {errors.description[0]}
            </small>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Selected Categories</label>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {category}
                <button
                  type="button"
                  className="ml-1 text-xs cursor-pointer"
                  onClick={() =>
                    setSelectedCategories((prev) =>
                      prev.filter(
                        (existingCategory) => existingCategory !== category
                      )
                    )
                  }
                >
                  <XCircleIcon width={20} />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Categories</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                {selectedCategories.length > 0
                  ? "Edit selected categories"
                  : "Select categories"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
              <Command>
                <CommandInput
                  placeholder="Search categories..."
                  onValueChange={(value) => setSearchTerm(value)}
                />

                <CommandEmpty className="flex py-4 items-center justify-center gap-2">
                  <small>Can’t find category?</small>
                  <CategoryForm
                    variant="link"
                    defaultValue={searchTerm}
                    onCreate={loadCategories}
                  />
                </CommandEmpty>
                <CommandList>
                  {categories.map((category) => (
                    <CommandItem
                      key={category}
                      value={category}
                      onSelect={() => {
                        selectCategory(category);
                      }}
                    >
                      <span className="mr-2">
                        {selectedCategories.includes(category) ? (
                          <CheckIcon />
                        ) : (
                          <IconCrop11 />
                        )}
                      </span>
                      {category}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {errors?.categories && (
            <small className="text-sm text-red-500">
              {errors.categories[0]}
            </small>
          )}
        </div>

        {selectedCategories.map((category) => (
          <input
            key={category}
            type="hidden"
            name="categories"
            value={category}
          />
        ))}

        <Button type="submit" className="mt-4" disabled={isPending}>
          {isPending ? "Saving..." : "Save Service"}
        </Button>
      </form>
    </div>
  );
}
