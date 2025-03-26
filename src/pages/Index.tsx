
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useTranslation } from 'react-i18next';
import { useLanguageTransition } from "@/hooks/useLanguageTransition";
import { Toaster } from "@/components/ui/toaster";

// تبسيط المكون الرئيسي للصفحة الرئيسية لتسهيل التشخيص
const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const { t, i18n } = useTranslation();
  const { isTransitioning } = useLanguageTransition();
  
  useEffect(() => {
    // تسجيل وصول للصفحة الرئيسية
    console.log("Index page mounted - Current language:", i18n.language);
    
    // تعيين حالة التحميل
    setLoaded(true);
    
    // التحقق من اللغة المحفوظة أو استخدام لغة المتصفح
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && savedLanguage !== i18n.language) {
      console.log("Changing language to saved language:", savedLanguage);
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
    const handleLanguageFullChange = (event: Event) => {
      console.log("Language fully changed event received");
      // إعادة تطبيق الاتجاه
      const customEvent = event as CustomEvent;
      const language = customEvent.detail?.language || i18n.language;
      const isRTL = language === "ar" || language === "ar-iq";
      document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
      if (isRTL) {
        document.body.classList.add('rtl-active');
      } else {
        document.body.classList.remove('rtl-active');
      }
    };
    
    document.addEventListener('languageFullyChanged', handleLanguageFullChange);
    
    // تنظيف الموارد عند إزالة المكون
    return () => {
      document.removeEventListener('languageFullyChanged', handleLanguageFullChange);
      console.log("Index page unmounting");
    };
  }, [i18n]);

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center transition-all duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${isTransitioning ? 'opacity-30 scale-95' : 'opacity-100 scale-100'}`}>
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-4">{t('common.welcome', 'مرحباً بك في OCTA-GRAM')}</h1>
        <p className="text-lg mb-8">
          {t('common.currentLanguage', 'اللغة الحالية')}: {i18n.language}
        </p>
        
        <div className="p-6 bg-card rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">
            {t('common.diagnosticInfo', 'معلومات تشخيصية')}
          </h2>
          <ul className="list-disc pl-5">
            <li>تم تحميل الصفحة: {loaded ? '✅' : '❌'}</li>
            <li>في حالة انتقال: {isTransitioning ? '✅' : '❌'}</li>
            <li>اتجاه اللغة: {document.dir || 'غير محدد'}</li>
            <li>لغة الصفحة: {document.documentElement.lang || 'غير محددة'}</li>
          </ul>
        </div>
      </main>
      
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
