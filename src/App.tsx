
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { ModeProvider } from "@/context/ModeContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";

// Pages
import Dashboard from "./pages/Dashboard";
import AIAssistant from "./pages/AIAssistant";
import Settings from "./pages/Settings";
import License from "./pages/License";
import FiberOptic from "./pages/FiberOptic";
import NotFound from "./pages/NotFound";
import HelpCenter from "./pages/HelpCenter";

// Components
import { LoadingScreen } from "./components/LoadingScreen";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { i18n } = useTranslation();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
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
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/ai" element={<AIAssistant />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/license" element={<License />} />
                  <Route path="/fiber-optic" element={<FiberOptic />} />
                  <Route path="/help-center" element={<HelpCenter />} />
                  <Route path="/404" element={<NotFound />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
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
