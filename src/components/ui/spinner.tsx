// components/ui/spinner.tsx

import { cn } from "@/lib/utils"; // optional utility if you use className merging
import { Loader2 } from "lucide-react";

export default function Spinner({ size = "sm", className = "" }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <Loader2
      className={cn(
        "animate-spin",
        sizes[size],
        className
      )}
      role="status"
    />
  );
}
