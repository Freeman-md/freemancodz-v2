import { Skeleton } from "@/components/ui/skeleton"

export default function CardSkeleton() {
  return (
    <div className="rounded-xl border p-4 shadow-sm space-y-3">
      <Skeleton className="h-48 w-full rounded-md" /> {/* Image placeholder */}
      <Skeleton className="h-6 w-2/3" />              {/* Title */}
      <Skeleton className="h-4 w-full" />             {/* Subtitle/line 1 */}
      <Skeleton className="h-4 w-5/6" />              {/* Subtitle/line 2 */}
      <Skeleton className="h-8 w-24 rounded-md" />    {/* Button/Action */}
    </div>
  )
}
