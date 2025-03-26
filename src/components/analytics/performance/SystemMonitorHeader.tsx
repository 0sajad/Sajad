
import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cpu, RefreshCw } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SystemMonitorHeaderProps {
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const SystemMonitorHeader = ({ onRefresh, isRefreshing }: SystemMonitorHeaderProps) => {
  const { t } = useTranslation();
  
  return (
    <CardHeader className="bg-gradient-to-r from-octaBlue-50 to-octaBlue-100 rounded-t-lg flex flex-row items-center justify-between">
      <div>
        <CardTitle className="text-octaBlue-800 flex items-center">
          <Cpu className="mr-2 h-5 w-5 text-octaBlue-600" />
          {t('systemMonitor.title', 'System Performance Monitor')}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {t('systemMonitor.description', 'Real-time monitoring of system resources')}
        </p>
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onRefresh} 
        disabled={isRefreshing}
      >
        <RefreshCw size={16} className={isRefreshing ? 'animate-spin mr-2' : 'mr-2'} />
        {t('systemMonitor.refresh', 'Refresh')}
      </Button>
    </CardHeader>
  );
};
