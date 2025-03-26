
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './components/ui/a11y-styles.css'; 
import './i18n';
import { toast } from '@/components/ui/use-toast';

// معرف فريد لتتبع تفاعلات المستخدم مع ميزات إمكانية الوصول
const ACCESS_INTERACTION_KEY = 'a11y_interaction_version';

// مكون الغلاف للتعامل مع التهيئة والتعافي من الأخطاء
const AppWrapper = () => {
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // التعامل مع إعداد إمكانية الوصول والتفضيلات
    if (typeof window !== 'undefined' && !hasInitialized) {
      setHasInitialized(true);
      
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
      
      // التحقق من وضع الخط لذوي عسر القراءة
      if (localStorage.getItem('dyslexicFont') === 'true') {
        document.body.classList.add('dyslexic-font');
      }
      
      // التحقق من وضع عمى الألوان
      const colorBlindMode = localStorage.getItem('colorBlindMode');
      if (colorBlindMode) {
        document.body.classList.add(colorBlindMode);
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
      svgFilters.setAttribute('aria-hidden', 'true');
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
          <filter id="grayscale-filter">
            <feColorMatrix type="matrix" values="0.33 0.33 0.33 0 0 0.33 0.33 0.33 0 0 0.33 0.33 0.33 0 0 0 0 0 1 0"/>
          </filter>
        </svg>
      `;
      document.body.appendChild(svgFilters);
      
      // إضافة عنصر معلن القارئ الشاشة
      const liveAnnouncer = document.createElement('div');
      liveAnnouncer.id = 'liveAnnouncer';
      liveAnnouncer.className = 'sr-only';
      liveAnnouncer.setAttribute('aria-live', 'polite');
      liveAnnouncer.setAttribute('aria-atomic', 'true');
      document.body.appendChild(liveAnnouncer);
      
      // إضافة هوك للإعلان عن التغييرات لقارئات الشاشة
      window.announce = function(message: string, priority: 'polite' | 'assertive' = 'polite') {
        const announcer = document.getElementById('liveAnnouncer');
        if (announcer) {
          announcer.setAttribute('aria-live', priority);
          announcer.textContent = message;
          
          // مسح الرسالة بعد قراءتها
          setTimeout(() => {
            announcer.textContent = '';
          }, 3000);
        }
      };
      
      // اكتشاف مستخدمي لوحة المفاتيح
      const handleFirstTab = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          document.body.classList.add('keyboard-user');
          setIsKeyboardUser(true);
          window.removeEventListener('keydown', handleFirstTab);
        }
      };
      
      window.addEventListener('keydown', handleFirstTab);
      
      // إعلام قارئات الشاشة أن التطبيق قد اكتمل تحميله
      setTimeout(() => {
        window.announce(
          document.documentElement.lang === 'ar' 
            ? 'تم تحميل التطبيق بنجاح' 
            : 'Application loaded successfully'
        );
        
        // عرض إشعار ترحيبي خفيف
        setTimeout(() => {
          toast({
            title: document.documentElement.lang === 'ar' ? 'مرحبًا بك!' : 'Welcome!',
            description: document.documentElement.lang === 'ar' 
              ? 'استخدم زر إمكانية الوصول في أسفل اليسار لتخصيص تجربتك'
              : 'Use the accessibility button at the bottom left to customize your experience'
          });
        }, 1500);
        
        // تحديث إصدار تفاعل المستخدم مع ميزات إمكانية الوصول إذا لم يتم تحديثه بعد
        const currentVersion = localStorage.getItem(ACCESS_INTERACTION_KEY);
        if (!currentVersion) {
          localStorage.setItem(ACCESS_INTERACTION_KEY, '1.0');
        }
      }, 800);
      
      return () => {
        window.removeEventListener('keydown', handleFirstTab);
      };
    }
  }, [hasInitialized]);

  // معالج الأخطاء العامة للتطبيق
  class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
    constructor(props: { children: React.ReactNode }) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
      return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      console.error("خطأ في التطبيق:", error, errorInfo);
      localStorage.setItem('app_error_log', JSON.stringify({
        error: error.message,
        stack: error.stack,
        time: new Date().toISOString()
      }));
      setHasError(true);
    }

    render() {
      if (this.state.hasError) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
            <div className="max-w-md text-center">
              <h1 className="text-2xl font-bold mb-4">عذراً، حدث خطأ ما</h1>
              <p className="mb-6">واجهنا مشكلة أثناء تحميل التطبيق. يرجى المحاولة مرة أخرى.</p>
              <button
                className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:opacity-90 transition-opacity"
                onClick={() => {
                  this.setState({ hasError: false });
                  setHasError(false);
                  window.location.reload();
                }}
              >
                إعادة تحميل التطبيق
              </button>
            </div>
          </div>
        );
      }

      return this.props.children;
    }
  }

  // إذا حدث خطأ في التطبيق الرئيسي، عرض واجهة التعافي
  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">حدث خطأ غير متوقع</h1>
          <p className="mb-6">واجهنا مشكلة أثناء تشغيل التطبيق. يرجى إعادة تحميل الصفحة.</p>
          <button
            className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:opacity-90 transition-opacity"
            onClick={() => {
              setHasError(false);
              window.location.reload();
            }}
          >
            إعادة تحميل التطبيق
          </button>
        </div>
      </div>
    );
  }

  // تغليف التطبيق بحدود الخطأ لمنع توقف التطبيق بالكامل عند حدوث أخطاء
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
};

// إضافة أنواع عالمية للإعلانات
declare global {
  interface Window {
    announce(message: string, priority?: 'polite' | 'assertive'): void;
  }
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
