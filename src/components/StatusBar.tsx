
import React, { useState } from "react";
import { NetworkStatusIndicator } from "./ui/NetworkStatusIndicator";
import { useTranslation } from "react-i18next";
import { useOfflineMode } from "@/hooks/useOfflineMode";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";
import { cn } from "@/lib/utils";
import { Battery, BatteryWarning, Cpu, Loader2, Wifi, WifiOff } from "lucide-react";
import { AccessibilityToggleButton } from "./ui/accessibility/accessibility-toggle-button";
import { AccessibilityMenu } from "./ui/accessibility/accessibility-menu";
import { useA11y } from "@/hooks/useA11y";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface StatusBarProps {
  className?: string;
}

/**
 * شريط الحالة في أعلى التطبيق
 * يعرض معلومات عن حالة الشبكة والجهاز وأدوات إمكانية الوصول
 */
export function StatusBar({ className }: StatusBarProps) {
  const { t } = useTranslation();
  const { isOnline } = useOfflineMode();
  const { deviceTier } = usePerformanceOptimization();
  const [showA11yMenu, setShowA11yMenu] = useState(false);
  const { announce } = useA11y();
  
  // عندما يتغير وضع الاتصال، نعلن ذلك للقارئات الشاشية
  const handleNetworkStatusClick = () => {
    if (announce) {
      if (isOnline) {
        announce(t('network.online', 'أنت متصل بالإنترنت حاليًا'), 'polite');
      } else {
        announce(t('network.offline', 'أنت غير متصل بالإنترنت حاليًا'), 'polite');
      }
    }
  };
  
  // عندما يتغير وضع الإمكانية الوصول
  const toggleA11yMenu = () => {
    setShowA11yMenu(!showA11yMenu);
    
    if (announce) {
      if (!showA11yMenu) {
        announce(t('accessibility.menuOpened', 'تم فتح قائمة إمكانية الوصول'), 'polite');
      } else {
        announce(t('accessibility.menuClosed', 'تم إغلاق قائمة إمكانية الوصول'), 'polite');
      }
    }
  };
  
  // الحصول على نص معلومات أداء الجهاز
  const getPerformanceInfo = () => {
    if (deviceTier === 'low') {
      return t('performance.lowPerformance', 'أداء منخفض');
    } else if (deviceTier === 'medium') {
      return t('performance.mediumPerformance', 'أداء متوسط');
    } else {
      return t('performance.highPerformance', 'أداء عالي');
    }
  };
  
  return (
    <TooltipProvider>
      <div className={cn(
        "flex items-center justify-between bg-background/70 backdrop-blur-sm border-b p-1 px-2 text-xs",
        className
      )}
      role="status"
      aria-label={t('statusBar.title', 'شريط الحالة')}
      >
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          {/* مؤشر حالة الشبكة */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleNetworkStatusClick}
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label={isOnline ? t('network.online', 'متصل بالإنترنت') : t('network.offline', 'غير متصل بالإنترنت')}
              >
                {isOnline ? (
                  <Wifi className="h-3 w-3 mr-1 text-green-500" />
                ) : (
                  <WifiOff className="h-3 w-3 mr-1 text-red-500" />
                )}
                <span>
                  {isOnline ? t('network.online', 'متصل') : t('network.offline', 'غير متصل')}
                </span>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              {isOnline 
                ? t('network.onlineDetails', 'أنت متصل بالإنترنت حاليًا') 
                : t('network.offlineDetails', 'أنت غير متصل بالإنترنت حاليًا')
              }
            </TooltipContent>
          </Tooltip>
          
          {/* مؤشر أداء الجهاز */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center text-muted-foreground">
                <Cpu className="h-3 w-3 mr-1" />
                <span>{getPerformanceInfo()}</span>
                
                {deviceTier === 'low' && (
                  <div className="ml-1 text-amber-500 flex items-center">
                    <BatteryWarning className="h-3 w-3 mr-1" />
                    <span className="text-xs">
                      {t('performance.optimizedMode', 'وضع محسّن')}
                    </span>
                  </div>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {deviceTier === 'low'
                ? t('performance.lowPerformanceDetails', 'تم تفعيل وضع الأداء المنخفض لتحسين تجربة المستخدم')
                : deviceTier === 'medium'
                ? t('performance.mediumPerformanceDetails', 'وضع الأداء المتوسط مفعّل')
                : t('performance.highPerformanceDetails', 'وضع الأداء العالي مفعّل')
              }
            </TooltipContent>
          </Tooltip>
        </div>
        
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          {/* زر إمكانية الوصول */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <AccessibilityToggleButton onClick={toggleA11yMenu} />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {t('accessibility.toggleMenu', 'فتح/إغلاق قائمة إمكانية الوصول')}
            </TooltipContent>
          </Tooltip>
          
          {showA11yMenu && (
            <AccessibilityMenu />
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}

// For compatibility with React.lazy()
export default StatusBar;
