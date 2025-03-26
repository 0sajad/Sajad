
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Activity, Zap } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export const DashboardHeader = () => {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold mb-1">{t('dashboard.title', 'Dashboard')}</h1>
        <p className="text-muted-foreground">{t('dashboard.welcome', 'Welcome to OCTA-GRAM Dashboard')}</p>
      </div>
      
      <div className="flex space-x-2">
        <Button 
          size="sm" 
          variant="outline" 
          className="bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border-green-200 text-green-700"
          onClick={() => {
            toast({
              title: t('dashboard.systemScan', 'System Scan'),
              description: t('dashboard.scanStarted', 'Network scan started. Results will be available soon.')
            });
          }}
        >
          <Activity size={16} className="mr-2" />
          {t('dashboard.quickScan', 'Quick Scan')}
        </Button>
        
        <Button 
          size="sm" 
          variant="outline"
          className="bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-blue-200 text-blue-700"
          onClick={() => {
            toast({
              title: t('dashboard.optimize', 'Optimize'),
              description: t('dashboard.optimizeStarted', 'Network optimization started.')
            });
          }}
        >
          <Zap size={16} className="mr-2" />
          {t('dashboard.optimize', 'Optimize')}
        </Button>
      </div>
    </div>
  );
};
