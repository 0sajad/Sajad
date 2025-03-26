
import React, { useState, useEffect } from "react";
import { GlassCard } from "./ui/glass-card";
import { BrainCircuit, Zap, RefreshCcw, Cpu, Server, Shield, FileCode, Globe, Database, BarChart, Network, Search, Terminal } from "lucide-react";
import { Progress } from "./ui/progress";
import { useTranslation } from "react-i18next";
import { Badge } from "./ui/badge";

interface AIAssistantProps {
  minimized?: boolean;
  onMaximize?: () => void;
}

export function AIAssistant({ minimized = false, onMaximize }: AIAssistantProps) {
  const { t } = useTranslation();
  const [status, setStatus] = useState<"learning" | "processing" | "idle" | "protecting" | "analyzing" | "optimizing">("idle");
  const [progress, setProgress] = useState(0);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [learningSources, setLearningSources] = useState<string[]>([
    "W3C Web Standards", 
    "NIST Cybersecurity Framework", 
    "IEEE 802.11 Specifications", 
    "RFC Network Protocols", 
    "Academic Research Papers"
  ]);
  const [recentSources, setRecentSources] = useState<string[]>([]);
  
  // المميزات التي يعمل عليها المساعد الذكي
  const features = [
    { id: "selfImproving", icon: BrainCircuit, color: "text-purple-600" },
    { id: "security", icon: Shield, color: "text-red-500" },
    { id: "codeAnalysis", icon: FileCode, color: "text-blue-600" },
    { id: "webDevelopment", icon: Globe, color: "text-green-600" },
    { id: "database", icon: Database, color: "text-amber-600" },
    { id: "networkAnalysis", icon: Network, color: "text-cyan-600" },
    { id: "dataVisualization", icon: BarChart, color: "text-indigo-600" },
    { id: "research", icon: Search, color: "text-rose-600" },
    { id: "commandLine", icon: Terminal, color: "text-gray-600" }
  ];
  
  // محاكاة لعملية التعلم المستمر
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          // عند الانتهاء من مهمة، انتقل إلى المهمة التالية
          setCurrentFeature(current => (current + 1) % features.length);
          
          // تغيير الحالة عشوائيًا
          const statuses: ("learning" | "processing" | "idle" | "protecting" | "analyzing" | "optimizing")[] = [
            "learning", "processing", "idle", "protecting", "analyzing", "optimizing"
          ];
          const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
          setStatus(newStatus);
          
          // Update recent learning sources when learning
          if (newStatus === "learning") {
            const newSource = learningSources[Math.floor(Math.random() * learningSources.length)];
            setRecentSources(prev => {
              const updated = [newSource, ...prev.slice(0, 2)];
              return updated;
            });
          }
          
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
  }, [features.length, learningSources]);
  
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
      case "analyzing":
        return t('aiAssistant.analyzing', 'Analyzing...');
      case "optimizing":
        return t('aiAssistant.optimizing', 'Optimizing...');
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
      case "analyzing":
        return <Search size={16} className="text-cyan-500 mr-1 rtl:mr-0 rtl:ml-1 animate-pulse" />;
      case "optimizing":
        return <BarChart size={16} className="text-green-500 mr-1 rtl:mr-0 rtl:ml-1 animate-pulse" />;
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
          {t(`aiAssistant.features.${feature.id}`, feature.id)}
        </span>
      </div>
    );
  };
  
  const getStatusColor = () => {
    switch (status) {
      case "learning": return "bg-amber-500";
      case "processing": return "bg-blue-500";
      case "protecting": return "bg-red-500";
      case "analyzing": return "bg-cyan-500";
      case "optimizing": return "bg-green-500";
      default: return "bg-green-500";
    }
  };
  
  return (
    <GlassCard className="p-0 overflow-hidden transform transition-all duration-300 hover:shadow-lg">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BrainCircuit size={20} className="mr-2 rtl:mr-0 rtl:ml-2" />
            <h3 className="font-medium text-sm">{t('aiAssistant.title')}</h3>
          </div>
          <Badge variant="outline" className="bg-white/10 text-white text-xs hover:bg-white/20 border-none">
            v2.5.1
          </Badge>
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
          <Progress value={progress} className={`h-full rounded-full ${getStatusColor()}`} />
        </div>
        
        <div className="mb-4 text-xs text-muted-foreground">
          {getCurrentFeature()}
        </div>
        
        {status === "learning" && recentSources.length > 0 && (
          <div className="mb-4 p-2 bg-amber-50 rounded-md">
            <p className="text-xs font-medium text-amber-700 mb-1">{t('aiAssistant.learningSources', 'Learning From')}:</p>
            <ul className="space-y-1">
              {recentSources.map((source, index) => (
                <li key={index} className="text-xs text-amber-600 flex items-center">
                  <div className="w-1 h-1 bg-amber-500 rounded-full mr-1"></div>
                  {source}
                </li>
              ))}
            </ul>
          </div>
        )}
        
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
        
        <div className="mt-4 p-2 bg-blue-50 rounded-md">
          <p className="text-xs font-medium text-blue-700 mb-1">{t('aiAssistant.aiCapabilities', 'AI Capabilities')}:</p>
          <div className="flex flex-wrap gap-1">
            {features.map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <Badge key={index} variant="outline" className="bg-white text-xs flex items-center gap-1 py-0.5">
                  <FeatureIcon size={10} className={feature.color} />
                  <span>{t(`aiAssistant.features.${feature.id}`, feature.id)}</span>
                </Badge>
              );
            })}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
