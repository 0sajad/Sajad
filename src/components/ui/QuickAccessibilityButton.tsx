
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AccessibilityMenu } from "@/components/ui/accessibility";
import { useA11y } from "@/hooks/useA11y";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Accessibility } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

export function QuickAccessibilityButton() {
  const { highContrast, largeText, reducedMotion, focusMode } = useA11y();
  const { t } = useTranslation();
  const [isInitiallyVisible, setIsInitiallyVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  // حساب عدد ميزات إمكانية الوصول المفعلة
  const activeFeatures = [highContrast, largeText, reducedMotion, focusMode].filter(Boolean).length;
  
  // تأثير لجعل الزر أكثر وضوحًا عند التحميل الأول
  useEffect(() => {
    // تحقق مما إذا كان المستخدم قد تفاعل مع إعدادات إمكانية الوصول من قبل
    const hasUserInteracted = localStorage.getItem('a11yInteracted') === 'true';
    setHasInteracted(hasUserInteracted);
    
    const timer = setTimeout(() => {
      setIsInitiallyVisible(!hasUserInteracted);
    }, hasUserInteracted ? 5000 : 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // حفظ حالة التفاعل عند تغيير أي إعداد
  useEffect(() => {
    if (activeFeatures > 0 && !hasInteracted) {
      localStorage.setItem('a11yInteracted', 'true');
      setHasInteracted(true);
    }
  }, [activeFeatures, hasInteracted]);
  
  // الحصول على قائمة الميزات النشطة لقارئات الشاشة
  const getActiveFeaturesText = () => {
    const features = [];
    if (highContrast) features.push(t('accessibility.highContrast'));
    if (largeText) features.push(t('accessibility.largeText'));
    if (reducedMotion) features.push(t('accessibility.reducedMotion'));
    if (focusMode) features.push(t('accessibility.focusMode'));
    
    if (features.length === 0) return t('accessibility.noFeaturesActive');
    return t('accessibility.activeFeatures') + features.join(', ');
  };
  
  return (
    <AnimatePresence>
      <motion.div 
        className="fixed bottom-4 left-4 z-50 md:bottom-6 md:left-6 rtl:left-auto rtl:right-4 rtl:md:right-6"
        role="region"
        aria-label={t('accessibility.a11ySettings')}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <TooltipProvider>
          <Tooltip delayDuration={350}>
            <TooltipTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="icon"
                  className={`relative shadow-md hover:shadow-lg bg-gradient-to-r ${
                    isInitiallyVisible && activeFeatures === 0 ? 'animate-pulse' : ''
                  } from-indigo-50 to-purple-100 dark:from-gray-800 dark:to-purple-900/30 border border-purple-200 dark:border-purple-800/40 transition-all duration-300 focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-700`}
                  aria-label={t('accessibility.a11ySettings')}
                  aria-haspopup="menu"
                  aria-expanded="false"
                  aria-describedby="a11y-settings-desc"
                  onClick={() => {
                    if (!hasInteracted) {
                      localStorage.setItem('a11yInteracted', 'true');
                      setHasInteracted(true);
                    }
                  }}
                >
                  <Accessibility className="h-4 w-4 text-purple-700 dark:text-purple-400" />
                  {activeFeatures > 0 && (
                    <motion.div 
                      className="absolute -top-2 -right-2 w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center" 
                      aria-hidden="true"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 12 }}
                    >
                      <span className="text-xs text-white font-bold">{activeFeatures}</span>
                    </motion.div>
                  )}
                  <span id="a11y-settings-desc" className="sr-only">{getActiveFeaturesText()}</span>
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0">
              <p className="text-sm">{t('accessibility.a11ySettings')}</p>
              <p className="text-xs text-indigo-100">{t('accessibility.clickToCustomize')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <AccessibilityMenu />
      </motion.div>
    </AnimatePresence>
  );
}
