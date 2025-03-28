
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

// تحسين التحميل البطيء: استخدام التحميل البطيء للمكونات غير الأساسية مع تحميل مسبق
const NetworkDashboard = lazy(() => import("@/components/NetworkDashboard").then(m => ({ default: m.NetworkDashboard })));
const AnimatedCards = lazy(() => import("@/components/AnimatedCards").then(m => ({ default: m.AnimatedCards })));
const AIFeaturesSection = lazy(() => import("@/components/sections/AIFeaturesSection").then(m => ({ default: m.AIFeaturesSection })));
const SettingsSection = lazy(() => import("@/components/sections/SettingsSection").then(m => ({ default: m.SettingsSection })));
const CTASection = lazy(() => import("@/components/sections/CTASection").then(m => ({ default: m.CTASection })));
const FloatingAIAssistant = lazy(() => import("@/components/FloatingAIAssistant").then(m => ({ default: m.FloatingAIAssistant })));
const NetworkToolsSection = lazy(() => import("@/components/network/NetworkToolsSection").then(m => ({ default: m.NetworkToolsSection })));
const ReadingGuide = lazy(() => import("@/components/ui/accessibility/reading-guide").then(m => ({ default: m.ReadingGuide })));
const KeyboardNavigationMenu = lazy(() => import("@/components/ui/accessibility/keyboard-navigation-menu").then(m => ({ default: m.KeyboardNavigationMenu })));

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

/**
 * الصفحة الرئيسية للتطبيق
 * تضم جميع المكونات الرئيسية وتدير حالة تحميل الصفحة
 */
export default function Index() {
  const { t, i18n } = useTranslation();
  const { isTransitioning } = useLanguageTransition();
  const { 
    readingGuide, 
    keyboardNavigationVisible, 
    announce, 
    reducedMotion 
  } = useA11y();
  const [pageLoaded, setPageLoaded] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [sectionsVisible, setSectionsVisible] = useState<Record<string, boolean>>({});
  
  // استخدام الخطافات (hooks) اللازمة
  useKeyboardShortcuts();
  usePreferenceSync();
  
  // تحسين أداء التطبيق: التحميل التدريجي للمكونات
  useEffect(() => {
    // التحقق من حالة تحميل الصفحة
    if (document.readyState === 'complete') {
      setPageLoaded(true);
    } else {
      const handleLoad = () => setPageLoaded(true);
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
    
    // تحميل المكونات بشكل تدريجي
    const progressiveLoad = async () => {
      // التحميل المسبق للمكونات الأساسية
      if ('requestIdleCallback' in window) {
        // تحميل مسبق للموارد الهامة خلال وقت الخمول
        (window as any).requestIdleCallback(() => {
          import("@/components/AnimatedCards");
          import("@/components/sections/AIFeaturesSection");
        });
      }
    };
    
    progressiveLoad();
  }, []);
  
  // تحسين رصد ظهور العناصر باستخدام Intersection Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setSectionsVisible(prev => ({...prev, [sectionId]: true}));
          
          // إلغاء مراقبة القسم بعد ظهوره لتحسين الأداء
          sectionObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // إضافة معرّفات للأقسام ومراقبتها
    const sections = document.querySelectorAll('.observe-section');
    sections.forEach(section => {
      if (!section.id) {
        section.id = `section-${Math.random().toString(36).substr(2, 9)}`;
      }
      sectionObserver.observe(section);
    });
    
    return () => sectionObserver.disconnect();
  }, [pageLoaded]);
  
  // إظهار المساعد الذكي بعد فترة زمنية
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAIAssistant(true);
    }, reducedMotion ? 1000 : 3000); // وقت أقصر إذا كان وضع تقليل الحركة مفعلاً
    
    return () => clearTimeout(timeout);
  }, [reducedMotion]);
  
  // الإعلان عن اكتمال تحميل الصفحة
  useEffect(() => {
    if (pageLoaded) {
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
  
  // تحميل تدريجي للمكونات بناءً على رؤيتها في الشاشة
  const renderLazySections = (sectionId: string, Component: React.LazyExoticComponent<any>) => {
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
          lang={i18n.language}
          dir={i18n.language === 'ar' || i18n.language === 'ar-iq' ? 'rtl' : 'ltr'}
        >
          <HeroSection />
          
          <div id="animated-cards-section" className="observe-section">
            <Suspense fallback={<SectionLoader />}>
              <AnimatedCards />
            </Suspense>
          </div>
          
          <div id="ai-features-section" className="observe-section">
            <Suspense fallback={<SectionLoader />}>
              <AIFeaturesSection />
            </Suspense>
          </div>
          
          <div id="network-dashboard-section" className="observe-section">
            <Suspense fallback={<SectionLoader />}>
              <NetworkDashboard />
            </Suspense>
          </div>
          
          <div id="network-tools-section" className="observe-section">
            <Suspense fallback={<SectionLoader />}>
              <NetworkToolsSection />
            </Suspense>
          </div>
          
          <div id="settings-section" className="observe-section">
            <Suspense fallback={<SectionLoader />}>
              <SettingsSection />
            </Suspense>
          </div>
          
          <div id="cta-section" className="observe-section">
            <Suspense fallback={<SectionLoader />}>
              <CTASection />
            </Suspense>
          </div>
          
          <Suspense fallback={null}>
            <FloatingAIAssistant 
              show={showAIAssistant} 
              onMaximize={handleMaximizeAI} 
            />
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
