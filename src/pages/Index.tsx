
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
import { TranslationDebugger } from "@/components/dev/TranslationDebugger";
import { useMode } from "@/context/ModeContext";

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const { i18n, t } = useTranslation();
  const { isTransitioning } = useLanguageTransition();
  const { reducedMotion } = useA11y();
  const { isDeveloperMode } = useMode();
  
  // استخدام الهوكس الجديدة
  useKeyboardShortcuts();
  usePreferenceSync();
  
  // التحكم في وقت عرض مساعد الذكاء الاصطناعي
  const aiAssistantDelay = 3000; // تقليل وقت الانتظار قبل ظهور المساعد

  useEffect(() => {
    setLoaded(true);
    
    // التحقق من اللغة المحفوظة أو استخدام لغة المتصفح
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    } else if (!savedLanguage) {
      // استخدام لغة المتصفح كلغة افتراضية
      const browserLang = navigator.language.startsWith('ar') ? 'ar' : navigator.language;
      
      // التحقق مما إذا كانت اللغة مدعومة
      const supportedLanguages = ['ar', 'en', 'fr', 'ar-iq', 'ja', 'zh'];
      const defaultLang = supportedLanguages.includes(browserLang) ? browserLang : 'en';
      
      if (defaultLang !== i18n.language) {
        i18n.changeLanguage(defaultLang);
      }
    }
    
    // التحقق من اتجاه اللغة وتطبيقه
    const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";
    document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", i18n.language);
    
    if (isRTL) {
      document.body.classList.add('rtl-active');
    } else {
      document.body.classList.remove('rtl-active');
    }
    
    // إعلان تحميل الصفحة للقارئات
    setTimeout(() => {
      if (window.announce) {
        window.announce(t('accessibility.pageLoaded', 'تم تحميل الصفحة الرئيسية'), 'polite');
      }
    }, 1000);
    
    // عرض مساعد الذكاء الاصطناعي بعد فترة
    const timeout = setTimeout(() => {
      setShowAIAssistant(true);
      
      if (window.announce) {
        window.announce(t('accessibility.aiAssistantReady', 'مساعد الذكاء الاصطناعي جاهز للمساعدة'), 'polite');
      }
    }, aiAssistantDelay);
    
    // الاستماع لحدث تغيير اللغة
    const handleLanguageFullChange = () => {
      // إعادة تطبيق الاتجاه
      const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";
      document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
      document.documentElement.setAttribute("lang", i18n.language);
      
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
  }, [i18n, t]);

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
          {t('accessibility.skipToContent', 'تخطى إلى المحتوى الرئيسي')}
        </a>
        
        <Header />
        
        <main id="main-content" tabIndex={-1}>
          {/* قسم البداية */}
          <HeroSection />
          
          {/* قسم لوحة معلومات الشبكة */}
          <NetworkDashboard />
          
          {/* قسم أدوات الشبكة */}
          <NetworkToolsSection />
          
          {/* قسم الميزات */}
          <AnimatedCards />
          
          {/* قسم ميزات الذكاء الاصطناعي */}
          <AIFeaturesSection />
          
          {/* قسم الإعدادات */}
          <SettingsSection />
          
          {/* قسم دعوة للعمل */}
          <CTASection />
        </main>
        
        <Footer />
        
        {/* مساعد الذكاء الاصطناعي العائم */}
        <FloatingAIAssistant 
          show={showAIAssistant} 
          onMaximize={() => window.location.href = '/ai'} 
        />
        
        {/* عناصر تحكم إمكانية الوصول */}
        <QuickAccessibilityButton />

        {/* مكونات إمكانية الوصول */}
        <ReadingGuide />
        <KeyboardNavigationMenu />
        <KeyboardFocusDetector />
        <LiveAnnouncer />
        
        {/* أداة تصحيح الترجمة لوضع المطور */}
        {isDeveloperMode && <TranslationDebugger />}
      </div>
    </TooltipProvider>
  );
};

export default Index;
