
import React, { useState, useEffect } from "react";
import { GlassCard } from "./ui/glass-card";
import { BrainCircuit, Zap, RefreshCcw, Cpu, Server, Shield, FileCode, Globe, Database } from "lucide-react";
import { Progress } from "./ui/progress";
import { useTranslation } from "react-i18next";

interface AIAssistantProps {
  minimized?: boolean;
  onMaximize?: () => void;
}

export function AIAssistant({ minimized = false, onMaximize }: AIAssistantProps) {
  const { t } = useTranslation();
  const [status, setStatus] = useState<"learning" | "processing" | "idle" | "protecting">("idle");
  const [progress, setProgress] = useState(0);
  const [currentFeature, setCurrentFeature] = useState(0);
  
  // المميزات التي يعمل عليها المساعد الذكي
  const features = [
    { id: "selfImproving", icon: BrainCircuit, color: "text-purple-600" },
    { id: "security", icon: Shield, color: "text-red-500" },
    { id: "codeAnalysis", icon: FileCode, color: "text-blue-600" },
    { id: "webDevelopment", icon: Globe, color: "text-green-600" },
    { id: "database", icon: Database, color: "text-amber-600" }
  ];
  
  // محاكاة لعملية التعلم المستمر
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          // عند الانتهاء من مهمة، انتقل إلى المهمة التالية
          setCurrentFeature(current => (current + 1) % features.length);
          
          // تغيير الحالة عشوائيًا
          const statuses: ("learning" | "processing" | "idle" | "protecting")[] = [
            "learning", "processing", "idle", "protecting"
          ];
          setStatus(statuses[Math.floor(Math.random() * statuses.length)]);
          
          return 0;
        } else if (prev >= 75) {
          setStatus("processing");
          return prev + 1;
        } else {
          return prev + 1;
        }
      });
    }, 300);
    
    return () => clearInterval(interval);
  }, [features.length]);
  
  if (minimized) {
    return (
      <div 
        className="fixed bottom-4 right-4 rtl:right-auto rtl:left-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full p-3 text-white cursor-pointer shadow-lg hover:shadow-xl transition-all z-50"
        onClick={onMaximize}
      >
        <BrainCircuit size={24} className="animate-pulse" />
      </div>
    );
  }
  
  const currentStatusText = () => {
    switch (status) {
      case "learning":
        return t('aiAssistant.learning');
      case "processing":
        return t('aiAssistant.processing');
      case "protecting":
        return t('aiAssistant.protecting');
      default:
        return t('aiAssistant.ready');
    }
  };
  
  const StatusIcon = () => {
    switch (status) {
      case "learning":
        return <Zap size={16} className="text-amber-500 mr-1 rtl:mr-0 rtl:ml-1 animate-pulse" />;
      case "processing":
        return <RefreshCcw size={16} className="text-blue-500 mr-1 rtl:mr-0 rtl:ml-1 animate-spin" />;
      case "protecting":
        return <Shield size={16} className="text-red-500 mr-1 rtl:mr-0 rtl:ml-1 animate-pulse" />;
      default:
        return <Cpu size={16} className="text-green-500 mr-1 rtl:mr-0 rtl:ml-1" />;
    }
  };
  
  const getCurrentFeature = () => {
    const feature = features[currentFeature];
    const FeatureIcon = feature.icon;
    return (
      <div className="flex items-center">
        <FeatureIcon size={16} className={`${feature.color} mr-1 rtl:mr-0 rtl:ml-1`} />
        <span className="text-xs text-muted-foreground">
          {t(`aiAssistant.features.${feature.id}`)}
        </span>
      </div>
    );
  };
  
  return (
    <GlassCard className="p-0 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3">
        <div className="flex items-center">
          <BrainCircuit size={20} className="mr-2 rtl:mr-0 rtl:ml-2" />
          <h3 className="font-medium text-sm">{t('aiAssistant.title')}</h3>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <StatusIcon />
            <span className="text-xs text-muted-foreground">{currentStatusText()}</span>
          </div>
          <div className="text-xs text-muted-foreground">{progress}%</div>
        </div>
        
        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mb-2">
          <Progress value={progress} className={`h-full rounded-full ${
            status === "learning" 
              ? "bg-amber-500" 
              : status === "processing" 
                ? "bg-blue-500" 
                : status === "protecting"
                  ? "bg-red-500"
                  : "bg-green-500"
          }`} />
        </div>
        
        <div className="mb-4 text-xs text-muted-foreground">
          {getCurrentFeature()}
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="flex-1 rounded-md bg-gray-50 p-2">
            <div className="flex items-center mb-1">
              <Server size={12} className="text-octaBlue-600 mr-1 rtl:mr-0 rtl:ml-1" />
              <span className="text-xs font-medium">{t('aiAssistant.continuousLearning')}</span>
            </div>
            <p className="text-xs text-muted-foreground">{t('aiAssistant.learningDesc')}</p>
          </div>
          
          <div className="flex-1 rounded-md bg-gray-50 p-2">
            <div className="flex items-center mb-1">
              <Shield size={12} className="text-red-500 mr-1 rtl:mr-0 rtl:ml-1" />
              <span className="text-xs font-medium">{t('aiAssistant.security')}</span>
            </div>
            <p className="text-xs text-muted-foreground">{t('aiAssistant.securityDesc')}</p>
          </div>
          
          <div className="flex-1 rounded-md bg-gray-50 p-2">
            <div className="flex items-center mb-1">
              <Globe size={12} className="text-green-600 mr-1 rtl:mr-0 rtl:ml-1" />
              <span className="text-xs font-medium">{t('aiAssistant.multiLanguage')}</span>
            </div>
            <p className="text-xs text-muted-foreground">{t('aiAssistant.multiLanguageDesc')}</p>
          </div>
          
          <div className="flex-1 rounded-md bg-gray-50 p-2">
            <div className="flex items-center mb-1">
              <Zap size={12} className="text-amber-500 mr-1 rtl:mr-0 rtl:ml-1" />
              <span className="text-xs font-medium">{t('aiAssistant.selfDevelopment')}</span>
            </div>
            <p className="text-xs text-muted-foreground">{t('aiAssistant.selfDevelopmentDesc')}</p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
