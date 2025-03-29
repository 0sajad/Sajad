
import React from 'react';
import { AlertTriangle, Wifi, WifiOff, RotateCw, Cloud, CloudOff, Database, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOfflineSupport } from '@/hooks/useOfflineSupport';
import { useTranslation } from 'react-i18next';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ArabicTextEnhancer } from '../text/ArabicTextEnhancer';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { useA11y } from '@/hooks/useA11y';

/**
 * مؤشر حالة الشبكة الذي يظهر في أعلى التطبيق
 * تم تحسينه لاستخدام الخطافات المحسنة وتوفير المزيد من المعلومات
 */
export function NetworkStatusIndicator() {
  const { t } = useTranslation();
  const { 
    isOnline, 
    hasPendingSync, 
    pendingItemsCount,
    isSyncing,
    lastSyncTime,
    syncProgress,
    syncOfflineData, 
    checkConnection,
    pendingActions
  } = useOfflineSupport();
  const { announce } = useA11y?.() || { announce: undefined };
  
  // إذا كان المستخدم متصلاً بالإنترنت ولا توجد بيانات غير متزامنة، لا نعرض أي شيء
  if (isOnline && !hasPendingSync && !isSyncing) {
    return null;
  }
  
  // معالج النقر للمزامنة أو فحص الاتصال
  const handleClick = () => {
    if (isOnline) {
      syncOfflineData();
      if (announce) {
        announce(t('network.syncingData', 'جارِ مزامنة البيانات المعلقة'), 'polite');
      }
    } else {
      checkConnection();
      if (announce) {
        announce(t('network.checkingConnection', 'جارِ التحقق من الاتصال'), 'polite');
      }
    }
  };
  
  // تنسيق الوقت للعرض
  const formatTime = (time: Date | null): string => {
    if (!time) return '';
    
    return new Intl.DateTimeFormat(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(time);
  };
  
  return (
    <AnimatePresence>
      <motion.div 
        className="fixed top-0 right-0 m-4 z-50 rtl:right-auto rtl:left-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-col items-end gap-2">
                <Button
                  variant={isOnline ? "outline" : "destructive"}
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={handleClick}
                  disabled={isSyncing}
                >
                  {isSyncing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <ArabicTextEnhancer>
                        <span className="sr-only md:not-sr-only">
                          {t('network.syncing', 'جارِ المزامنة...')}
                        </span>
                      </ArabicTextEnhancer>
                    </>
                  ) : isOnline ? (
                    <>
                      <Cloud className="h-4 w-4" />
                      <ArabicTextEnhancer>
                        <span className="sr-only md:not-sr-only">
                          {t('network.syncPending', 'مزامنة معلقة')}
                        </span>
                      </ArabicTextEnhancer>
                    </>
                  ) : (
                    <>
                      <CloudOff className="h-4 w-4" />
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
                
                {isSyncing && syncProgress > 0 && (
                  <div className="w-full">
                    <Progress value={syncProgress} className="h-1" />
                  </div>
                )}
                
                {!isOnline && (
                  <div className="bg-destructive/10 text-destructive text-xs p-1 px-2 rounded-md flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    <ArabicTextEnhancer>
                      {t('network.offlineMode', 'وضع عدم الاتصال')}
                    </ArabicTextEnhancer>
                  </div>
                )}
                
                {isOnline && hasPendingSync && (
                  <div className="bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs p-1 px-2 rounded-md flex items-center gap-1">
                    <Database className="h-3 w-3" />
                    <ArabicTextEnhancer>
                      {t('network.pendingData', 'بيانات بانتظار المزامنة')}
                    </ArabicTextEnhancer>
                  </div>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="end" className="w-64 p-3">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">
                  <ArabicTextEnhancer>
                    {isOnline 
                      ? t('network.onlineStatus', 'متصل بالإنترنت') 
                      : t('network.offlineStatus', 'غير متصل بالإنترنت')}
                  </ArabicTextEnhancer>
                </h4>
                
                {hasPendingSync && (
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <ArabicTextEnhancer>
                        {t('network.pendingItems', 'العناصر المعلقة')}:
                      </ArabicTextEnhancer>
                      <span className="font-medium">{pendingItemsCount}</span>
                    </div>
                    
                    {lastSyncTime && (
                      <div className="text-muted-foreground">
                        <ArabicTextEnhancer>
                          {t('network.lastSync', 'آخر مزامنة')}: {formatTime(lastSyncTime)}
                        </ArabicTextEnhancer>
                      </div>
                    )}
                    
                    <div className="mt-2">
                      <ArabicTextEnhancer>
                        {isOnline 
                          ? t('network.clickToSync', 'انقر للمزامنة الآن') 
                          : t('network.clickToReconnect', 'انقر لمحاولة إعادة الاتصال')}
                      </ArabicTextEnhancer>
                    </div>
                  </div>
                )}
                
                {pendingActions && pendingActions.length > 0 && (
                  <div className="border-t pt-2 mt-2">
                    <h5 className="font-medium text-xs mb-1">
                      <ArabicTextEnhancer>
                        {t('network.pendingActions', 'الإجراءات المعلقة')}
                      </ArabicTextEnhancer>
                    </h5>
                    <ul className="text-[11px] space-y-1 max-h-20 overflow-auto">
                      {pendingActions.slice(0, 3).map((action, index) => (
                        <li key={index} className="text-muted-foreground">
                          {action.type} - {new Date(action.timestamp).toLocaleTimeString()}
                        </li>
                      ))}
                      {pendingActions.length > 3 && (
                        <li className="text-muted-foreground italic">
                          +{pendingActions.length - 3} {t('common.more', 'المزيد')}
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </motion.div>
    </AnimatePresence>
  );
}

// تصدير المكون كمكون افتراضي لدعم React.lazy
export default NetworkStatusIndicator;
