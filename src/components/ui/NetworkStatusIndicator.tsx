
import React from 'react';
import { AlertTriangle, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOfflineMode } from '@/hooks/useOfflineMode';
import { useTranslation } from 'react-i18next';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

/**
 * مؤشر حالة الشبكة الذي يظهر في أعلى التطبيق
 */
export function NetworkStatusIndicator() {
  const { t } = useTranslation();
  const { isOnline, hasPendingSync, syncOfflineData, attemptReconnect } = useOfflineMode();
  
  // إذا كان المستخدم متصلاً بالإنترنت، لا نعرض أي شيء
  if (isOnline && !hasPendingSync) {
    return null;
  }
  
  return (
    <div className="fixed top-0 right-0 m-4 z-50 rtl:right-auto rtl:left-0">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={isOnline ? "outline" : "destructive"}
              size="sm"
              className="flex items-center gap-2"
              onClick={isOnline ? syncOfflineData : attemptReconnect}
            >
              {isOnline ? (
                <>
                  <Wifi className="h-4 w-4" />
                  <span className="sr-only md:not-sr-only">
                    {t('network.syncPending', 'مزامنة معلقة')}
                  </span>
                </>
              ) : (
                <>
                  <WifiOff className="h-4 w-4" />
                  <span className="sr-only md:not-sr-only">
                    {t('network.offline', 'غير متصل')}
                  </span>
                </>
              )}
              
              {hasPendingSync && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {isOnline 
              ? t('network.clickToSync', 'انقر للمزامنة الآن') 
              : t('network.clickToReconnect', 'انقر لمحاولة إعادة الاتصال')}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
