
import React from "react";
import { Zap, RefreshCcw, Shield, Search, BarChart, Cpu } from "lucide-react";
import { useTranslation } from "react-i18next";

interface AIStatusIndicatorProps {
  status: "learning" | "processing" | "idle" | "protecting" | "analyzing" | "optimizing";
  progress: number;
}

export function AIStatusIndicator({ status, progress }: AIStatusIndicatorProps) {
  const { t } = useTranslation();
  
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
  
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center">
        <StatusIcon />
        <span className="text-xs text-muted-foreground">{currentStatusText()}</span>
      </div>
      <div className="text-xs text-muted-foreground">{progress}%</div>
    </div>
  );
}
