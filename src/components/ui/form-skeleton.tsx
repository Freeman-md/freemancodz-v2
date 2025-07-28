"use client";

import { Skeleton } from "@/components/ui/skeleton";

type Field = {
  labelWidth?: string;
  inputHeight?: string;
  inputWidth?: string;
  isTextarea?: boolean;
};

type FormSkeletonProps = {
  fields?: number | Field[];
  showSubmitButton?: boolean;
  submitWidth?: string;
};

export default function FormSkeleton({
  fields = 3,
  showSubmitButton = true,
  submitWidth = "w-32",
}: FormSkeletonProps) {
  const renderFields = () => {
    if (typeof fields === "number") {
      return Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-full" />
        </div>
      ));
    }

    return fields.map((field, i) => (
      <div key={i} className="space-y-2">
        <Skeleton className={`h-4 ${field.labelWidth ?? "w-28"}`} />
        <Skeleton
          className={`${field.inputHeight ?? "h-10"} ${field.inputWidth ?? "w-full"}`}
        />
      </div>
    ));
  };

  return (
    <div className="space-y-6">
      {renderFields()}

      {showSubmitButton && (
        <Skeleton className={`h-10 ${submitWidth} mt-4`} />
      )}
    </div>
  );
}
