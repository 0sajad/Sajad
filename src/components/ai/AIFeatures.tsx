
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Network, Code, Wifi, Globe, FileCode, Database, Zap, Shield, BrainCircuit, Terminal, Layers, Cpu } from "lucide-react";
import { useTranslation } from "react-i18next";

export const AIFeatures = () => {
  const { t } = useTranslation();
  
  // المميزات المتاحة بالذكاء الاصطناعي
  const aiFeatures = [
    { id: "selfImproving", icon: BrainCircuit, description: "selfImprovingDesc" },
    { id: "programmingProblems", icon: Terminal, description: "programmingProblemsDesc" },
    { id: "multiLanguage", icon: Code, description: "multiLanguageDesc" },
    { id: "networkAnalysis", icon: Wifi, description: "networkAnalysisDesc" },
    { id: "createApps", icon: Globe, description: "createAppsDesc" },
    { id: "fileHandling", icon: FileCode, description: "fileHandlingDesc" },
    { id: "devIntegration", icon: Database, description: "devIntegrationDesc" },
    { id: "cloudAi", icon: Layers, description: "cloudAiDesc" },
    { id: "voiceProcessing", icon: Cpu, description: "voiceProcessingDesc" },
    { id: "security", icon: Shield, description: "securityDesc" },
    { id: "machineLearning", icon: Zap, description: "machineLearningDesc" },
    { id: "networkTools", icon: Network, description: "networkToolsDesc" },
  ];

  return (
    <ScrollArea className="h-[500px] p-4">
      <div className="space-y-4">
        {aiFeatures.map((feature, index) => (
          <div 
            key={index} 
            className="flex items-start p-3 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 transition-colors cursor-pointer"
          >
            <div className="p-2 rounded-md bg-white shadow-sm mr-3 rtl:mr-0 rtl:ml-3">
              <feature.icon size={20} className="text-octaBlue-600" />
            </div>
            <div>
              <h4 className="font-medium text-sm">{t(`aiFeatures.${feature.id}`)}</h4>
              <p className="text-xs text-muted-foreground">{t(`aiFeatures.${feature.description}`)}</p>
            </div>
          </div>
        ))}
        
        <div className="mt-6">
          <h4 className="font-semibold mb-2">{t('aiFeatures.continuousDevelopment')}</h4>
          <div className="flex items-center mb-2">
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse" style={{width: '85%'}}></div>
            </div>
            <span className="text-xs font-medium ml-2 rtl:ml-0 rtl:mr-2">85%</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {t('aiFeatures.continuousDevelopmentDesc')}
          </p>
        </div>
        
        <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-100">
          <h4 className="font-semibold mb-2 flex items-center">
            <Shield size={16} className="mr-2 rtl:mr-0 rtl:ml-2 text-amber-600" />
            {t('aiFeatures.securitySystem')}
          </h4>
          <p className="text-xs text-muted-foreground">
            {t('aiFeatures.securitySystemDesc')}
          </p>
        </div>
      </div>
    </ScrollArea>
  );
};
