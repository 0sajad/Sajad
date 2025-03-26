
import React from "react";
import { useTranslation } from "react-i18next";
import { getSecurityStatus } from "./utils/securityUtils";
import { cn } from "@/lib/utils";

interface SecurityScoreCardProps {
  securityScore: number;
}

export const SecurityScoreCard: React.FC<SecurityScoreCardProps> = ({ securityScore }) => {
  const { t } = useTranslation();
  const securityStatus = getSecurityStatus(securityScore, t);
  
  return (
    <div className="p-4 rounded-lg border bg-gradient-to-br from-white to-gray-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">{t('securityDashboard.securityScore', 'Security Score')}</h3>
        <span className={`text-lg font-bold ${securityStatus.color}`}>{securityScore}/100 - {securityStatus.label}</span>
      </div>
      
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-4">
        <div 
          className={cn("h-full rounded-full", 
            securityScore >= 90 ? 'bg-green-500' : 
            securityScore >= 75 ? 'bg-blue-500' : 
            securityScore >= 60 ? 'bg-amber-500' : 'bg-red-500'
          )} 
          style={{ width: `${securityScore}%` }}
        ></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <span className="text-sm text-muted-foreground">90-100: {t('securityDashboard.excellent', 'Excellent')}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-blue-500"></div>
          <span className="text-sm text-muted-foreground">75-89: {t('securityDashboard.good', 'Good')}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-amber-500"></div>
          <span className="text-sm text-muted-foreground">60-74: {t('securityDashboard.fair', 'Fair')}</span>
        </div>
      </div>
    </div>
  );
};
