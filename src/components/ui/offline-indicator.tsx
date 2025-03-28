
import React from 'react';
import { useOfflineMode } from '@/hooks/useOfflineMode';
import { useTranslation } from 'react-i18next';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { Button } from './button';
import { motion, AnimatePresence } from 'framer-motion';
import { useA11y } from '@/hooks/useA11y';

export function OfflineIndicator() {
  const { t } = useTranslation();
  const { isOnline, attemptReconnect } = useOfflineMode();
  const { reducedMotion } = useA11y();
  
  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: reducedMotion ? 0.1 : 0.3 }}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
          role="alert"
          aria-live="assertive"
        >
          <div className="bg-destructive/90 backdrop-blur-sm text-destructive-foreground px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 rtl:space-x-reverse border border-destructive/20">
            <WifiOff className="h-4 w-4" />
            <span className="text-sm font-medium">
              {t('network.offlineAlert', 'أنت غير متصل بالإنترنت')}
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 text-xs bg-white/10 hover:bg-white/20 text-white ml-2"
              onClick={attemptReconnect}
              aria-label={t('network.reconnect', 'إعادة الاتصال')}
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              {t('network.reconnect', 'إعادة الاتصال')}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
