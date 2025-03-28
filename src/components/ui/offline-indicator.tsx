
import React from 'react';
import { AlertCircle, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOfflineMode } from '@/hooks/useOfflineMode';
import { useTranslation } from 'react-i18next';

interface OfflineIndicatorProps {
  className?: string;
}

export function OfflineIndicator({ className = '' }: OfflineIndicatorProps) {
  const { t } = useTranslation();
  const { isOffline, hasPendingSync, attemptReconnect } = useOfflineMode();
  
  if (!isOffline) {
    return null;
  }
  
  return (
    <div className={`fixed bottom-4 left-4 rtl:left-auto rtl:right-4 z-50 ${className}`}>
      <div className="flex items-center gap-2 bg-yellow-500 dark:bg-yellow-600 text-white px-3 py-2 rounded-lg shadow-lg">
        <WifiOff className="h-4 w-4" />
        <span className="text-sm font-medium">{t('network.offlineMode', 'وضع عدم الاتصال')}</span>
        {hasPendingSync && (
          <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            {t('network.pendingSync', 'مزامنة معلقة')}
          </span>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="h-7 ml-2 bg-yellow-600 dark:bg-yellow-700 hover:bg-yellow-700 dark:hover:bg-yellow-800 text-white"
          onClick={attemptReconnect}
        >
          {t('network.reconnect', 'إعادة الاتصال')}
        </Button>
      </div>
    </div>
  );
}
