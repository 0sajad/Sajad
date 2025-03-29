
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle, Wifi, WifiOff, RotateCw, Signal, SignalLow, SignalMedium, SignalHigh } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useOfflineMode } from '@/hooks/useOfflineMode';
import { Button } from './button';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';
import { Badge } from './badge';
import { NetworkStatus } from '@/hooks/state/types';

interface OfflineIndicatorProps {
  className?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  showOnlineStatus?: boolean;
}

export function OfflineIndicator({ 
  className, 
  position = 'bottom-right',
  showOnlineStatus = false 
}: OfflineIndicatorProps) {
  const { isOffline, isOnline, checkConnection, networkInfo, isChecking, lastCheck } = useOfflineMode();
  const { t } = useTranslation();
  
  // إذا كان متصلاً بالإنترنت ولسنا بحاجة إلى عرض حالة الاتصال، لا تعرض شيئاً
  if (!isOffline && !showOnlineStatus) {
    return null;
  }
  
  // الحصول على أيقونة مناسبة لسرعة الاتصال
  const getConnectionIcon = () => {
    const info = networkInfo as any;
    if (!info?.connectionType || isOffline) return <WifiOff size={16} className="shrink-0" />;
    
    switch(info?.connectionType) {
      case '4g':
        return <SignalHigh size={16} className="shrink-0" />;
      case '3g':
        return <SignalMedium size={16} className="shrink-0" />;
      case '2g':
      case 'slow-2g':
        return <SignalLow size={16} className="shrink-0" />;
      default:
        return <Signal size={16} className="shrink-0" />;
    }
  };
  
  // تحديد وضع المؤشر بناءً على الموقع المحدد
  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
  };
  
  // تعيين لون الخلفية بناءً على حالة الاتصال
  const bgColorClass = isOffline 
    ? 'bg-red-500 text-white' 
    : (networkInfo as any)?.latency && (networkInfo as any)?.latency > 500
      ? 'bg-amber-500 text-white'
      : 'bg-green-500 text-white';
  
  // تنسيق التاريخ للعرض
  const getFormattedTime = () => {
    if (!lastCheck) return '';
    
    return new Intl.DateTimeFormat(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(lastCheck);
  };
  
  // الحصول على نص سرعة الاتصال
  const getConnectionSpeed = () => {
    const info = networkInfo as any;
    if (isOffline) return t('network.offline', 'غير متصل');
    if (!info?.connectionType) return t('network.unknown', 'غير معروف');
    
    switch(info?.connectionType) {
      case '4g':
        return t('network.fastConnection', 'اتصال سريع');
      case '3g':
        return t('network.mediumConnection', 'اتصال متوسط');
      case '2g':
      case 'slow-2g':
        return t('network.slowConnection', 'اتصال بطيء');
      default:
        return info?.connectionType;
    }
  };
  
  return (
    <TooltipProvider>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className={cn(
            `fixed ${positionClasses[position]} flex items-center gap-2 ${bgColorClass} px-4 py-2 rounded-lg shadow-lg z-50`,
            className
          )}
        >
          <div className="flex items-center">
            {getConnectionIcon()}
            <span className="font-medium text-sm mx-2">
              {isOffline 
                ? t('network.offline', 'أنت غير متصل بالإنترنت')
                : t('network.online', 'أنت متصل بالإنترنت')
              }
            </span>
            
            {(networkInfo as any)?.latency && !isOffline && (
              <Badge variant="outline" className="bg-white/20 border-white/30 text-white text-[10px]">
                {(networkInfo as any)?.latency}ms
              </Badge>
            )}
          </div>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="ml-1 h-7 border-white/30 bg-white/10 hover:bg-white/20 text-white"
                onClick={() => checkConnection()}
                disabled={isChecking}
              >
                {isChecking ? (
                  <RotateCw size={12} className="mr-1 animate-spin" />
                ) : (
                  <Wifi size={12} className="mr-1" />
                )}
                {t('network.retry', 'فحص الاتصال')}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-xs space-y-1">
                <p>{t('network.lastCheck', 'آخر فحص')}: {getFormattedTime()}</p>
                <p>{t('network.connectionType', 'نوع الاتصال')}: {getConnectionSpeed()}</p>
                {(networkInfo as any)?.latency && (
                  <p>{t('network.latency', 'زمن الاستجابة')}: {(networkInfo as any)?.latency}ms</p>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        </motion.div>
      </AnimatePresence>
    </TooltipProvider>
  );
}
