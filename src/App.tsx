
import React, { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { ModeProvider } from "@/context/ModeContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { GlobalErrorBoundary } from "./components/ui/error/GlobalErrorBoundary";
import { LiveAnnouncer } from "./components/ui/accessibility/LiveAnnouncer";
import { FallbackErrorPage } from "./components/error/FallbackErrorPage";
import { ErrorBoundary } from "./components/ui/error/ErrorBoundary";
import { LoadingScreen } from "./components/LoadingScreen";
import { i18n } from "./i18n";

// Pages
import Dashboard from "./pages/Dashboard";
import AIAssistant from "./pages/AIAssistant";
import Settings from "./pages/Settings";
import License from "./pages/License";
import FiberOptic from "./pages/FiberOptic";
import NotFound from "./pages/NotFound";
import HelpCenter from "./pages/HelpCenter";
import Index from "./pages/Index";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";
  
  useEffect(() => {
    // Make sure i18n is initialized
    if (!i18n.isInitialized) {
      console.warn("i18n not initialized, attempting to initialize now");
    }
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <GlobalErrorBoundary>
      <ThemeProvider defaultTheme="system" storageKey="octa-gram-theme">
        <ModeProvider>
          <TooltipProvider>
            <LiveAnnouncer />
            <div className={cn(
              "min-h-screen bg-background font-sans antialiased",
              isRTL ? "rtl" : "ltr"
            )}>
              <Router>
                <ErrorBoundary fallback={<FallbackErrorPage />} showDialog>
                  <AnimatePresence mode="wait">
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
                  </AnimatePresence>
                </ErrorBoundary>
              </Router>
              <Toaster />
            </div>
          </TooltipProvider>
        </ModeProvider>
      </ThemeProvider>
    </GlobalErrorBoundary>
  );
}

export default App;
