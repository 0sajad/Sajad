
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
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from 'react-i18next';

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    setLoaded(true);
    
    // التحقق من اللغة المحفوظة أو استخدام لغة المتصفح
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage === "en" || savedLanguage === "ar") {
      i18n.changeLanguage(savedLanguage);
      document.documentElement.setAttribute("lang", savedLanguage);
      document.documentElement.setAttribute("dir", savedLanguage === "ar" ? "rtl" : "ltr");
    }
    
    const timeout = setTimeout(() => {
      setShowAIAssistant(true);
    }, 5000);
    
    return () => clearTimeout(timeout);
  }, [i18n]);

  const handleLanguageChange = (newLanguage: "ar" | "en") => {
    localStorage.setItem("language", newLanguage);
    
    toast({
      title: newLanguage === "ar" ? "تم تغيير اللغة" : "Language Changed",
      description: newLanguage === "ar" ? "تم التحويل إلى اللغة العربية" : "Switched to English language"
    });
  };

  return (
    <div className={`min-h-screen w-full transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      <Header onLanguageChange={handleLanguageChange} />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Network Dashboard Section */}
      <NetworkDashboard />
      
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
