
import React from "react";
import { cn } from "@/lib/utils";

/**
 * مكون Skeleton أكثر تخصيصاً للوحات تحميل العناصر
 */
export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted/60",
        className
      )}
      {...props}
      aria-hidden="true"
    />
  );
}

/**
 * وضع تحميل لبطاقة
 */
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[80%]" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[50%]" />
      </div>
    </div>
  );
}

/**
 * وضع تحميل لقائمة
 */
export function ListSkeleton({ 
  count = 3, 
  className 
}: { 
  count?: number 
  className?: string 
}) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array(count)
        .fill(null)
        .map((_, i) => (
          <div key={i} className="flex items-center space-x-4 rtl:space-x-reverse">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
    </div>
  );
}

/**
 * وضع تحميل للنص
 */
export function TextSkeleton({
  lines = 3,
  lastLineWidth = 70,
  className
}: {
  lines?: number
  lastLineWidth?: number
  className?: string
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array(lines)
        .fill(null)
        .map((_, i) => (
          <Skeleton
            key={i}
            className={cn("h-4", {
              "w-full": i !== lines - 1,
              [`w-[${lastLineWidth}%]`]: i === lines - 1
            })}
          />
        ))}
    </div>
  );
}

/**
 * وضع تحميل للوحة التحكم
 */
export function DashboardSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Skeleton className="h-[150px] rounded-xl" />
      <Skeleton className="h-[150px] rounded-xl" />
      <Skeleton className="h-[150px] rounded-xl" />
      <Skeleton className="h-[150px] rounded-xl" />
      
      <Skeleton className="h-[400px] col-span-2 rounded-xl" />
      <Skeleton className="h-[400px] col-span-2 rounded-xl" />
    </div>
  );
}
