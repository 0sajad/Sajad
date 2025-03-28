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
import { KeyboardNavigationMenu } from "@/components/ui/accessibility/keyboard-navigation-menu";
import { ReadingGuide } from "@/components/ui/accessibility/reading-guide";
import { KeyboardFocusDetector } from "@/components/ui/accessibility/keyboard-focus-detector";
import { LiveAnnouncer } from "@/components/ui/accessibility/live-announcer";
import { useA11y } from "@/hooks/useA11y";
import { SpecificDateTimeDisplay } from "@/components/SpecificDateTimeDisplay";

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const { i18n } = useTranslation();
  const { isTransitioning } = useLanguageTransition();
  const { reducedMotion } = useA11y();
  
  useKeyboardShortcuts();
  usePreferenceSync();

  useEffect(() => {
    setLoaded(true);
    
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }
    
    const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";
    document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
    if (isRTL) {
      document.body.classList.add('rtl-active');
    } else {
      document.body.classList.remove('rtl-active');
    }
    
    const timeout = setTimeout(() => {
      setShowAIAssistant(true);
    }, 5000);
    
    const handleLanguageFullChange = () => {
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
        className={`min-h-screen w-full transition-all ${reducedMotion ? 'transition-none' : 'duration-500'} ${loaded ? 'opacity-100' : 'opacity-0'} ${isTransitioning ? 'opacity-30 scale-95' : 'opacity-100 scale-100'}`}
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
          <HeroSection />
          
          <SpecificDateTimeDisplay />
          
          <NetworkDashboard />
          
          <NetworkToolsSection />
          
          <AnimatedCards />
          
          <AIFeaturesSection />
          
          <SettingsSection />
          
          <CTASection />
        </main>
        
        <Footer />
        
        <FloatingAIAssistant 
          show={showAIAssistant} 
          onMaximize={() => window.location.href = '/ai'} 
        />
        
        <QuickAccessibilityButton />

        <ReadingGuide />
        <KeyboardNavigationMenu />
        <KeyboardFocusDetector />
        <LiveAnnouncer />
      </div>
    </TooltipProvider>
  );
};

export default Index;
