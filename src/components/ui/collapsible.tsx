
import React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleTrigger> & {
    showIcon?: boolean;
    iconPosition?: "start" | "end";
  }
>(({ className, children, showIcon = true, iconPosition = "end", ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleTrigger
    ref={ref}
    className={cn(
      "flex items-center justify-between w-full rounded-md px-4 py-2 text-sm font-medium transition-all hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
      className
    )}
    {...props}
  >
    {iconPosition === "start" && showIcon && (
      <ChevronDown className="h-4 w-4 transition-transform ui-open:rotate-180" />
    )}
    {children}
    {iconPosition === "end" && showIcon && (
      <ChevronDown className="h-4 w-4 transition-transform ui-open:rotate-180 ml-2" />
    )}
  </CollapsiblePrimitive.CollapsibleTrigger>
));
CollapsibleTrigger.displayName = "CollapsibleTrigger";

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleContent>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent> & {
    animateHeight?: boolean;
  }
>(({ className, children, animateHeight = true, ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleContent
    ref={ref}
    className={cn("overflow-hidden", className)}
    {...props}
  >
    <AnimatePresence initial={false}>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: "auto", 
          opacity: 1,
          transition: {
            height: { duration: 0.3, ease: "easeOut" },
            opacity: { duration: 0.2, delay: 0.1 }
          }
        }}
        exit={{ 
          height: 0, 
          opacity: 0,
          transition: {
            height: { duration: 0.3, ease: "easeIn" },
            opacity: { duration: 0.2 }
          }
        }}
      >
        <div className="p-2">{children}</div>
      </motion.div>
    </AnimatePresence>
  </CollapsiblePrimitive.CollapsibleContent>
));
CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
