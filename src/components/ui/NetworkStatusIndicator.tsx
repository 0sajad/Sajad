
import React from "react";
import { useOfflineMode } from "@/hooks/useOfflineMode";
import { useTranslation } from "react-i18next";
import { WifiOff, Wifi } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { useA11y } from "@/hooks/useA11y";

export function NetworkStatusIndicator() {
  const { t } = useTranslation();
  const { isOnline, attemptReconnect } = useOfflineMode();
  const { reducedMotion } = useA11y();
  
  if (isOnline) return null;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <motion.div
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0.1 : 0.3 }}
        >
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="p-1 h-7 bg-destructive/10 hover:bg-destructive/20 text-destructive"
              onClick={attemptReconnect}
              aria-label={t('network.offline', 'غير متصل بالإنترنت')}
            >
              <WifiOff className="h-4 w-4 mr-1" />
              <Badge variant="outline" className="text-xs bg-destructive/20 border-destructive/20 text-destructive">
                {t('network.offline', 'غير متصل')}
              </Badge>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{t('network.reconnectHint', 'انقر للمحاولة مجددًا')}</p>
          </TooltipContent>
        </motion.div>
      </Tooltip>
    </TooltipProvider>
  );
}
