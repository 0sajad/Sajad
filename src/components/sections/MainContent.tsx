
import React, { Suspense, lazy } from 'react';
import { HeroSection } from "./HeroSection";
import { Skeleton } from "@/components/ui/skeleton";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";

// تعريف النوع للمكونات الكسولة
type LazyComponentType = React.ComponentType<any>;

// تصحيح التحميل الكسول للمكونات مع دعم الصادرات المسماة
const AnimatedCards = lazy(() => 
  import("@/components/AnimatedCards").then(module => ({ default: module.AnimatedCards }))
);
const AIFeaturesSection = lazy(() => 
  import("@/components/sections/AIFeaturesSection").then(module => ({ default: module.AIFeaturesSection }))
);
const NetworkDashboard = lazy(() => 
  import("@/components/NetworkDashboard").then(module => ({ default: module.NetworkDashboard }))
);
const NetworkToolsSection = lazy(() => 
  import("@/components/network/NetworkToolsSection").then(module => ({ default: module.NetworkToolsSection }))
);
const SettingsSection = lazy(() => 
  import("@/components/sections/SettingsSection").then(module => ({ default: module.SettingsSection }))
);
const CTASection = lazy(() => 
  import("@/components/sections/CTASection").then(module => ({ default: module.CTASection }))
);

// مكون التحميل المُحسّن للمكونات البطيئة
const SectionLoader = () => (
  <div className="w-full py-8 animate-pulse" role="status" aria-label="جاري التحميل">
    <div className="container mx-auto px-4 lg:px-8">
      <Skeleton className="w-full h-8 mb-4 rounded-md" />
      <Skeleton className="w-3/4 h-4 mb-8 rounded-md" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <Skeleton key={i} className="h-64 rounded-lg" />
        ))}
      </div>
    </div>
  </div>
);

interface MainContentProps {
  sectionsVisible: Record<string, boolean>;
  isTransitioning: boolean;
  language: string;
  isRTL: boolean;
}

export function MainContent({ sectionsVisible, isTransitioning, language, isRTL }: MainContentProps) {
  const { shouldUseLazyLoading } = usePerformanceOptimization();
  
  // تحميل تدريجي للمكونات بناءً على رؤيتها في الشاشة
  const renderLazySections = (sectionId: string, Component: React.ComponentType<any>) => {
    // تحقق من استراتيجية التحميل البطيء
    if (!shouldUseLazyLoading()) {
      return (
        <Suspense fallback={<SectionLoader />}>
          <Component />
        </Suspense>
      );
    }
    
    // تحميل فقط إذا كان القسم مرئيًا
    if (sectionsVisible[sectionId]) {
      return (
        <Suspense fallback={<SectionLoader />}>
          <Component />
        </Suspense>
      );
    }
    return <SectionLoader />;
  };

  return (
    <main 
      id="main-content" 
      tabIndex={-1} 
      className={`relative overflow-hidden ${isTransitioning ? 'opacity-0 transition-opacity duration-300' : 'opacity-100 transition-opacity duration-300'}`}
      lang={language}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <HeroSection />
      
      <div id="animated-cards-section" className="observe-section">
        <Suspense fallback={<SectionLoader />}>
          <AnimatedCards />
        </Suspense>
      </div>
      
      <div id="ai-features-section" className="observe-section">
        {renderLazySections('ai-features-section', AIFeaturesSection)}
      </div>
      
      <div id="network-dashboard-section" className="observe-section">
        {renderLazySections('network-dashboard-section', NetworkDashboard)}
      </div>
      
      <div id="network-tools-section" className="observe-section">
        {renderLazySections('network-tools-section', NetworkToolsSection)}
      </div>
      
      <div id="settings-section" className="observe-section">
        {renderLazySections('settings-section', SettingsSection)}
      </div>
      
      <div id="cta-section" className="observe-section">
        {renderLazySections('cta-section', CTASection)}
      </div>
    </main>
  );
}

export default MainContent;
