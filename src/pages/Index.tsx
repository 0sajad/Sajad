
import React, { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useTranslation } from 'react-i18next';
import { useLanguageTransition } from "@/hooks/useLanguageTransition";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QuickAccessibilityButton } from "@/components/ui/QuickAccessibilityButton";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { usePreferenceSync } from "@/hooks/usePreferenceSync";
import { KeyboardFocusDetector } from "@/components/ui/accessibility/keyboard-focus-detector";
import { useA11y } from "@/hooks/useA11y";
import { SkipLink } from "@/components/ui/accessibility/SkipLink";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { MobileA11yDrawer } from "@/components/ui/accessibility/mobile-a11y-drawer";
import { useRTLSupport } from "@/hooks/useRTLSupport";
import { MainContent } from "@/components/sections/MainContent";
import { AccessibilityOverlay } from "@/components/accessibility/AccessibilityOverlay";
import { useSectionVisibility } from "@/hooks/useSectionVisibility";
import { AIAssistantManager } from "@/components/ai/AIAssistantManager";

/**
 * الصفحة الرئيسية للتطبيق
 * تضم جميع المكونات الرئيسية وتدير حالة تحميل الصفحة
 */
export default function Index() {
  const { t, i18n } = useTranslation();
  const { isTransitioning } = useLanguageTransition();
  const { announce } = useA11y();
  const { isRTL } = useRTLSupport();
  const { sectionsVisible, pageLoaded, setPageLoaded } = useSectionVisibility();
  
  // استخدام الخطافات (hooks) اللازمة
  useKeyboardShortcuts();
  usePreferenceSync();
  
  // الإعلان عن اكتمال تحميل الصفحة - but only once
  useEffect(() => {
    if (pageLoaded && announce) {
      // Use a ref or some other mechanism to ensure this only runs once
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
    <ErrorBoundary>
      <TooltipProvider>
        {/* طبقة إمكانية الوصول: تتضمن مكونات الوصول المساعدة */}
        <AccessibilityOverlay />
        
        {/* رأس الصفحة */}
        <Header />
        
        {/* المحتوى الرئيسي */}
        <MainContent 
          sectionsVisible={sectionsVisible}
          isTransitioning={isTransitioning}
          language={i18n.language}
          isRTL={isRTL}
        />
        
        {/* المساعد الذكي */}
        <AIAssistantManager onMaximize={handleMaximizeAI} />
        
        {/* تذييل الصفحة */}
        <Footer />
        
        {/* أزرار إمكانية الوصول السريعة */}
        <QuickAccessibilityButton />
        <MobileA11yDrawer />
      </TooltipProvider>
    </ErrorBoundary>
  );
}
