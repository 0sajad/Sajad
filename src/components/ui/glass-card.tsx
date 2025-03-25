
import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const GlassCard = ({
  children,
  className,
  hoverEffect = true,
  ...props
}: GlassCardProps) => {
  return (
    <div
      className={cn(
        "rounded-xl p-4 bg-white/70 backdrop-blur-md border border-white/20 shadow-sm",
        hoverEffect &&
          "transition-all duration-300 ease-in-out hover:shadow-md hover:bg-white/80",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { GlassCard };
