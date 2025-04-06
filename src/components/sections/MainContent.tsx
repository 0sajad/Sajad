
import React, { Suspense, lazy } from 'react';
import { HeroSection } from "./HeroSection";
import { Skeleton } from "@/components/ui/skeleton";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";
import { ErrorBoundary } from "@/components/ui/error/ErrorBoundary";
import { ErrorMessage } from "@/components/ui/error/ErrorMessage";

// تعريف النوع للمكونات الكسولة
type LazyComponentType = React.ComponentType<any>;

// تصحيح التحميل الكسول للمكونات مع دعم الصادرات المسماة - مع تحسين آلية التحميل
const importComponent = (path: string, exportName?: string) => {
  return lazy(() => 
    import(path).then(module => ({ 
      default: exportName ? module[exportName] : module.default || module 
    }))
  );
};

// تحميل المكونات بشكل كسول باستخدام آلية موحدة
const AnimatedCards = importComponent('@/components/AnimatedCards', 'AnimatedCards');
const AIFeaturesSection = importComponent('@/components/sections/AIFeaturesSection', 'AIFeaturesSection');
const NetworkDashboard = importComponent('@/components/NetworkDashboard');
const NetworkToolsSection = importComponent('@/components/network/NetworkToolsSection');
const SettingsSection = importComponent('@/components/sections/SettingsSection', 'SettingsSection');
const CTASection = importComponent('@/components/sections/CTASection', 'CTASection');

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

// مكون خطأ التحميل
const SectionError = ({ sectionId }: { sectionId: string }) => (
  <div className="container mx-auto px-4 lg:px-8 py-8">
    <ErrorMessage
      title={`خطأ في تحميل القسم`}
      message={`لم نتمكن من تحميل قسم ${sectionId}`}
      showRetry
      showBackHome={false}
    />
  </div>
);

interface MainContentProps {
  sectionsVisible: Record<string, boolean>;
  isTransitioning: boolean;
  language: string;
  isRTL: boolean;
}

export function MainContent({ sectionsVisible, isTransitioning, language, isRTL }: MainContentProps) {
  const { shouldUseLazyLoading, isLowPerformanceDevice } = usePerformanceOptimization();
  
  // تحميل تدريجي للمكونات بناءً على رؤيتها في الشاشة
  const renderLazySection = (sectionId: string, Component: React.ComponentType<any>, priority = false) => {
    // إذا كانت الأجهزة منخفضة الأداء، نقوم دائمًا بتحميل بالتدريج
    const shouldLazyLoad = isLowPerformanceDevice || shouldUseLazyLoading;
    
    // تحمل بالتدريج فقط إذا كان معطى الـ shouldLazyLoad هو true وليس مكون ذو أولوية
    if (shouldLazyLoad && !priority) {
      // تحميل فقط إذا كان القسم مرئيًا
      if (sectionsVisible[sectionId]) {
        return (
          <ErrorBoundary fallback={<SectionError sectionId={sectionId} />}>
            <Suspense fallback={<SectionLoader />}>
              <Component />
            </Suspense>
          </ErrorBoundary>
        );
      }
      return <SectionLoader />;
    }
    
    // التحميل المباشر للمكونات ذات الأولوية أو عندما لا نحتاج للتحميل الكسول
    return (
      <ErrorBoundary fallback={<SectionError sectionId={sectionId} />}>
        <Suspense fallback={<SectionLoader />}>
          <Component />
        </Suspense>
      </ErrorBoundary>
    );
  };

  return (
    <main 
      id="main-content" 
      tabIndex={-1} 
      className={`relative overflow-hidden ${isTransitioning ? 'opacity-0 transition-opacity duration-300' : 'opacity-100 transition-opacity duration-300'}`}
      lang={language}
      dir={isRTL ? 'rtl' : 'ltr'}
      aria-live="polite"
    >
      <HeroSection />
      
      <div id="animated-cards-section" className="observe-section">
        {renderLazySection('animated-cards-section', AnimatedCards, true)}
      </div>
      
      <div id="ai-features-section" className="observe-section">
        {renderLazySection('ai-features-section', AIFeaturesSection)}
      </div>
      
      <div id="network-dashboard-section" className="observe-section">
        {renderLazySection('network-dashboard-section', NetworkDashboard)}
      </div>
      
      <div id="network-tools-section" className="observe-section">
        {renderLazySection('network-tools-section', NetworkToolsSection)}
      </div>
      
      <div id="settings-section" className="observe-section">
        {renderLazySection('settings-section', SettingsSection)}
      </div>
      
      <div id="cta-section" className="observe-section">
        {renderLazySection('cta-section', CTASection)}
      </div>
    </main>
  );
}

export default MainContent;
