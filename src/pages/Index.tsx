
import React, { useState, useEffect } from "react";
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
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { usePreferenceSync } from "@/hooks/usePreferenceSync";

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const { i18n } = useTranslation();
  const { isTransitioning } = useLanguageTransition();
  
  // Use the new hooks
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
    
    // عرض مساعد الذكاء الاصطناعي بعد فترة
    const timeout = setTimeout(() => {
      setShowAIAssistant(true);
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
    };
    
    document.addEventListener('languageFullyChanged', handleLanguageFullChange);
    
    return () => {
      clearTimeout(timeout);
      document.removeEventListener('languageFullyChanged', handleLanguageFullChange);
    };
  }, [i18n]);

  return (
    <TooltipProvider>
      <div 
        className={`min-h-screen w-full transition-all duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${isTransitioning ? 'opacity-30 scale-95' : 'opacity-100 scale-100'}`}
        role="application"
      >
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-white focus:text-black focus:shadow-lg rounded"
        >
          Skip to main content
        </a>
        
        <Header />
        
        <main id="main-content" tabIndex={-1}>
          {/* Hero Section */}
          <HeroSection />
          
          {/* Network Dashboard Section */}
          <NetworkDashboard />
          
          {/* Network Tools Section */}
          <NetworkToolsSection />
          
          {/* Features Section */}
          <AnimatedCards />
          
          {/* AI Features Section */}
          <AIFeaturesSection />
          
          {/* Settings Section */}
          <SettingsSection />
          
          {/* CTA Section */}
          <CTASection />
        </main>
        
        <Footer />
        
        {/* Floating AI Assistant */}
        <FloatingAIAssistant 
          show={showAIAssistant} 
          onMaximize={() => window.location.href = '/ai'} 
        />
        
        {/* Accessibility Controls */}
        <QuickAccessibilityButton />
      </div>
    </TooltipProvider>
  );
};

export default Index;
