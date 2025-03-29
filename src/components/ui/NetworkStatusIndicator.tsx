
import React, { useCallback, useState } from 'react';
import { AlertTriangle, Wifi, WifiOff, RotateCw, Cloud, CloudOff, Database, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

// Simplified version that avoids circular dependencies
export function NetworkStatusIndicator() {
  const { t } = useTranslation();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [pendingItemsCount, setPendingItemsCount] = useState(0);
  
  // Update online status on mount and when it changes
  React.useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  // Simulate syncing
  const handleSync = useCallback(() => {
    if (!isOnline) return;
    
    setIsSyncing(true);
    setSyncProgress(0);
    
    const interval = setInterval(() => {
      setSyncProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsSyncing(false);
            setPendingItemsCount(0);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    
    return () => clearInterval(interval);
  }, [isOnline]);
  
  // Simulate having pending items if offline
  React.useEffect(() => {
    if (!isOnline && pendingItemsCount === 0) {
      setPendingItemsCount(Math.floor(Math.random() * 5) + 1);
    }
  }, [isOnline, pendingItemsCount]);
  
  // Don't show anything if online and no pending sync
  if (isOnline && pendingItemsCount === 0 && !isSyncing) {
    return null;
  }
  
  return (
    <AnimatePresence>
      <motion.div 
        className="fixed top-0 right-0 m-4 z-50 rtl:right-auto rtl:left-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-col items-end gap-2">
                <Button
                  variant={isOnline ? "outline" : "destructive"}
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={handleSync}
                  disabled={isSyncing}
                >
                  {isSyncing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="sr-only md:not-sr-only">
                        {t('network.syncing', 'جارِ المزامنة...')}
                      </span>
                    </>
                  ) : isOnline ? (
                    <>
                      <Cloud className="h-4 w-4" />
                      <span className="sr-only md:not-sr-only">
                        {t('network.syncPending', 'مزامنة معلقة')}
                      </span>
                    </>
                  ) : (
                    <>
                      <CloudOff className="h-4 w-4" />
                      <span className="sr-only md:not-sr-only">
                        {t('network.offline', 'غير متصل')}
                      </span>
                    </>
                  )}
                  
                  {pendingItemsCount > 0 && (
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
                    {t('network.offlineMode', 'وضع عدم الاتصال')}
                  </div>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="end">
              {isOnline 
                ? t('network.clickToSync', 'انقر للمزامنة') 
                : t('network.offlineDesc', 'أنت حاليا غير متصل بالإنترنت')}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </motion.div>
    </AnimatePresence>
  );
}

export default NetworkStatusIndicator;
