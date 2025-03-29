
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useOfflineMode } from "@/hooks/useOfflineMode";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";
import { cn } from "@/lib/utils";
import { 
  Battery, 
  BatteryWarning, 
  Cpu, 
  Wifi, 
  WifiOff, 
  Globe, 
  Clock,
  Database,
  RefreshCw
} from "lucide-react";
import { AccessibilityToggleButton } from "./ui/accessibility/accessibility-toggle-button";
import { useA11y } from "@/hooks/useA11y";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { ArabicTextEnhancer } from "./text/ArabicTextEnhancer";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";

interface StatusBarProps {
  className?: string;
}

/**
 * شريط الحالة في أعلى التطبيق
 * يعرض معلومات عن حالة الشبكة والجهاز وأدوات إمكانية الوصول
 */
export function StatusBar({ className }: StatusBarProps) {
  const { t, i18n } = useTranslation();
  const { isOnline, isOffline, lastCheck, networkInfo, hasPendingSync, syncPendingData, cacheSize } = useOfflineMode();
  const { deviceTier } = usePerformanceOptimization();
  const [showA11yMenu, setShowA11yMenu] = useState(false);
  const { announce } = useA11y();
  const isArabic = i18n.language?.startsWith('ar');
  
  // تحويل حجم التخزين المؤقت إلى وحدة مقروءة
  const formatCacheSize = (bytes: number | undefined) => {
    if (!bytes) return '0 KB';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };
  
  // إعداد وقت آخر فحص للشبكة
  const formatLastCheck = () => {
    if (!lastCheck) return '';
    return format(lastCheck, 'HH:mm:ss', { locale: isArabic ? ar : enUS });
  };
  
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
  
  // معالج المزامنة
  const handleSync = () => {
    syncPendingData();
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
                <ArabicTextEnhancer>
                  {isOnline ? t('network.online', 'متصل') : t('network.offline', 'غير متصل')}
                </ArabicTextEnhancer>
                
                {/* عند وجود بيانات معلقة للمزامنة */}
                {isOffline && hasPendingSync && (
                  <Badge variant="outline" className="ml-1 py-0 px-1.5">
                    <RefreshCw className="h-2.5 w-2.5 mr-1 animate-spin-slow" />
                    <span className="text-[0.6rem]">{t('network.pending', 'معلق')}</span>
                  </Badge>
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1">
                <p>
                  {isOnline 
                    ? t('network.onlineDetails', 'أنت متصل بالإنترنت حاليًا') 
                    : t('network.offlineDetails', 'أنت غير متصل بالإنترنت حاليًا')
                  }
                </p>
                <div className="text-xs text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{t('network.lastCheck', 'آخر فحص')}: {formatLastCheck()}</span>
                </div>
                
                {networkInfo && networkInfo.type && (
                  <div className="text-xs text-muted-foreground flex items-center">
                    <Globe className="h-3 w-3 mr-1" />
                    <span>{networkInfo.type} {networkInfo.effectiveType && `(${networkInfo.effectiveType})`}</span>
                  </div>
                )}
                
                {typeof cacheSize === 'number' && (
                  <div className="text-xs text-muted-foreground flex items-center">
                    <Database className="h-3 w-3 mr-1" />
                    <span>{t('network.cacheSize', 'حجم الذاكرة المؤقتة')}: {formatCacheSize(cacheSize)}</span>
                  </div>
                )}
                
                {isOffline && hasPendingSync && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={!isOnline} 
                    onClick={handleSync}
                    className="w-full mt-1"
                  >
                    <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                    <span>{t('network.syncNow', 'مزامنة الآن')}</span>
                  </Button>
                )}
              </div>
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
        </div>
      </div>
    </TooltipProvider>
  );
}

// For compatibility with React.lazy()
export default StatusBar;
