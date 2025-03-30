
import React from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { AccessibilityToggleButton } from "./ui/accessibility/accessibility-toggle-button";
import { useA11y } from "@/hooks/useA11y";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { NetworkStatusIndicator } from "./NetworkStatusIndicator";

interface StatusBarProps {
  className?: string;
}

/**
 * Status bar component that appears at the top of the application
 */
export function StatusBar({ className }: StatusBarProps) {
  const { t } = useTranslation();
  const { announce } = useA11y();
  
  return (
    <TooltipProvider>
      <div className={cn(
        "flex items-center justify-between bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/10 dark:to-blue-800/10 backdrop-blur-sm p-1 px-4 text-xs",
        className
      )}
      role="status"
      aria-label={t('statusBar.title', 'شريط الحالة')}
      >
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          {/* Network status indicator */}
          <NetworkStatusIndicator showText={true} />
        </div>
        
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          {/* Accessibility toggle button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <AccessibilityToggleButton />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {t('accessibility.toggleMenu', 'فتح/إغلاق قائمة إمكانية الوصول')}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default StatusBar;
