
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
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
      const isRTL = savedLanguage === "ar" || savedLanguage === "ar-iq";
      document.documentElement.setAttribute("lang", savedLanguage);
      document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
    }
    
    const timeout = setTimeout(() => {
      setShowAIAssistant(true);
    }, 5000);
    
    return () => clearTimeout(timeout);
  }, [i18n]);

  const handleLanguageChange = (language: string) => {
    localStorage.setItem("language", language);
    
    toast({
      title: language === "ar" ? "تم تغيير اللغة" : language === "ar-iq" ? "تم تغيير اللغة" : 
             language === "ja" ? "言語が変更されました" : language === "zh" ? "语言已更改" : 
             language === "fr" ? "Langue modifiée" : "Language Changed",
      description: language === "ar" ? "تم التحويل إلى اللغة العربية" : 
                  language === "ar-iq" ? "تم التحويل إلى اللهجة العراقية" : 
                  language === "en" ? "Switched to English language" : 
                  language === "ja" ? "日本語に切り替えました" : 
                  language === "zh" ? "切换到中文" : 
                  "Passé à la langue française"
    });
  };

  return (
    <div className={`min-h-screen w-full transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      <Header onLanguageChange={handleLanguageChange} />
      
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
