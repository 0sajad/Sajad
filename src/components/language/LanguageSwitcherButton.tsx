
import React from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LanguageSwitcherButtonProps {
  currentLanguageFlag: string;
  isTransitioning: boolean;
  isRTL: boolean;
  reducedMotion: boolean;
  onClick: () => void;
  tooltipText: string;
  className?: string;
  variant?: "icon" | "full";
  currentLanguageNativeName?: string;
}

export function LanguageSwitcherButton({
  currentLanguageFlag,
  isTransitioning,
  isRTL,
  reducedMotion,
  onClick,
  tooltipText,
  className = "",
  variant = "icon",
  currentLanguageNativeName
}: LanguageSwitcherButtonProps) {
  return (
    <Button
      variant="outline"
      size={variant === "icon" ? "icon" : "default"}
      className={cn(
        "relative transition-all duration-300 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 border border-blue-200 dark:border-gray-600",
        isTransitioning ? "opacity-50" : "opacity-100",
        className
      )}
      aria-label={tooltipText}
      onClick={onClick}
    >
      {variant === "icon" ? (
        <div className="relative">
          <Globe className="h-4 w-4" />
          <motion.div 
            className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center border border-white dark:border-gray-700 shadow-md"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: reducedMotion ? 30 : 15 
            }}
          >
            <span className="text-[10px]">{currentLanguageFlag}</span>
          </motion.div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="mr-1">{currentLanguageFlag}</span>
          <span>{currentLanguageNativeName}</span>
          <Globe className="h-4 w-4 ml-2" />
        </div>
      )}
    </Button>
  );
}
