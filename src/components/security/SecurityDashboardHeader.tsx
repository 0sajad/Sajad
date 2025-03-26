
import React from "react";
import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Shield, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface SecurityDashboardHeaderProps {
  isRefreshing: boolean;
  onRefresh: () => void;
}

export const SecurityDashboardHeader: React.FC<SecurityDashboardHeaderProps> = ({ 
  isRefreshing, 
  onRefresh 
}) => {
  const { t } = useTranslation("securityDashboard");
  
  return (
    <div className="bg-gradient-to-r from-octaBlue-50 to-octaBlue-100 rounded-t-lg flex flex-row items-center justify-between p-6">
      <div>
        <CardTitle className="text-octaBlue-800 flex items-center">
          <Shield className="mr-2 h-5 w-5 text-octaBlue-600" />
          {t('title', 'Security Dashboard')}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {t('description', 'Monitor and manage security threats to your network')}
        </p>
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onRefresh} 
        disabled={isRefreshing}
      >
        <RefreshCw size={16} className={cn("mr-2", isRefreshing && "animate-spin")} />
        {t('refresh', 'Refresh')}
      </Button>
    </div>
  );
};
