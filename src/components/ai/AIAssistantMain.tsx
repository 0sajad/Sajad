
import React, { useState, useEffect } from "react";
import { GlassCard } from "../ui/glass-card";
import { BrainCircuit, Moon, Sun } from "lucide-react";
import { Badge } from "../ui/badge";
import { useTranslation } from "react-i18next";
import { AIStatusIndicator } from "./AIStatusIndicator";
import { AIProgressBar } from "./AIProgressBar";
import { AIFeatureIndicator } from "./AIFeatureIndicator";
import { AILearningSourcesPanel } from "./AILearningSourcesPanel";
import { AICapabilitiesGrid } from "./AICapabilitiesGrid";
import { AICapabilitiesBadges } from "./AICapabilitiesBadges";
import { AIFeaturesList } from "./AIFeaturesList";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useTheme } from "next-themes";

interface AIAssistantProps {
  minimized?: boolean;
  onMaximize?: () => void;
}

export function AIAssistantMain({ minimized = false, onMaximize }: AIAssistantProps) {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
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
  const [isDarkModeAuto, setIsDarkModeAuto] = useState(
    localStorage.getItem("darkModeAuto") === "true"
  );
  
  // Check if screen is smaller than 640px (sm in Tailwind)
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  
  // تطبيق الوضع الليلي/النهاري التلقائي بناءً على الوقت
  useEffect(() => {
    if (isDarkModeAuto) {
      const hour = new Date().getHours();
      const shouldBeDark = hour < 7 || hour > 19; // إذا كان الوقت قبل 7 صباحًا أو بعد 7 مساءً
      setTheme(shouldBeDark ? "dark" : "light");
      
      // تحديث كل ساعة
      const intervalId = setInterval(() => {
        const currentHour = new Date().getHours();
        const isDark = currentHour < 7 || currentHour > 19;
        setTheme(isDark ? "dark" : "light");
      }, 60 * 60 * 1000); // كل ساعة
      
      return () => clearInterval(intervalId);
    }
  }, [isDarkModeAuto, setTheme]);
  
  // حفظ إعداد الوضع التلقائي في التخزين المحلي
  useEffect(() => {
    localStorage.setItem("darkModeAuto", isDarkModeAuto.toString());
  }, [isDarkModeAuto]);
  
  // Simulate continuous learning process
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          // When task is complete, move to next feature with smooth transition
          setCurrentFeature(current => (current + 1) % AIFeaturesList.length);
          
          // Randomly change status with weighted probability
          const statuses: ("learning" | "processing" | "idle" | "protecting" | "analyzing" | "optimizing")[] = [
            "learning", "processing", "idle", "protecting", "analyzing", "optimizing"
          ];
          const weights = [0.3, 0.2, 0.1, 0.15, 0.15, 0.1]; // أوزان لزيادة احتمالية ظهور بعض الحالات
          
          // اختيار حالة مع مراعاة الأوزان
          let randomValue = Math.random();
          let cumulativeWeight = 0;
          let selectedIndex = 0;
          
          for (let i = 0; i < weights.length; i++) {
            cumulativeWeight += weights[i];
            if (randomValue <= cumulativeWeight) {
              selectedIndex = i;
              break;
            }
          }
          
          const newStatus = statuses[selectedIndex];
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
          return prev + (isSmallScreen ? 2 : 1); // تسريع التقدم قليلاً على الشاشات الصغيرة
        } else {
          return prev + (isSmallScreen ? 2 : 1);
        }
      });
    }, 300);
    
    return () => clearInterval(interval);
  }, [learningSources, isSmallScreen]);
  
  const toggleDarkModeAuto = () => {
    setIsDarkModeAuto(prev => !prev);
  };
  
  if (minimized) {
    return (
      <div 
        className="fixed bottom-4 right-4 rtl:right-auto rtl:left-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full p-3 text-white cursor-pointer shadow-lg hover:shadow-xl transition-all z-50 animate-pulse hover:animate-none"
        onClick={onMaximize}
        aria-label={t('aiAssistant.maximize', 'فتح مساعد الذكاء الاصطناعي')}
        role="button"
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
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <button 
              onClick={toggleDarkModeAuto}
              className={`text-xs p-1 rounded-full transition-colors ${isDarkModeAuto ? 'bg-white/20 hover:bg-white/30' : 'hover:bg-white/10'}`}
              aria-label={isDarkModeAuto ? t('common.disableAutoDarkMode', 'تعطيل الوضع الليلي التلقائي') : t('common.enableAutoDarkMode', 'تفعيل الوضع الليلي التلقائي')}
            >
              {isDarkModeAuto ? (
                <div className="flex items-center">
                  <Moon size={12} className="mr-1 rtl:mr-0 rtl:ml-1" />
                  <Sun size={12} />
                </div>
              ) : (
                <div className="opacity-70">
                  <Sun size={14} />
                </div>
              )}
            </button>
            <Badge variant="outline" className="bg-white/10 text-white text-xs hover:bg-white/20 border-none">
              v2.5.1
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <AIStatusIndicator status={status} progress={progress} />
        
        <AIProgressBar progress={progress} status={status} />
        
        <AIFeatureIndicator currentFeature={currentFeature} />
        
        {status === "learning" && recentSources.length > 0 && (
          <AILearningSourcesPanel recentSources={recentSources} />
        )}
        
        <div className={isSmallScreen ? "space-y-2" : ""}>
          <AICapabilitiesGrid isCompact={isSmallScreen} />
          
          <AICapabilitiesBadges isCompact={isSmallScreen} />
        </div>
      </div>
    </GlassCard>
  );
}
