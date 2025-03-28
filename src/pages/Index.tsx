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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NetworkQualityGauge } from "@/components/analytics/NetworkQualityGauge";
import { RealTimeMonitoring } from "@/components/analytics/RealTimeMonitoring";

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const { i18n, t } = useTranslation();
  const { isTransitioning } = useLanguageTransition();
  const { reducedMotion } = useA11y();
  const isRTL = i18n.dir() === "rtl";
  
  // Use the hooks
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
          {/* Hero Section */}
          <HeroSection />
          
          <div className="container mx-auto px-4 py-4">
            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Latest Updates Card */}
              <Card className="border-l-4 border-l-purple-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex justify-between items-center">
                    <span>{isRTL ? "آخر التحديثات" : "Latest Updates"}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded-md">
                      <span className="text-sm text-blue-600">{isRTL ? "تحديث أمني متاح" : "Security update available"}</span>
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded-md">
                      <span className="text-sm text-green-600">{isRTL ? "تم تحسين الأداء" : "Performance optimized"}</span>
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions Card */}
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex justify-between items-center">
                    <span>{isRTL ? "إجراءات سريعة" : "Quick Actions"}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={isRTL ? "اختر إجراء" : "Select action"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="scan">{isRTL ? "فحص الشبكة" : "Scan Network"}</SelectItem>
                        <SelectItem value="optimize">{isRTL ? "تحسين الأداء" : "Optimize Performance"}</SelectItem>
                        <SelectItem value="backup">{isRTL ? "نسخ احتياطي" : "Backup"}</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex justify-between">
                      <Button variant="outline" className="px-4 py-2 w-[48%]">
                        {isRTL ? "جدولة" : "Schedule"}
                      </Button>
                      <Button className="px-4 py-2 bg-primary text-white w-[48%]">
                        {isRTL ? "تنفيذ" : "Execute"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* System Status Card */}
              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex justify-between items-center">
                    <span>{isRTL ? "حالة النظام" : "System Status"}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{isRTL ? "الحالة" : "Status"}:</span>
                      <Badge className="bg-green-500">{isRTL ? "نشط" : "Active"}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">{isRTL ? "آخر فحص" : "Last Check"}:</span>
                      <span className="text-sm font-medium">
                        {isRTL ? "منذ 2 دقائق" : "2 minutes ago"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">{isRTL ? "مستوى الاستقرار" : "Uptime"}:</span>
                      <span className="text-sm font-medium">99.9%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Network Monitoring Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Real-time Network Monitoring */}
              <Card className="md:col-span-1 overflow-hidden">
                <CardContent className="p-4">
                  <RealTimeMonitoring />
                </CardContent>
              </Card>

              {/* Network Quality Gauge */}
              <Card className="md:col-span-1 overflow-hidden">
                <CardContent className="p-4">
                  <NetworkQualityGauge 
                    qualityScore={87} 
                    latency={24} 
                    packetLoss={0.5} 
                    jitter={1.2}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Other Sections */}
          <NetworkToolsSection />
          <AnimatedCards />
          <AIFeaturesSection />
          <SettingsSection />
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

        {/* Accessibility Components */}
        <ReadingGuide />
        <KeyboardNavigationMenu />
        <KeyboardFocusDetector />
        <LiveAnnouncer />
      </div>
    </TooltipProvider>
  );
};

export default Index;
