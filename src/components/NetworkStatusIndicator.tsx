
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { Wifi, WifiOff, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface NetworkStatusIndicatorProps {
  className?: string;
  showText?: boolean;
}

/**
 * مؤشر لحالة الاتصال بالشبكة مع دعم وضع عدم الاتصال
 */
export const NetworkStatusIndicator = memo(function NetworkStatusIndicator({ 
  className, 
  showText = true 
}: NetworkStatusIndicatorProps) {
  const { t } = useTranslation();
  // Use simple state logic to avoid unnecessary subscription to complex state
  const isOnline = navigator.onLine;
  const hasPendingSync = false; // Default to false instead of subscribing to state
  
  const getStatusText = () => {
    if (isOnline) {
      return t('network.online', 'متصل');
    }
    return t('network.offline', 'غير متصل');
  };
  
  const getStatusIcon = () => {
    if (isOnline) {
      return <Wifi className="h-3.5 w-3.5" />;
    }
    return <WifiOff className="h-3.5 w-3.5" />;
  };
  
  const getTooltipText = () => {
    if (isOnline) {
      return t('network.onlineTooltip', 'متصل بالإنترنت');
    }
    if (hasPendingSync) {
      return t('network.offlineWithPendingData', 'غير متصل - سيتم مزامنة البيانات المحفوظة محليًا عند استعادة الاتصال');
    }
    return t('network.offlineTooltip', 'غير متصل بالإنترنت - بعض الميزات قد لا تعمل');
  };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className={cn(
              "flex items-center space-x-1 rtl:space-x-reverse",
              isOnline ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400",
              className
            )}
            aria-label={getStatusText()}
          >
            {getStatusIcon()}
            {showText && <span className="text-xs font-medium">{getStatusText()}</span>}
            {!isOnline && hasPendingSync && (
              <HelpCircle className="h-3 w-3 text-amber-500 animate-pulse" />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getTooltipText()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});
