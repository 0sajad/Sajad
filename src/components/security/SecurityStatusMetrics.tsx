
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { CheckCircle, Lock, Key } from "lucide-react";

export const SecurityStatusMetrics: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
      <Card className="border-l-4 border-l-green-500 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-500" size={20} />
            <div>
              <p className="text-sm text-muted-foreground">{t('securityDashboard.firewallStatus', 'Firewall Status')}</p>
              <p className="text-lg font-medium">{t('securityDashboard.active', 'Active')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border-l-4 border-l-blue-500 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Lock className="text-blue-500" size={20} />
            <div>
              <p className="text-sm text-muted-foreground">{t('securityDashboard.encryptionStatus', 'Encryption')}</p>
              <p className="text-lg font-medium">WPA3</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border-l-4 border-l-amber-500 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Key className="text-amber-500" size={20} />
            <div>
              <p className="text-sm text-muted-foreground">{t('securityDashboard.passwordStrength', 'Password Strength')}</p>
              <p className="text-lg font-medium">{t('securityDashboard.strong', 'Strong')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
