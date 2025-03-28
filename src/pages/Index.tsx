
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
const SpecificDateTimeDisplay = lazy(() => import("@/components/SpecificDateTimeDisplay").then(m => ({ default: m.SpecificDateTimeDisplay })));

// مكون التحميل للمكونات البطيئة
const SectionLoader = () => (
  <div className="w-full py-12">
    <div className="container mx-auto">
      <Skeleton className="w-full h-8 mb-4" />
      <Skeleton className="w-3/4 h-4 mb-2" />
      <Skeleton className="w-1/2 h-4 mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Skeleton className="w-full h-48 rounded-lg" />
        <Skeleton className="w-full h-48 rounded-lg" />
        <Skeleton className="w-full h-48 rounded-lg" />
      </div>
    </div>
  </div>
);

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const { i18n } = useTranslation();
  const { isTransitioning } = useLanguageTransition();
  const { reducedMotion, keyboardNavigationVisible } = useA11y();
  
  // استخدام الخطافات الضرورية
  useKeyboardShortcuts();
  usePreferenceSync();

  useEffect(() => {
    // تعيين الصفحة كمحملة
    setLoaded(true);
    
    // التأكد من تطبيق اللغة المخزنة
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }
    
    // تطبيق الاتجاه المناسب (RTL أو LTR)
    const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";
    document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
    if (isRTL) {
      document.body.classList.add('rtl-active');
    } else {
      document.body.classList.remove('rtl-active');
    }
    
    // تعيين مهلة لإظهار المساعد الذكي
    const timeout = setTimeout(() => {
      setShowAIAssistant(true);
    }, 5000);
    
    // دالة للتعامل مع تغيير اللغة الكامل
    const handleLanguageFullChange = () => {
      const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";
      document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
      if (isRTL) {
        document.body.classList.add('rtl-active');
      } else {
        document.body.classList.remove('rtl-active');
      }
    };
    
    // إضافة مستمع الحدث
    document.addEventListener('languageFullyChanged', handleLanguageFullChange);
    
    // تنظيف عند إزالة المكون
    return () => {
      clearTimeout(timeout);
      document.removeEventListener('languageFullyChanged', handleLanguageFullChange);
    };
  }, [i18n]);

  return (
    <ErrorBoundary>
      <TooltipProvider>
        <div 
          className={`min-h-screen w-full transition-all ${reducedMotion ? 'transition-none' : 'duration-500'} ${loaded ? 'opacity-100' : 'opacity-0'} ${isTransitioning ? 'opacity-30 scale-95' : 'opacity-100 scale-100'}`}
          role="application"
        >
          <SkipLink />
          
          <Header />
          
          <main id="main-content" tabIndex={-1}>
            <HeroSection />
            
            <Suspense fallback={<SectionLoader />}>
              <SpecificDateTimeDisplay />
            </Suspense>
            
            <Suspense fallback={<SectionLoader />}>
              <NetworkDashboard />
            </Suspense>
            
            <Suspense fallback={<SectionLoader />}>
              <NetworkToolsSection />
            </Suspense>
            
            <Suspense fallback={<SectionLoader />}>
              <AnimatedCards />
            </Suspense>
            
            <Suspense fallback={<SectionLoader />}>
              <AIFeaturesSection />
            </Suspense>
            
            <Suspense fallback={<SectionLoader />}>
              <SettingsSection />
            </Suspense>
            
            <Suspense fallback={<SectionLoader />}>
              <CTASection />
            </Suspense>
          </main>
          
          <Footer />
          
          <Suspense fallback={null}>
            {showAIAssistant && (
              <FloatingAIAssistant 
                show={showAIAssistant} 
                onMaximize={() => window.location.href = '/ai'} 
              />
            )}
          </Suspense>
          
          <QuickAccessibilityButton />

          <Suspense fallback={null}>
            <ReadingGuide />
          </Suspense>
          
          <Suspense fallback={null}>
            <KeyboardNavigationMenu visible={keyboardNavigationVisible} />
          </Suspense>
          
          <KeyboardFocusDetector />
          <LiveAnnouncer />
        </div>
      </TooltipProvider>
    </ErrorBoundary>
  );
};

export default Index;
