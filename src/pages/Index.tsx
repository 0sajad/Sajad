
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

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  useEffect(() => {
    setLoaded(true);
    
    const timeout = setTimeout(() => {
      setShowAIAssistant(true);
    }, 5000);
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`min-h-screen w-full transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      <Header />
      
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
