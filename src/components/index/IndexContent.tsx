
import React, { useState, useEffect, lazy, Suspense } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { NetworkDashboard } from "@/components/NetworkDashboard";
import { AnimatedCards } from "@/components/AnimatedCards";
import { AIFeaturesSection } from "@/components/sections/AIFeaturesSection";
import { SettingsSection } from "@/components/sections/SettingsSection";
import { CTASection } from "@/components/sections/CTASection";
import { FloatingAIAssistant } from "@/components/FloatingAIAssistant";
import { NetworkToolsSection } from "@/components/network/NetworkToolsSection";
import { useTranslation } from 'react-i18next';
import { SmartSuspense } from "@/components/ui/smart-suspense";
import { CardSkeleton } from "@/components/ui/skeleton";
import { useAccessibilityAnnouncer } from "@/hooks/useAccessibilityAnnouncer";
import { useA11y } from "@/hooks/useA11y";
import { useAppPerformance } from "@/hooks/useAppPerformance";

// استيراد المكونات بشكل كسول لتحسين أداء التحميل الأولي
const NetworkMonitoring = lazy(() => import("@/components/network/NetworkMonitoring").then(module => ({ default: module.NetworkMonitoring })));
const DeveloperPanel = lazy(() => import("@/components/developer/DeveloperPanel").then(module => ({ default: module.DeveloperPanel })));

interface IndexContentProps {
  loaded: boolean;
  isTransitioning: boolean;
}

export const IndexContent: React.FC<IndexContentProps> = ({ loaded, isTransitioning }) => {
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const { t } = useTranslation();
  const { reducedMotion } = useA11y();
  const { announce } = useAccessibilityAnnouncer();
  const { metrics } = useAppPerformance();
  
  useEffect(() => {
    // قياس أداء التحميل
    if (metrics) {
      console.log("📊 Performance metrics:", metrics);
      if (metrics.loadTime > 3000) {
        console.warn("🚧 Page load time is high:", metrics.loadTime.toFixed(2), "ms");
      }
    }
    
    // عرض مساعد الذكاء الاصطناعي بعد فترة
    const timeout = setTimeout(() => {
      setShowAIAssistant(true);
      announce("مساعد الذكاء الاصطناعي جاهز للاستخدام", "info");
    }, 5000);
    
    return () => {
      clearTimeout(timeout);
    };
  }, [announce, metrics]);

  return (
    <>
      <main id="main-content" tabIndex={-1} className="relative">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Network Dashboard Section */}
        <SmartSuspense
          fallback={<CardSkeleton className="container mx-auto my-8 px-4 md:px-6" />}
          minLoadTime={300}
        >
          <NetworkDashboard />
        </SmartSuspense>
        
        {/* Network Tools Section */}
        <SmartSuspense
          fallback={<CardSkeleton className="container mx-auto my-8 px-4 md:px-6" />}
          minLoadTime={300}
        >
          <NetworkToolsSection />
        </SmartSuspense>
        
        {/* Network Monitoring - Lazy Loaded */}
        <SmartSuspense
          fallback={<CardSkeleton className="container mx-auto my-8 px-4 md:px-6" />}
          minLoadTime={300}
        >
          <NetworkMonitoring />
        </SmartSuspense>
        
        {/* Features Section */}
        <SmartSuspense
          fallback={<CardSkeleton className="container mx-auto my-8 px-4 md:px-6" />}
          minLoadTime={300}
        >
          <AnimatedCards />
        </SmartSuspense>
        
        {/* AI Features Section */}
        <SmartSuspense
          fallback={<CardSkeleton className="container mx-auto my-8 px-4 md:px-6" />}
          minLoadTime={300}
        >
          <AIFeaturesSection />
        </SmartSuspense>
        
        {/* Settings Section */}
        <SmartSuspense
          fallback={<CardSkeleton className="container mx-auto my-8 px-4 md:px-6" />}
          minLoadTime={300}
        >
          <SettingsSection />
        </SmartSuspense>
        
        {/* Developer Panel - Lazy Loaded */}
        <SmartSuspense
          fallback={<CardSkeleton className="container mx-auto my-8 px-4 md:px-6" />}
          minLoadTime={300}
        >
          <DeveloperPanel />
        </SmartSuspense>
        
        {/* CTA Section */}
        <SmartSuspense
          fallback={<CardSkeleton className="container mx-auto my-8 px-4 md:px-6" />}
          minLoadTime={300}
        >
          <CTASection />
        </SmartSuspense>
      </main>
      
      {/* Floating AI Assistant */}
      <FloatingAIAssistant 
        show={showAIAssistant} 
        onMaximize={() => window.location.href = '/ai'} 
      />
    </>
  );
};
