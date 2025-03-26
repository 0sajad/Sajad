
import React, { useState, useEffect, lazy, Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { NetworkDashboard } from "@/components/NetworkDashboard";
import { AnimatedCards } from "@/components/AnimatedCards";
import { AIFeaturesSection } from "@/components/sections/AIFeaturesSection";
import { SettingsSection } from "@/components/sections/SettingsSection";
import { CTASection } from "@/components/sections/CTASection";
import { FloatingAIAssistant } from "@/components/FloatingAIAssistant";
import { NetworkToolsSection } from "@/components/network/NetworkToolsSection";
import { useTranslation } from 'react-i18next';
import { useLanguageTransition } from "@/hooks/useLanguageTransition";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QuickAccessibilityButton } from "@/components/ui/QuickAccessibilityButton";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { usePreferenceSync } from "@/hooks/usePreferenceSync";
import { KeyboardNavigationMenu } from "@/components/ui/accessibility/keyboard-navigation-menu";
import { ReadingGuide } from "@/components/ui/accessibility/reading-guide";
import { KeyboardFocusDetector } from "@/components/ui/accessibility/keyboard-focus-detector";
import { LiveAnnouncer } from "@/components/ui/accessibility/live-announcer";
import { useA11y } from "@/hooks/useA11y";
import { useAccessibilityAnnouncer } from "@/hooks/useAccessibilityAnnouncer";
import { SmartSuspense } from "@/components/ui/smart-suspense";
import { CardSkeleton } from "@/components/ui/skeleton";
import { useAppPerformance } from "@/hooks/useAppPerformance";
import { motion, AnimatePresence } from "framer-motion";

// استيراد المكونات بشكل كسول لتحسين أداء التحميل الأولي
const NetworkMonitoring = lazy(() => import("@/components/network/NetworkMonitoring").then(module => ({ default: module.NetworkMonitoring })));
const DeveloperPanel = lazy(() => import("@/components/developer/DeveloperPanel").then(module => ({ default: module.DeveloperPanel })));

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const { i18n } = useTranslation();
  const { isTransitioning } = useLanguageTransition();
  const { reducedMotion } = useA11y();
  const { announce } = useAccessibilityAnnouncer();
  const { metrics } = useAppPerformance();
  
  // استخدام الهوكات الجديدة
  useKeyboardShortcuts();
  usePreferenceSync();

  useEffect(() => {
    setLoaded(true);
    
    // التحقق من اللغة المحفوظة أو استخدام لغة المتصفح
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }
    
    // التحقق من اتجاه اللغة وتطبيقه
    const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";
    document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
    if (isRTL) {
      document.body.classList.add('rtl-active');
    } else {
      document.body.classList.remove('rtl-active');
    }
    
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
    
    // الاستماع لحدث تغيير اللغة
    const handleLanguageFullChange = () => {
      // إعادة تطبيق الاتجاه
      const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";
      document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
      if (isRTL) {
        document.body.classList.add('rtl-active');
      } else {
        document.body.classList.remove('rtl-active');
      }
      
      announce(`تم تغيير اللغة إلى ${isRTL ? 'العربية' : 'English'}`, "info");
    };
    
    document.addEventListener('languageFullyChanged', handleLanguageFullChange);
    
    return () => {
      clearTimeout(timeout);
      document.removeEventListener('languageFullyChanged', handleLanguageFullChange);
    };
  }, [i18n, announce, metrics]);

  return (
    <TooltipProvider>
      <AnimatePresence mode="wait">
        <motion.div 
          className={`min-h-screen w-full transition-all ${reducedMotion ? 'transition-none' : 'duration-500'} ${loaded ? 'opacity-100' : 'opacity-0'} ${isTransitioning ? 'opacity-30 scale-95' : 'opacity-100 scale-100'}`}
          role="application"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reducedMotion ? 0.1 : 0.5 }}
        >
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-white focus:text-black focus:shadow-lg rounded"
          >
            تخطي إلى المحتوى الرئيسي
          </a>
          
          <Header />
          
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
          
          <Footer />
          
          {/* Floating AI Assistant */}
          <FloatingAIAssistant 
            show={showAIAssistant} 
            onMaximize={() => window.location.href = '/ai'} 
          />
          
          {/* Accessibility and Theme Controls */}
          <div className="fixed bottom-4 left-4 z-50 md:bottom-6 md:left-6 rtl:left-auto rtl:right-4 rtl:md:right-6 flex flex-col gap-3">
            <QuickAccessibilityButton />
            <ThemeToggle />
          </div>

          {/* Accessibility Components */}
          <ReadingGuide />
          <KeyboardNavigationMenu />
          <KeyboardFocusDetector />
          <LiveAnnouncer />
        </motion.div>
      </AnimatePresence>
    </TooltipProvider>
  );
};

export default Index;
