
import React from "react";
import { Server, Shield, Globe, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

export function AICapabilitiesGrid() {
  const { t } = useTranslation();
  
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex-1 rounded-md bg-gray-50 p-2 transform transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
        <div className="flex items-center mb-1">
          <Server size={12} className="text-octaBlue-600 mr-1 rtl:mr-0 rtl:ml-1" />
          <span className="text-xs font-medium">{t('aiAssistant.continuousLearning')}</span>
        </div>
        <p className="text-xs text-muted-foreground">{t('aiAssistant.learningDesc')}</p>
      </div>
      
      <div className="flex-1 rounded-md bg-gray-50 p-2 transform transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
        <div className="flex items-center mb-1">
          <Shield size={12} className="text-red-500 mr-1 rtl:mr-0 rtl:ml-1" />
          <span className="text-xs font-medium">{t('aiAssistant.security')}</span>
        </div>
        <p className="text-xs text-muted-foreground">{t('aiAssistant.securityDesc')}</p>
      </div>
      
      <div className="flex-1 rounded-md bg-gray-50 p-2 transform transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
        <div className="flex items-center mb-1">
          <Globe size={12} className="text-green-600 mr-1 rtl:mr-0 rtl:ml-1" />
          <span className="text-xs font-medium">{t('aiAssistant.multiLanguage')}</span>
        </div>
        <p className="text-xs text-muted-foreground">{t('aiAssistant.multiLanguageDesc')}</p>
      </div>
      
      <div className="flex-1 rounded-md bg-gray-50 p-2 transform transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
        <div className="flex items-center mb-1">
          <Zap size={12} className="text-amber-500 mr-1 rtl:mr-0 rtl:ml-1" />
          <span className="text-xs font-medium">{t('aiAssistant.selfDevelopment')}</span>
        </div>
        <p className="text-xs text-muted-foreground">{t('aiAssistant.selfDevelopmentDesc')}</p>
      </div>
    </div>
  );
}
