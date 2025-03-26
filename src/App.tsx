
import React, { useEffect, useState, lazy, Suspense, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { ModeProvider } from "@/context/ModeContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";

// استخدام التحميل الكسول (Lazy Loading) لتسريع تحميل الصفحة الرئيسية
import { LoadingScreen } from "./components/LoadingScreen";

// تقسيم الرمز باستخدام تقنية تقسيم الرمز المتقدمة
// استخدام webpackPreload للتحميل المسبق للصفحات الرئيسية
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Index = lazy(() => import("./pages/Index"));
const AIAssistant = lazy(() => import(/* webpackPreload: true */ "./pages/AIAssistant"));
const Settings = lazy(() => import("./pages/Settings"));
const License = lazy(() => import("./pages/License"));
const FiberOptic = lazy(() => import("./pages/FiberOptic"));
const NotFound = lazy(() => import("./pages/NotFound"));
const HelpCenter = lazy(() => import("./pages/HelpCenter"));

// مكون محسن للتحميل داخل Suspense مع تأثيرات انتقالية سلسة
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen animate-fade-in">
    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";
  
  // استخدام useCallback لتحسين الأداء
  const completeLoading = useCallback(() => {
    setIsLoading(false);
  }, []);
  
  useEffect(() => {
    // استخدام أفضل الممارسات للتحميل السريع
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        // تحميل مسبق للصفحات الرئيسية في وقت الخمول
        import("./pages/Dashboard");
        import("./pages/AIAssistant");
      });
    }
    
    // تقليل وقت التحميل للتأكد من عرض المحتوى بسرعة أكبر
    const timer = setTimeout(completeLoading, 400); // تقليل وقت التحميل من 500 إلى 400 مللي ثانية
    
    return () => clearTimeout(timer);
  }, [completeLoading]);
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <ThemeProvider defaultTheme="system" storageKey="octa-gram-theme">
      <ModeProvider>
        <TooltipProvider>
          <div className={cn(
            "min-h-screen bg-background font-sans antialiased",
            isRTL ? "rtl" : "ltr"
          )}>
            <Router>
              <AnimatePresence mode="wait">
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/index" element={<Index />} />
                    <Route path="/ai" element={<AIAssistant />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/license" element={<License />} />
                    <Route path="/fiber-optic" element={<FiberOptic />} />
                    <Route path="/help-center" element={<HelpCenter />} />
                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<Navigate to="/404" replace />} />
                  </Routes>
                </Suspense>
              </AnimatePresence>
            </Router>
            <Toaster />
          </div>
        </TooltipProvider>
      </ModeProvider>
    </ThemeProvider>
  );
}

export default App;
