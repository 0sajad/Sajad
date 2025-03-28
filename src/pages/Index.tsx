
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

// تصحيح التحميل الكسول للمكونات مع دعم الصادرات المسماة
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
  
  // استخدام الخطافات (hooks) اللازمة
  useKeyboardShortcuts();
  usePreferenceSync();
  
  // الإعلان عن اكتمال تحميل الصفحة
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
  
  // التوجه إلى صفحة المساعد الذكي
  const handleMaximizeAI = () => {
    window.location.href = '/ai';
  };
  
  return (
    <A11yWrapper>
      <LazyApp>
        <ErrorBoundary>
          <TooltipProvider>
            {/* طبقة إمكانية الوصول: تتضمن مكونات الوصول المساعدة */}
            <Suspense fallback={null}>
              <AccessibilityOverlay />
            </Suspense>
            
            {/* رابط تخطي المحتوى - تم تحديث الاستدعاء ليتوافق مع الواجهة المحدثة */}
            <SkipLink targetId="main-content" />
            
            {/* مؤشر حالة الشبكة */}
            <NetworkStatusIndicator />
            
            {/* رأس الصفحة - تحميل أساسي بدون كسل */}
            <Header />
            
            {/* المحتوى الرئيسي - تحميل كسول مع أولوية */}
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
            
            {/* المساعد الذكي - تحميل كسول بأولوية منخفضة */}
            <LazyLoad threshold={500}>
              <Suspense fallback={null}>
                <AIAssistantManager onMaximize={handleMaximizeAI} />
              </Suspense>
            </LazyLoad>
            
            {/* تذييل الصفحة - تحميل أساسي بدون كسل */}
            <Footer />
            
            {/* أزرار إمكانية الوصول السريعة */}
            <QuickAccessibilityButton />
            <MobileA11yDrawer />
            
            {/* كاشف التركيز للوحة المفاتيح */}
            <KeyboardFocusDetector />
          </TooltipProvider>
        </ErrorBoundary>
      </LazyApp>
    </A11yWrapper>
  );
}
