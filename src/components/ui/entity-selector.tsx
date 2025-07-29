"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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

export type EntitySelectorProps = {
  label?: string;
  entities: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  onReload?: () => void;
  error?: string;
  entityLabel?: string; // e.g. "Category", "Tool"
  renderCreateForm: (searchTerm: string) => React.ReactNode;
};

export default function EntitySelector({
  label = "Items",
  entityLabel = "Item",
  entities,
  selected,
  onChange,
  onReload,
  error,
  renderCreateForm,
}: EntitySelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const toggleEntity = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>

      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {selected.map((value) => (
            <motion.div
              key={value}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
            >
              <Badge variant="secondary" className="flex items-center gap-1">
                {value}
                <button
                  type="button"
                  className="ml-1 text-xs cursor-pointer"
                  onClick={() => toggleEntity(value)}
                aria-label={`Remove ${value}`}
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
            {selected.length > 0
              ? `Edit selected ${label.toLowerCase()}`
              : `Select ${entityLabel.toLowerCase()}`}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
          <Command>
            <CommandInput
              placeholder={`Search ${entityLabel.toLowerCase()}...`}
              onValueChange={(value) => setSearchTerm(value)}
            />
            <CommandEmpty className="flex py-4 items-center justify-center gap-2">
              <small>Can&apos;t find {entityLabel.toLowerCase()}?</small>
              {onReload && renderCreateForm(searchTerm)}
            </CommandEmpty>
            <CommandList>
              {entities.map((value) => (
                <CommandItem
                  key={value}
                  value={value}
                  onSelect={() => toggleEntity(value)}
                >
                  <span className="mr-2">
                    {selected.includes(value) ? <CheckIcon /> : <IconCrop11 />}
                  </span>
                  {value}
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
