import React, { useEffect, lazy, Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useTranslation } from 'react-i18next';
import { useLanguageTransition } from "@/hooks/useLanguageTransition";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QuickAccessibilityButton } from "@/components/ui/QuickAccessibilityButton";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { usePreferenceSync } from "@/hooks/usePreferenceSync";
import { KeyboardFocusDetector } from "@/components/ui/accessibility/keyboard-focus-detector";
import { useA11yContext } from "@/hooks/accessibility/useA11yContext";
import { SkipLink } from "@/components/ui/accessibility/SkipLink";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { MobileA11yDrawer } from "@/components/ui/accessibility/mobile-a11y-drawer";
import { useRTLSupport } from "@/hooks/useRTLSupport";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";
import { useSectionVisibility } from "@/hooks/useSectionVisibility";
import { LazyLoad } from "@/components/ui/LazyLoad";
import { LazyApp } from "@/components/performance/LazyApp";
import { Skeleton } from "@/components/ui/skeleton";
import { MainContent } from "@/components/sections/MainContent";
import { A11yWrapper } from "@/components/ui/accessibility/A11yWrapper";
import { NetworkStatusIndicator } from "@/components/ui/NetworkStatusIndicator";
import { ArabicTextProvider } from "@/components/text/ArabicTextProvider";
import { ElectronDetector } from "@/components/ElectronDetector";

const AIAssistantManager = lazy(() => 
  import("@/components/ai/AIAssistantManager").then(module => ({ default: module.AIAssistantManager }))
);
const AccessibilityOverlay = lazy(() => 
  import("@/components/accessibility/AccessibilityOverlay").then(module => ({ 
    default: module.AccessibilityOverlay || module.default || (() => null)
  }))
);

/**
 * الصفحة الرئيسية للتطبيق
 * تم تحسينها لاستخدام المكونات والخطافات المحسنة
 */
export default function Index() {
  const { t, i18n } = useTranslation();
  const { isTransitioning } = useLanguageTransition();
  const { announce } = useA11yContext();
  const { isRTL } = useRTLSupport();
  const { sectionsVisible, pageLoaded, setPageLoaded } = useSectionVisibility();
  const { deviceTier, isLowPerformanceDevice } = usePerformanceOptimization();
  
  useKeyboardShortcuts();
  usePreferenceSync();
  
  useEffect(() => {
    if (pageLoaded && announce) {
      const announceTimeout = setTimeout(() => {
        const isArabic = i18n.language === 'ar' || i18n.language === 'ar-iq';
        const message = isArabic 
          ? 'تم تحميل الصفحة بنجاح، يمكنك استخدام زر تخطي إلى المحتوى للانتقال السريع'
          : 'Page loaded successfully. You can use the skip to content button for quick navigation';
        announce(message, 'polite');
      }, 1000);
      
      return () => clearTimeout(announceTimeout);
    }
  }, [pageLoaded, i18n.language, announce]);
  
  const handleMaximizeAI = () => {
    window.location.href = '/ai';
  };
  
  return (
    <A11yWrapper>
      <LazyApp>
        <ErrorBoundary>
          <ElectronDetector />
          <TooltipProvider>
            <Suspense fallback={null}>
              <AccessibilityOverlay />
            </Suspense>
            
            <SkipLink targetId="main-content" />
            
            <NetworkStatusIndicator />
            
            <Header />
            
            <LazyLoad priority={true} height="100vh">
              <Suspense fallback={
                <div className="min-h-[80vh] flex items-center justify-center">
                  <Skeleton className="h-[70vh] w-full max-w-4xl mx-auto rounded-lg" />
                </div>
              }>
                <MainContent 
                  sectionsVisible={sectionsVisible}
                  isTransitioning={isTransitioning}
                  language={i18n.language}
                  isRTL={isRTL}
                />
              </Suspense>
            </LazyLoad>
            
            <LazyLoad threshold={500}>
              <Suspense fallback={null}>
                <AIAssistantManager onMaximize={handleMaximizeAI} />
              </Suspense>
            </LazyLoad>
            
            <Footer />
            
            <QuickAccessibilityButton />
            <MobileA11yDrawer />
            
            <KeyboardFocusDetector />
          </TooltipProvider>
        </ErrorBoundary>
      </LazyApp>
    </A11yWrapper>
  );
}
