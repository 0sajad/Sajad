
import React, { useState, useEffect } from "react";
import { Footer } from "@/components/Footer";
import { useTranslation } from 'react-i18next';
import { useLanguageTransition } from "@/hooks/useLanguageTransition";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { usePreferenceSync } from "@/hooks/usePreferenceSync";
import { useA11y } from "@/hooks/useA11y";
import { motion, AnimatePresence } from "framer-motion";
import { IndexHead } from "@/components/index/IndexHead";
import { IndexContent } from "@/components/index/IndexContent";
import { IndexAccessibility } from "@/components/index/IndexAccessibility";

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const { i18n } = useTranslation();
  const { isTransitioning } = useLanguageTransition();
  const { reducedMotion } = useA11y();
  
  // استخدام الهوكات الجديدة
  useKeyboardShortcuts();
  usePreferenceSync();

  useEffect(() => {
    console.log("Index component mounted");
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
      document.removeEventListener('languageFullyChanged', handleLanguageFullChange);
    };
  }, [i18n]);

  return (
    <TooltipProvider>
      <AnimatePresence mode="wait">
        <motion.div 
          className={`min-h-screen w-full transition-all ${reducedMotion ? 'transition-none' : 'duration-500'} ${loaded ? 'opacity-100' : 'opacity-0'} ${isTransitioning ? 'opacity-30 scale-95' : 'opacity-100 scale-100'}`}
          role="application"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reducedMotion ? 0.1 : 0.5 }}
        >
          <IndexHead />
          
          <IndexContent 
            loaded={loaded} 
            isTransitioning={isTransitioning} 
          />
          
          <Footer />
          
          <IndexAccessibility />
        </motion.div>
      </AnimatePresence>
    </TooltipProvider>
  );
};

export default Index;
