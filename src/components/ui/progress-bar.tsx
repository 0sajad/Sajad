
import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";
import { useA11y } from "@/hooks/useA11y";

interface ProgressBarProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number;
  max?: number;
  showValue?: boolean;
  animated?: boolean;
  variant?: "default" | "success" | "info" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  valueLabel?: string;
}

/**
 * مكون شريط التقدم المحسن
 * يعرض تقدمًا مع دعم إمكانية وصول محسن ومتوافق مع RTL
 */
export const ProgressBar = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressBarProps
>(({ 
  className, 
  value = 0, 
  max = 100,
  showValue = false,
  animated = true,
  variant = "default",
  size = "md",
  valueLabel,
  ...props 
}, ref) => {
  const { reducedMotion } = useA11y();
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  // تحديد السماكة حسب الحجم
  const getHeightClass = () => {
    switch (size) {
      case "sm": return "h-1.5";
      case "lg": return "h-4";
      default: return "h-2.5";
    }
  };
  
  // تحديد لون الخلفية حسب المتغير
  const getVariantClass = () => {
    switch (variant) {
      case "success": return "bg-green-600";
      case "info": return "bg-blue-600";
      case "warning": return "bg-amber-500";
      case "danger": return "bg-red-600";
      default: return "bg-primary";
    }
  };
  
  return (
    <div className="relative">
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden rounded-full bg-muted/30",
          getHeightClass(),
          className
        )}
        {...props}
        dir="ltr" // ضمان التوجيه الصحيح حتى في واجهات RTL
        style={{
          // ضمان ظهور صحيح في RTL
          transform: document.dir === 'rtl' ? 'scaleX(-1)' : undefined,
        }}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "flex h-full w-full items-center transition-all",
            getVariantClass(),
            animated && !reducedMotion && "animate-[progress-increase_1.5s_ease-in-out_infinite]",
            "transition-transform"
          )}
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
      </ProgressPrimitive.Root>
      
      {showValue && (
        <div 
          className={cn(
            "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
            "text-xs font-medium text-center",
            size === "sm" ? "hidden" : "block",
            "rtl:scale-x-[-1]" // إصلاح الترتيب في RTL
          )}
          aria-hidden="true"
        >
          {valueLabel ?? `${Math.round(percentage)}%`}
        </div>
      )}
      
      <span className="sr-only">
        {valueLabel ?? `${Math.round(percentage)}%`}
      </span>
    </div>
  );
});

ProgressBar.displayName = "ProgressBar";
