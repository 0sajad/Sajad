
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

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [language, setLanguage] = useState<"ar" | "en">("ar");

  useEffect(() => {
    setLoaded(true);
    
    // التحقق من اللغة المحفوظة أو استخدام لغة المتصفح
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage === "en" || savedLanguage === "ar") {
      setLanguage(savedLanguage);
      document.documentElement.setAttribute("lang", savedLanguage);
      document.documentElement.setAttribute("dir", savedLanguage === "ar" ? "rtl" : "ltr");
      
      toast({
        title: savedLanguage === "ar" ? "تم تحميل إعدادات اللغة" : "Language settings loaded",
        description: savedLanguage === "ar" ? "تم تطبيق اللغة العربية" : "English language applied"
      });
    }
    
    const timeout = setTimeout(() => {
      setShowAIAssistant(true);
    }, 5000);
    
    return () => clearTimeout(timeout);
  }, []);

  const handleLanguageChange = (newLanguage: "ar" | "en") => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    document.documentElement.setAttribute("lang", newLanguage);
    document.documentElement.setAttribute("dir", newLanguage === "ar" ? "rtl" : "ltr");
    
    toast({
      title: newLanguage === "ar" ? "تم تغيير اللغة" : "Language Changed",
      description: newLanguage === "ar" ? "تم التحويل إلى اللغة العربية" : "Switched to English language"
    });
  };

  return (
    <div className={`min-h-screen w-full transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      <Header currentLanguage={language} onLanguageChange={handleLanguageChange} />
      
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
