
import React, { useState, useEffect } from "react";
import { GlassCard } from "../ui/glass-card";
import { useTranslation } from "react-i18next";
import { AILearningSourcesPanel } from "./AILearningSourcesPanel";
import { AIFeaturesList } from "./AIFeaturesList";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useTheme } from "next-themes";

// مكونات تم إعادة هيكلتها
import { AIStatusSection } from "./assistantComponents/AIStatusSection";
import { AIHeader } from "./assistantComponents/AIHeader";
import { AIMinimizedButton } from "./assistantComponents/AIMinimizedButton";
import { AICapabilitiesSection } from "./assistantComponents/AICapabilitiesSection";

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
    return <AIMinimizedButton onMaximize={onMaximize} />;
  }
  
  return (
    <GlassCard className="p-0 overflow-hidden transform transition-all duration-300 hover:shadow-lg">
      <AIHeader 
        isDarkModeAuto={isDarkModeAuto} 
        toggleDarkModeAuto={toggleDarkModeAuto} 
      />
      
      <div className="p-4">
        <AIStatusSection 
          status={status} 
          progress={progress}
          currentFeature={currentFeature}
        />
        
        {status === "learning" && recentSources.length > 0 && (
          <AILearningSourcesPanel recentSources={recentSources} />
        )}
        
        <AICapabilitiesSection isCompact={isSmallScreen} />
      </div>
    </GlassCard>
  );
}
