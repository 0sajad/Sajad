
import React from 'react';
import { AlertTriangle, Wifi, WifiOff, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOfflineSupport } from '@/hooks/useOfflineSupport';
import { useTranslation } from 'react-i18next';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ArabicTextEnhancer } from '../text/ArabicTextEnhancer';
import { Badge } from '@/components/ui/badge';

/**
 * مؤشر حالة الشبكة الذي يظهر في أعلى التطبيق
 * تم تحسينه لاستخدام الخطافات المحسنة
 */
export function NetworkStatusIndicator() {
  const { t } = useTranslation();
  const { 
    isOnline, 
    hasPendingSync, 
    pendingItemsCount,
    isSyncing,
    syncOfflineData, 
    checkConnection 
  } = useOfflineSupport();
  
  // إذا كان المستخدم متصلاً بالإنترنت ولا توجد بيانات غير متزامنة، لا نعرض أي شيء
  if (isOnline && !hasPendingSync && !isSyncing) {
    return null;
  }
  
  return (
    <div className="fixed top-0 right-0 m-4 z-50 rtl:right-auto rtl:left-0">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex flex-col items-end gap-2">
              <Button
                variant={isOnline ? "outline" : "destructive"}
                size="sm"
                className="flex items-center gap-2"
                onClick={isOnline ? syncOfflineData : checkConnection}
                disabled={isSyncing}
              >
                {isSyncing ? (
                  <>
                    <RotateCw className="h-4 w-4 animate-spin" />
                    <ArabicTextEnhancer>
                      <span className="sr-only md:not-sr-only">
                        {t('network.syncing', 'جارِ المزامنة...')}
                      </span>
                    </ArabicTextEnhancer>
                  </>
                ) : isOnline ? (
                  <>
                    <Wifi className="h-4 w-4" />
                    <ArabicTextEnhancer>
                      <span className="sr-only md:not-sr-only">
                        {t('network.syncPending', 'مزامنة معلقة')}
                      </span>
                    </ArabicTextEnhancer>
                  </>
                ) : (
                  <>
                    <WifiOff className="h-4 w-4" />
                    <ArabicTextEnhancer>
                      <span className="sr-only md:not-sr-only">
                        {t('network.offline', 'غير متصل')}
                      </span>
                    </ArabicTextEnhancer>
                  </>
                )}
                
                {hasPendingSync && pendingItemsCount > 0 && (
                  <Badge variant="outline" className="bg-background/80 ml-1">
                    {pendingItemsCount}
                  </Badge>
                )}
              </Button>
              
              {!isOnline && (
                <div className="bg-destructive/10 text-destructive text-xs p-1 px-2 rounded-md flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  <ArabicTextEnhancer>
                    {t('network.offlineMode', 'وضع عدم الاتصال')}
                  </ArabicTextEnhancer>
                </div>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <ArabicTextEnhancer>
              {isOnline 
                ? t('network.clickToSync', 'انقر للمزامنة الآن') 
                : t('network.clickToReconnect', 'انقر لمحاولة إعادة الاتصال')}
            </ArabicTextEnhancer>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
