
import React, { useState, useEffect } from "react";
import { GlassCard } from "../ui/glass-card";
import { BrainCircuit } from "lucide-react";
import { Badge } from "../ui/badge";
import { useTranslation } from "react-i18next";
import { AIStatusIndicator } from "./AIStatusIndicator";
import { AIProgressBar } from "./AIProgressBar";
import { AIFeatureIndicator } from "./AIFeatureIndicator";
import { AILearningSourcesPanel } from "./AILearningSourcesPanel";
import { AICapabilitiesGrid } from "./AICapabilitiesGrid";
import { AICapabilitiesBadges } from "./AICapabilitiesBadges";
import { AIFeaturesList } from "./AIFeaturesList";

interface AIAssistantProps {
  minimized?: boolean;
  onMaximize?: () => void;
}

export function AIAssistantMain({ minimized = false, onMaximize }: AIAssistantProps) {
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
  
  // Simulate continuous learning process
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          // When task is complete, move to next feature
          setCurrentFeature(current => (current + 1) % AIFeaturesList.length);
          
          // Randomly change status
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
  }, [learningSources]);
  
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
        <AIStatusIndicator status={status} progress={progress} />
        
        <AIProgressBar progress={progress} status={status} />
        
        <AIFeatureIndicator currentFeature={currentFeature} />
        
        {status === "learning" && recentSources.length > 0 && (
          <AILearningSourcesPanel recentSources={recentSources} />
        )}
        
        <AICapabilitiesGrid />
        
        <AICapabilitiesBadges />
      </div>
    </GlassCard>
  );
}
