
import React from "react";
import { Shield, Cpu, Server } from "lucide-react";
import { GlassCard } from "../ui/glass-card";
import { useTranslation } from 'react-i18next';

export const SecurityStatusCard: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <GlassCard className="h-[300px] animate-fade-in p-0 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-medium">{t('securityStatus.title')}</h3>
        <p className="text-sm text-muted-foreground">{t('securityStatus.subtitle')}</p>
      </div>
      <div className="p-4 flex flex-col h-[240px]">
        <div className="flex items-center mb-4 p-3 bg-green-50 rounded-lg">
          <Shield className="text-green-500 mr-3" size={20} />
          <div>
            <p className="text-sm font-medium">{t('securityStatus.firewall')}</p>
            <p className="text-xs text-muted-foreground">{t('securityStatus.firewallStatus')}</p>
          </div>
        </div>
        
        <div className="flex items-center mb-4 p-3 bg-green-50 rounded-lg">
          <Cpu className="text-green-500 mr-3" size={20} />
          <div>
            <p className="text-sm font-medium">{t('securityStatus.intrusionDetection')}</p>
            <p className="text-xs text-muted-foreground">{t('securityStatus.intrusionStatus')}</p>
          </div>
        </div>
        
        <div className="flex items-center p-3 bg-green-50 rounded-lg">
          <Server className="text-green-500 mr-3" size={20} />
          <div>
            <p className="text-sm font-medium">{t('securityStatus.vpnStatus')}</p>
            <p className="text-xs text-muted-foreground">{t('securityStatus.vpnStatusValue')}</p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
