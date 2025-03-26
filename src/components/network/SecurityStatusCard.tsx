
import React from "react";
import { Shield, Cpu, Server, Lock, Info } from "lucide-react";
import { GlassCard } from "../ui/glass-card";
import { useTranslation } from 'react-i18next';
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export const SecurityStatusCard: React.FC = () => {
  const { t, i18n } = useTranslation('securityStatus');
  const currentLanguage = i18n.language;
  const isRTL = currentLanguage === "ar" || currentLanguage === "ar-iq";
  const [threatLevel, setThreatLevel] = React.useState(10); // 100 is high, 0 is low
  
  return (
    <GlassCard className="h-[300px] animate-fade-in p-0 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h3 className={`font-medium ${isRTL ? 'font-tajawal' : ''}`}>{t('title')}</h3>
        <p className={`text-sm text-muted-foreground ${isRTL ? 'font-tajawal' : ''}`}>{t('subtitle')}</p>
      </div>
      <div className="p-4 flex flex-col h-[240px]">
        <div className={`flex items-center mb-4 p-3 bg-green-50 rounded-lg ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
          <Shield className={cn("text-green-500", isRTL ? "ml-3" : "mr-3")} size={20} />
          <div>
            <p className={`text-sm font-medium ${isRTL ? 'font-tajawal' : ''}`}>{t('firewall')}</p>
            <p className={`text-xs text-muted-foreground ${isRTL ? 'font-tajawal' : ''}`}>{t('firewallStatus')}</p>
          </div>
        </div>
        
        <div className={`flex items-center mb-4 p-3 bg-green-50 rounded-lg ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
          <Cpu className={cn("text-green-500", isRTL ? "ml-3" : "mr-3")} size={20} />
          <div>
            <p className={`text-sm font-medium ${isRTL ? 'font-tajawal' : ''}`}>{t('intrusionDetection')}</p>
            <p className={`text-xs text-muted-foreground ${isRTL ? 'font-tajawal' : ''}`}>{t('intrusionStatus')}</p>
          </div>
        </div>
        
        <div className={`flex items-center mb-4 p-3 bg-green-50 rounded-lg ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
          <Server className={cn("text-green-500", isRTL ? "ml-3" : "mr-3")} size={20} />
          <div>
            <p className={`text-sm font-medium ${isRTL ? 'font-tajawal' : ''}`}>{t('vpnStatus')}</p>
            <p className={`text-xs text-muted-foreground ${isRTL ? 'font-tajawal' : ''}`}>{t('vpnStatusValue')}</p>
          </div>
        </div>
        
        <div className={`flex items-center ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
          <Lock className={cn("text-green-500", isRTL ? "ml-3" : "mr-3")} size={20} />
          <div className="w-full">
            <div className="flex justify-between mb-1">
              <span className={`text-sm ${isRTL ? 'font-tajawal' : ''}`}>{t('threatLevel')}</span>
              <span className={`text-sm ${isRTL ? 'font-tajawal' : ''}`}>{t('threatLevelValue')}</span>
            </div>
            <Progress value={threatLevel} className="h-2" />
          </div>
        </div>
        
        <div className="mt-auto">
          <Button 
            variant="outline" 
            size="sm" 
            className={`w-full flex items-center justify-center ${isRTL ? 'font-tajawal flex-row-reverse' : ''}`}
          >
            <Info className={cn("h-4 w-4", isRTL ? "ml-2" : "mr-2")} />
            {t('scanNow')}
          </Button>
        </div>
      </div>
    </GlassCard>
  );
};
