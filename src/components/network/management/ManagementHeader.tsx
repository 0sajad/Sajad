
import React from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface ManagementHeaderProps {
  onRefresh: () => void;
  isRefreshing: boolean;
}

export function ManagementHeader({ onRefresh, isRefreshing }: ManagementHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{t('networkTools.networkManagement')}</h3>
        <p className="text-sm text-muted-foreground">{t('networkTools.deviceManagement')}</p>
      </div>
      <Button variant="outline" size="sm" onClick={onRefresh} disabled={isRefreshing}>
        <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
        <span className="ml-2">{isRefreshing ? '...' : t('networkTools.faultMonitoring')}</span>
      </Button>
    </div>
  );
}
