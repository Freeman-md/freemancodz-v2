"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import { CheckIcon, XCircleIcon } from "lucide-react";
import { IconCrop11 } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import CategoryForm from "@/app/(admin)/admin/categories/components/CategoryForm";

type Props = {
  categories: string[];
  selected: string[];
  onChange: (categories: string[]) => void;
  label?: string;
  error?: string;
  onReload: () => void;
};

export default function CategorySelector({
  selected,
  onChange,
  label = "Categories",
  categories,
  error,
  onReload,
}: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const toggleCategory = (category: string) => {
    if (selected.includes(category)) {
      onChange(selected.filter((existingCategory) => existingCategory !== category));
    } else {
      onChange([...selected, category]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>

      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {selected.map((category) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
            >
              <Badge variant="secondary" className="flex items-center gap-1">
                {category}
                <button
                  type="button"
                  className="ml-1 text-xs cursor-pointer"
                  onClick={() => toggleCategory(category)}
                >
                  <XCircleIcon width={20} />
                </button>
              </Badge>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {selected.length > 0 ? "Edit selected categories" : "Select categories"}
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
                onCreate={onReload}
              />
            </CommandEmpty>
            <CommandList>
              {categories.map((category) => (
                <CommandItem
                  key={category}
                  value={category}
                  onSelect={() => toggleCategory(category)}
                >
                  <span className="mr-2">
                    {selected.includes(category) ? <CheckIcon /> : <IconCrop11 />}
                  </span>
                  {category}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {error && <small className="text-sm text-red-500">{error}</small>}
    </div>
  );
}
