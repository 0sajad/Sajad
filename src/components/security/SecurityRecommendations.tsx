
import React from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { AlertTriangle, Shield } from "lucide-react";

export const SecurityRecommendations: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
      <div className="flex items-start gap-3">
        <AlertTriangle className="text-amber-500 h-6 w-6 flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-md font-medium text-amber-800 mb-1">{t('securityDashboard.securityRecommendations', 'Security Recommendations')}</h3>
          <ul className="space-y-2 text-sm text-amber-700">
            <li className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
              <span>{t('securityDashboard.recommendation1', 'Update router firmware to latest version')}</span>
            </li>
            <li className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
              <span>{t('securityDashboard.recommendation2', 'Enable two-factor authentication for admin access')}</span>
            </li>
            <li className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
              <span>{t('securityDashboard.recommendation3', 'Review and remove unused network devices')}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-4">
        <Button size="sm" className="w-full">
          <Shield size={16} className="mr-2" />
          {t('securityDashboard.applyRecommendations', 'Apply All Recommendations')}
        </Button>
      </div>
    </div>
  );
};
