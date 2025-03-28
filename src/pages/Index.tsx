
import React, { useState, useEffect, lazy, Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { useTranslation } from 'react-i18next';
import { useLanguageTransition } from "@/hooks/useLanguageTransition";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QuickAccessibilityButton } from "@/components/ui/QuickAccessibilityButton";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { usePreferenceSync } from "@/hooks/usePreferenceSync";
import { KeyboardFocusDetector } from "@/components/ui/accessibility/keyboard-focus-detector";
import { LiveAnnouncer } from "@/components/ui/accessibility/live-announcer";
import { useA11y } from "@/hooks/useA11y";
import { SkipLink } from "@/components/ui/accessibility/SkipLink";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { ScreenReaderAnnouncer } from "@/components/ui/accessibility/screen-reader-announcer";
import { MobileA11yDrawer } from "@/components/ui/accessibility/mobile-a11y-drawer";

// استخدام التحميل البطيء للمكونات غير الأساسية لتسريع تحميل الصفحة الأولية
const NetworkDashboard = lazy(() => import("@/components/NetworkDashboard").then(m => ({ default: m.NetworkDashboard })));
const AnimatedCards = lazy(() => import("@/components/AnimatedCards").then(m => ({ default: m.AnimatedCards })));
const AIFeaturesSection = lazy(() => import("@/components/sections/AIFeaturesSection").then(m => ({ default: m.AIFeaturesSection })));
const SettingsSection = lazy(() => import("@/components/sections/SettingsSection").then(m => ({ default: m.SettingsSection })));
const CTASection = lazy(() => import("@/components/sections/CTASection").then(m => ({ default: m.CTASection })));
const FloatingAIAssistant = lazy(() => import("@/components/FloatingAIAssistant").then(m => ({ default: m.FloatingAIAssistant })));
const NetworkToolsSection = lazy(() => import("@/components/network/NetworkToolsSection").then(m => ({ default: m.NetworkToolsSection })));
const ReadingGuide = lazy(() => import("@/components/ui/accessibility/reading-guide").then(m => ({ default: m.ReadingGuide })));
const KeyboardNavigationMenu = lazy(() => import("@/components/ui/accessibility/keyboard-navigation-menu").then(m => ({ default: m.KeyboardNavigationMenu })));

// مكون التحميل للمكونات البطيئة
const SectionLoader = () => (
  <div className="w-full py-12">
    <div className="container mx-auto">
      <Skeleton className="w-full h-8 mb-4" />
      <Skeleton className="w-3/4 h-4 mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <Skeleton key={i} className="h-64 rounded-lg" />
        ))}
      </div>
    </div>
  </div>
);

export default function Index() {
  const { t, i18n } = useTranslation();
  const { isTransitioning } = useLanguageTransition();
  const { readingGuide, keyboardNavigationVisible, announce } = useA11y();
  const [pageLoaded, setPageLoaded] = useState(false);
  useKeyboardShortcuts();
  usePreferenceSync();
  
  useEffect(() => {
    // التحقق من وجود علامة التحميل
    if (document.readyState === 'complete') {
      setPageLoaded(true);
    } else {
      const handleLoad = () => setPageLoaded(true);
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);
  
  // الإعلان عن اكتمال تحميل الصفحة
  useEffect(() => {
    if (pageLoaded) {
      setTimeout(() => {
        const isArabic = i18n.language === 'ar' || i18n.language === 'ar-iq';
        const message = isArabic 
          ? 'تم تحميل الصفحة بنجاح، يمكنك استخدام زر تخطي إلى المحتوى للانتقال السريع'
          : 'Page loaded successfully. You can use the skip to content button for quick navigation';
        announce(message, 'polite');
      }, 1000);
    }
  }, [pageLoaded, i18n.language, announce]);
  
  return (
    <ErrorBoundary>
      <TooltipProvider>
        {/* مكونات قارئ الشاشة والتنقل بلوحة المفاتيح */}
        <LiveAnnouncer />
        <ScreenReaderAnnouncer />
        <KeyboardFocusDetector />
        <SkipLink />
        
        {/* إضافة مكون دليل القراءة إذا كان مفعلاً */}
        {readingGuide && (
          <Suspense fallback={null}>
            <ReadingGuide />
          </Suspense>
        )}
        
        {/* إضافة قائمة التنقل بلوحة المفاتيح إذا كانت مرئية */}
        {keyboardNavigationVisible && (
          <Suspense fallback={null}>
            <KeyboardNavigationMenu visible={keyboardNavigationVisible} />
          </Suspense>
        )}
        
        {/* رأس الصفحة */}
        <Header />
        
        {/* المحتوى الرئيسي */}
        <main 
          id="main-content" 
          tabIndex={-1} 
          className={`relative overflow-hidden ${isTransitioning ? 'opacity-0 transition-opacity duration-300' : 'opacity-100 transition-opacity duration-300'}`}
        >
          <HeroSection />
          
          <Suspense fallback={<SectionLoader />}>
            <AnimatedCards />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <AIFeaturesSection />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <NetworkDashboard />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <NetworkToolsSection />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <SettingsSection />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <CTASection />
          </Suspense>
          
          <Suspense fallback={null}>
            <FloatingAIAssistant />
          </Suspense>
        </main>
        
        {/* تذييل الصفحة */}
        <Footer />
        
        {/* أزرار إمكانية الوصول السريعة */}
        <QuickAccessibilityButton />
        <MobileA11yDrawer />
      </TooltipProvider>
    </ErrorBoundary>
  );
}
