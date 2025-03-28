
import React from "react";
import { NetworkStatusIndicator } from "./NetworkStatusIndicator";
import { useTranslation } from "react-i18next";
import { useOfflineMode } from "@/hooks/useOfflineMode";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";
import { cn } from "@/lib/utils";
import { Battery, BatteryWarning, Cpu, Loader2 } from "lucide-react";
import { AccessibilityToggleButton } from "./accessibility/accessibility-toggle-button";
import { AccessibilityMenu } from "./accessibility/accessibility-menu";
import { useState } from "react";

interface StatusBarProps {
  className?: string;
}

export function StatusBar({ className }: StatusBarProps) {
  const { t } = useTranslation();
  const { isOnline } = useOfflineMode();
  const { deviceTier } = usePerformanceOptimization();
  const [showA11yMenu, setShowA11yMenu] = useState(false);
  
  return (
    <div className={cn(
      "flex items-center justify-between bg-background/70 backdrop-blur-sm border-b p-1 px-2 text-xs",
      className
    )}>
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        {/* مؤشر حالة الشبكة */}
        <NetworkStatusIndicator />
        
        {/* مؤشر أداء الجهاز */}
        <div className="flex items-center text-muted-foreground">
          <Cpu className="h-3 w-3 mr-1" />
          <span>
            {deviceTier === 'low' 
              ? t('performance.lowPerformance', 'أداء منخفض')
              : deviceTier === 'medium'
                ? t('performance.mediumPerformance', 'أداء متوسط')
                : t('performance.highPerformance', 'أداء عالي')
            }
          </span>
          
          {deviceTier === 'low' && (
            <div className="ml-1 text-amber-500 flex items-center">
              <BatteryWarning className="h-3 w-3 mr-1" />
              <span className="text-xs">
                {t('performance.optimizedMode', 'وضع محسّن')}
              </span>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        {/* زر إمكانية الوصول */}
        <AccessibilityToggleButton onClick={() => setShowA11yMenu(!showA11yMenu)} />
        {showA11yMenu && (
          <AccessibilityMenu 
            // This line was causing the error - removing onClose prop 
            // and handling the closing through separate component logic
          />
        )}
      </div>
    </div>
  );
}
