
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useOfflineMode } from '@/hooks/useOfflineMode';
import { Button } from './button';
import { motion, AnimatePresence } from 'framer-motion';

interface OfflineIndicatorProps {
  className?: string;
}

export function OfflineIndicator({ className }: OfflineIndicatorProps) {
  const { isOffline, checkConnection } = useOfflineMode();
  const { t } = useTranslation();
  
  // إذا كان متصلاً بالإنترنت، لا تعرض شيئاً
  if (!isOffline) {
    return null;
  }
  
  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "fixed bottom-4 right-4 flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50",
            className
          )}
        >
          <WifiOff size={16} className="shrink-0" />
          <span className="font-medium text-sm">
            {t('network.offline', 'أنت غير متصل بالإنترنت')}
          </span>
          <Button
            size="sm"
            variant="outline"
            className="ml-2 h-7 border-white/30 bg-white/10 hover:bg-white/20 text-white"
            onClick={() => checkConnection()}
          >
            <Wifi size={12} className="mr-1" />
            {t('network.retry', 'إعادة الاتصال')}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
