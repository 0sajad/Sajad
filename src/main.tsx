
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './components/ui/a11y-styles.css'; 
import './i18n';
import { LoadingScreen } from './components/LoadingScreen';

// مكون الغلاف للتعامل مع التهيئة
const AppWrapper = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // التعامل مع إعداد إمكانية الوصول والتفضيلات
    if (typeof window !== 'undefined') {
      // تعيين لغة المستند بناءً على الاتجاه
      document.documentElement.lang = document.documentElement.dir === 'rtl' ? 'ar' : 'en';
      
      // التحقق من تفضيلات الحركة المخفضة
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (prefersReducedMotion.matches) {
        document.body.classList.add('reduced-motion');
      }
      
      // إعداد المحتوى الرئيسي لقارئات الشاشة
      const main = document.querySelector('main');
      if (main) {
        main.setAttribute('role', 'main');
        main.setAttribute('id', 'main-content');
        main.setAttribute('tabIndex', '-1');
      }
      
      // إضافة رابط التخطي إلى المحتوى لمستخدمي لوحة المفاتيح
      const skipLink = document.createElement('a');
      skipLink.href = '#main-content';
      skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-white focus:text-black focus:shadow-lg rounded';
      skipLink.textContent = document.documentElement.lang === 'ar' ? 'انتقل إلى المحتوى' : 'Skip to content';
      document.body.insertBefore(skipLink, document.body.firstChild);
      
      // محاكاة اكتمال التحميل
      const timer = setTimeout(() => {
        setIsLoading(false);
        // إعلام قارئات الشاشة أن التطبيق قد اكتمل تحميله
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.className = 'sr-only';
        announcer.textContent = document.documentElement.lang === 'ar' ? 'تم تحميل التطبيق بنجاح' : 'Application loaded successfully';
        document.body.appendChild(announcer);
        
        // إزالة المُعلن بعد فترة
        setTimeout(() => {
          if (document.body.contains(announcer)) {
            document.body.removeChild(announcer);
          }
        }, 1000);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, []);

  return isLoading ? <LoadingScreen /> : <App />;
};

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
