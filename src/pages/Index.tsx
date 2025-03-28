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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NetworkQualityGauge } from "@/components/analytics/NetworkQualityGauge";
import { RealTimeMonitoring } from "@/components/analytics/RealTimeMonitoring";
import { ArrowDown, ArrowUp, Zap } from "lucide-react";

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
          <div className="container mx-auto px-4 py-4 mt-8">
            {/* Status Cards - Top Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Latest Updates Card */}
              <Card className="overflow-hidden border-l-4 border-l-purple-500 rounded-lg">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Latest Updates</h3>
                    <div className="text-purple-500">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
                      <span className="text-blue-600">Security update available</span>
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-md">
                      <span className="text-green-600">Performance optimized</span>
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions Card */}
              <Card className="overflow-hidden border-l-4 border-l-blue-500 rounded-lg">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Quick Actions</h3>
                    <div className="text-blue-500">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 8V12M12 16V16.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Select>
                      <SelectTrigger className="w-full rounded-md">
                        <SelectValue placeholder="Select action" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="scan">Scan Network</SelectItem>
                        <SelectItem value="optimize">Optimize Performance</SelectItem>
                        <SelectItem value="backup">Backup</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex justify-between">
                      <Button variant="outline" className="px-4 py-2 w-[48%] rounded-md">
                        Schedule
                      </Button>
                      <Button className="px-4 py-2 w-[48%] bg-blue-600 hover:bg-blue-700 rounded-md">
                        Execute
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* System Status Card */}
              <Card className="overflow-hidden border-l-4 border-l-green-500 rounded-lg">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">System Status</h3>
                    <div className="text-green-500">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Status:</span>
                      <Badge className="bg-green-500 hover:bg-green-600 rounded-full">Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Check:</span>
                      <span className="font-medium">2 minutes ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Uptime:</span>
                      <span className="font-medium">99.9%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Network Monitoring Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Real-time Network Monitoring */}
              <Card className="md:col-span-1 overflow-hidden shadow-sm rounded-xl bg-slate-100/50">
                <CardContent className="p-0">
                  <div className="p-4 flex flex-col">
                    <div className="flex justify-between items-center">
                      <div className="text-right">
                        <h2 className="text-xl font-semibold text-blue-800 mb-1 flex items-center">
                          <svg className="inline-block mr-2 text-blue-500" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 12H19M22 16H19M22 8H19M6 16V8C6 5.79086 7.79086 4 10 4H12M14 18H7C6.44772 18 6 18.4477 6 19C6 19.5523 6.44772 20 7 20H14M14 18C14 18.5523 14.4477 19 15 19C15.5523 19 16 18.5523 16 19V20M14 18V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          مراقبة الشبكة في الوقت الفعلي
                        </h2>
                        <p className="text-sm text-gray-500">قياس سرعة ومستوى أداء الشبكة بشكل مباشر</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-9 px-2 bg-white hover:bg-gray-50"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21.8884 13.5C21.6097 16.3113 19.8877 18.8056 17.2705 20.0691C14.6532 21.3325 11.5987 21.2116 9.09563 19.7498C6.59259 18.288 4.87833 15.6623 4.4973 12.6889C4.11626 9.71552 5.0994 6.76508 7.16016 4.70433C9.22091 2.64357 12.1714 1.66043 15.1447 2.04147C18.1181 2.4225 20.7438 4.13677 22.2056 6.6398C23.0963 8.14536 23.5266 9.85617 23.5 11.5882" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M21.5 2.5V7.5H16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="mr-2">تحديث</span>
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 my-6">
                      <div className="bg-yellow-50 rounded-lg p-4 flex flex-col items-center justify-center">
                        <span className="text-sm text-gray-600 mb-1">زمن الاستجابة</span>
                        <div className="flex items-center text-2xl font-bold">
                          <Zap className="text-yellow-500 h-5 w-5 ml-2" />
                          <span className="text-gray-800 rtl:flex rtl:flex-row-reverse">ms 21</span>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center justify-center">
                        <span className="text-sm text-gray-600 mb-1">سرعة الرفع</span>
                        <div className="flex items-center text-2xl font-bold">
                          <ArrowUp className="text-green-500 h-5 w-5 ml-2" />
                          <span className="text-gray-800 rtl:flex rtl:flex-row-reverse">Mbps 32</span>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center justify-center">
                        <span className="text-sm text-gray-600 mb-1">سرعة التنزيل</span>
                        <div className="flex items-center text-2xl font-bold">
                          <ArrowDown className="text-blue-500 h-5 w-5 ml-2" />
                          <span className="text-gray-800 rtl:flex rtl:flex-row-reverse">Mbps 122</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right mb-2">
                      <span className="text-gray-700 font-medium">سرعة التنزيل والرفع</span>
                    </div>
                    
                    {/* Placeholder for charts that will be replaced by RealTimeMonitoring component */}
                    <div className="h-[280px] bg-slate-50 rounded-lg overflow-hidden">
                      {/* Will be implemented in RealTimeMonitoring.tsx */}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Network Quality Gauge */}
              <Card className="md:col-span-1 overflow-hidden shadow-sm rounded-xl bg-slate-100/50">
                <CardContent className="p-0">
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
