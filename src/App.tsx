
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

// تحسين استدعاء المكونات باستخدام التنويع الصحيح للـ lazy loading
const Dashboard = lazy(() => import("./pages/Dashboard").catch(() => {
  console.error("Error loading Dashboard component");
  return import("./pages/NotFound");
}));
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

// تحسين مكون الخطأ العام
const ErrorFallback = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-6">
    <h2 className="text-2xl font-bold mb-4">حدث خطأ غير متوقع</h2>
    <p className="mb-4">نأسف لهذا الخطأ، يرجى تحديث الصفحة أو العودة للصفحة الرئيسية.</p>
    <button 
      onClick={() => window.location.href = "/"} 
      className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
    >
      العودة للصفحة الرئيسية
    </button>
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
        Promise.all([
          import("./pages/Dashboard"),
          import("./pages/AIAssistant")
        ]).catch(err => {
          console.error("Error preloading components:", err);
        });
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
