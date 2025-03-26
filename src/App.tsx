
import React, { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { ModeProvider } from "@/context/ModeContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { useA11y } from "@/hooks/useA11y";
import { LiveAnnouncer } from "@/components/ui/accessibility/live-announcer";
import { LoadingScreen } from "./components/LoadingScreen";
import { SmartSuspense } from "@/components/ui/smart-suspense";

// استيراد المكونات بشكل كسول لتحسين أداء التحميل الأولي
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Index = lazy(() => import("./pages/Index"));
const AIAssistant = lazy(() => import("./pages/AIAssistant"));
const Settings = lazy(() => import("./pages/Settings"));
const License = lazy(() => import("./pages/License"));
const FiberOptic = lazy(() => import("./pages/FiberOptic"));
const NotFound = lazy(() => import("./pages/NotFound"));
const HelpCenter = lazy(() => import("./pages/HelpCenter"));
const AccessibilitySettings = lazy(() => import("./pages/AccessibilitySettings"));

// استيراد ملفات CSS لدعم التحسينات الجديدة
import "./components/ui/ui-effects.css";
import "./components/ui/dark-mode.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { i18n } = useTranslation();
  const { reducedMotion } = useA11y();
  const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";
  
  useEffect(() => {
    // تقليل وقت التحميل للتأكد من عرض المحتوى بسرعة أكبر
    if (reducedMotion) {
      // تقليل وقت التحميل إذا كان المستخدم يفضل تقليل الحركة
      setIsLoading(false);
    } else {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [reducedMotion]);
  
  // تطبيق الوضع عالي التباين إذا كان المستخدم يفضله
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: more)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.documentElement.classList.add('high-contrast');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
    };
    
    // تطبيق الإعداد الافتراضي
    if (mediaQuery.matches) {
      document.documentElement.classList.add('high-contrast');
    }
    
    // الاستماع للتغييرات
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <ThemeProvider defaultTheme="system" storageKey="octa-gram-theme" attribute="class">
      <ModeProvider>
        <TooltipProvider>
          <div className={cn(
            "min-h-screen bg-background font-sans antialiased",
            isRTL ? "rtl" : "ltr"
          )}>
            <Router>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route 
                    path="/" 
                    element={
                      <SmartSuspense fallback={<LoadingScreen showSpinner={true} />}>
                        <Index />
                      </SmartSuspense>
                    } 
                  />
                  <Route 
                    path="/dashboard" 
                    element={
                      <SmartSuspense fallback={<LoadingScreen showSpinner={true} />}>
                        <Dashboard />
                      </SmartSuspense>
                    } 
                  />
                  <Route 
                    path="/ai" 
                    element={
                      <SmartSuspense fallback={<LoadingScreen showSpinner={true} />}>
                        <AIAssistant />
                      </SmartSuspense>
                    } 
                  />
                  <Route 
                    path="/settings" 
                    element={
                      <SmartSuspense fallback={<LoadingScreen showSpinner={true} />}>
                        <Settings />
                      </SmartSuspense>
                    } 
                  />
                  <Route 
                    path="/settings/accessibility" 
                    element={
                      <SmartSuspense fallback={<LoadingScreen showSpinner={true} />}>
                        <AccessibilitySettings />
                      </SmartSuspense>
                    } 
                  />
                  <Route 
                    path="/license" 
                    element={
                      <SmartSuspense fallback={<LoadingScreen showSpinner={true} />}>
                        <License />
                      </SmartSuspense>
                    } 
                  />
                  <Route 
                    path="/fiber-optic" 
                    element={
                      <SmartSuspense fallback={<LoadingScreen showSpinner={true} />}>
                        <FiberOptic />
                      </SmartSuspense>
                    } 
                  />
                  <Route 
                    path="/help-center" 
                    element={
                      <SmartSuspense fallback={<LoadingScreen showSpinner={true} />}>
                        <HelpCenter />
                      </SmartSuspense>
                    } 
                  />
                  <Route 
                    path="/404" 
                    element={
                      <SmartSuspense fallback={<LoadingScreen showSpinner={true} />}>
                        <NotFound />
                      </SmartSuspense>
                    } 
                  />
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
              </AnimatePresence>
            </Router>
            <Toaster position="top-right" toastOptions={{ 
              duration: 5000,
              className: cn("rounded-lg shadow-lg", 
                reducedMotion ? "transition-none" : "transition-all duration-300",
                "glass-card") 
            }} />
            <LiveAnnouncer />
          </div>
        </TooltipProvider>
      </ModeProvider>
    </ThemeProvider>
  );
}

export default App;
