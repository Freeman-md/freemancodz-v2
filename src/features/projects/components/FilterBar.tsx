"use client";

import { Badge } from "@/components/ui/badge";

type Props = {
  label: string;
  items: string[];
  activeItems: string[];
  onToggle: (value: string) => void;
};

export default function FilterBar({ label, items, activeItems, onToggle }: Props) {
  if (items.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="text-xs uppercase tracking-wide text-white/50">{label}</div>
      <div
        className="
          flex items-center gap-2 w-full
          overflow-x-auto whitespace-nowrap
          scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent
          md:flex-wrap md:whitespace-normal
        "
        role="listbox"
        aria-label={`${label} filters`}
      >
        {items.map((item) => {
          const isActive = activeItems.includes(item);
          return (
            <Badge
              key={item}
              role="option"
              aria-selected={isActive}
              onClick={() => onToggle(item)}
              variant="outline"
              className={[
                "cursor-pointer select-none",
                isActive
                  ? "text-primary border-primary"
                  : "border-white/40 text-white/40 hover:text-white hover:border-white",
              ].join(" ")}
              asChild
            >
              <button type="button">{item}</button>
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
