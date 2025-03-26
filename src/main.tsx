
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './components/ui/a11y-styles.css'; 
import './i18n';
import { LoadingScreen } from './components/LoadingScreen';
import { toast } from '@/components/ui/use-toast';

// مكون الغلاف للتعامل مع التهيئة
const AppWrapper = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);

  useEffect(() => {
    // التعامل مع إعداد إمكانية الوصول والتفضيلات
    if (typeof window !== 'undefined') {
      // تعيين لغة المستند بناءً على الاتجاه
      document.documentElement.lang = document.documentElement.dir === 'rtl' ? 'ar' : 'en';
      
      // التحقق من تفضيلات الحركة المخفضة
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (prefersReducedMotion.matches) {
        document.body.classList.add('reduced-motion');
        localStorage.setItem('reducedMotion', 'true');
      }
      
      // التحقق من تفضيلات التباين المحسن
      const prefersContrastMore = window.matchMedia('(prefers-contrast: more)');
      if (prefersContrastMore.matches && localStorage.getItem('highContrast') === null) {
        document.body.classList.add('high-contrast');
        localStorage.setItem('highContrast', 'true');
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
      
      // إضافة مرشحات SVG لوضع عمى الألوان
      const svgFilters = document.createElement('div');
      svgFilters.innerHTML = `
        <svg style="display:none">
          <filter id="deuteranopia-filter">
            <feColorMatrix type="matrix" values="0.625 0.375 0 0 0 0.7 0.3 0 0 0 0 0.3 0.7 0 0 0 0 0 1 0"/>
          </filter>
          <filter id="protanopia-filter">
            <feColorMatrix type="matrix" values="0.567 0.433 0 0 0 0.558 0.442 0 0 0 0 0.242 0.758 0 0 0 0 0 1 0"/>
          </filter>
          <filter id="tritanopia-filter">
            <feColorMatrix type="matrix" values="0.95 0.05 0 0 0 0 0.433 0.567 0 0 0 0.475 0.525 0 0 0 0 0 1 0"/>
          </filter>
        </svg>
      `;
      document.body.appendChild(svgFilters);
      
      // اكتشاف مستخدمي لوحة المفاتيح
      const handleFirstTab = (e) => {
        if (e.key === 'Tab') {
          document.body.classList.add('keyboard-user');
          setIsKeyboardUser(true);
          window.removeEventListener('keydown', handleFirstTab);
        }
      };
      
      window.addEventListener('keydown', handleFirstTab);
      
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
        
        // عرض إشعار ترحيبي خفيف
        setTimeout(() => {
          toast({
            title: document.documentElement.lang === 'ar' ? 'مرحبًا بك!' : 'Welcome!',
            description: document.documentElement.lang === 'ar' 
              ? 'استخدم زر إمكانية الوصول في أسفل اليسار لتخصيص تجربتك'
              : 'Use the accessibility button at the bottom left to customize your experience'
          });
        }, 1500);
      }, 800);
      
      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleFirstTab);
      };
    }
  }, []);

  return isLoading ? <LoadingScreen /> : <App />;
};

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
