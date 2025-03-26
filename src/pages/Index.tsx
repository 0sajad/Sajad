
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

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const { i18n, t } = useTranslation();
  const { isTransitioning } = useLanguageTransition();

  useEffect(() => {
    setLoaded(true);
    
    // التحقق من اللغة المحفوظة أو استخدام لغة المتصفح
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }
    
    const timeout = setTimeout(() => {
      setShowAIAssistant(true);
    }, 5000);
    
    return () => {
      clearTimeout(timeout);
    };
  }, [i18n]);

  return (
    <div className={`min-h-screen w-full transition-all duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${isTransitioning ? 'opacity-30 scale-95' : 'opacity-100 scale-100'}`}>
      <Header />
      
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
      
      <Footer />
      
      {/* Floating AI Assistant */}
      <FloatingAIAssistant 
        show={showAIAssistant} 
        onMaximize={() => window.location.href = '/ai'} 
      />
    </div>
  );
};

export default Index;
