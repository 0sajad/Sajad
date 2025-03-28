
import React, { useEffect, useState, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/accessibility.css';
import './styles/rtl.css'; // إضافة دعم محسن للغة العربية واتجاه RTL
import './i18n';
import { toast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton'; 
import { ProgressBar } from '@/components/ui/progress-bar';

// معرف فريد لتتبع تفاعلات المستخدم مع ميزات إمكانية الوصول
const ACCESS_INTERACTION_KEY = 'a11y_interaction_version';
const APP_VERSION = '2.0.1'; // رقم إصدار التطبيق لتتبع التحديثات

/**
 * مكون غلاف للتطبيق
 * يدير تحميل التطبيق وإعدادات إمكانية الوصول والاتجاه
 */
const AppWrapper = () => {
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // تحميل التطبيق بشكل تدريجي لتحسين الأداء
  useEffect(() => {
    const loadApp = async () => {
      if (hasInitialized) return;
      
      try {
        setHasInitialized(true);
        
        // محاكاة تقدم التحميل
        const simulateProgress = () => {
          setLoadingProgress(prev => {
            if (prev >= 100) {
              clearInterval(progressInterval);
              setTimeout(() => setIsAppLoading(false), 200);
              return 100;
            }
            return Math.min(prev + 5, 100);
          });
        };
        
        const progressInterval = setInterval(simulateProgress, 100);
        
        // تعيين لغة المستند واتجاهه
        const savedLanguage = localStorage.getItem('language') || 'ar';
        const isRTL = savedLanguage === 'ar' || savedLanguage === 'ar-iq';
        
        document.documentElement.lang = savedLanguage;
        document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
        
        if (isRTL) {
          document.body.classList.add('rtl-active');
        } else {
          document.body.classList.remove('rtl-active');
        }
        
        // تطبيق تفضيلات إمكانية الوصول المحفوظة
        applyAccessibilityPreferences();
        
        // إنشاء عناصر الإعلان لقارئات الشاشة
        setupScreenReaderAnnouncements();
        
        // تهيئة تفضيلات الخادم الديناميكية (يمكن استبدالها بطلب فعلي للخادم)
        const serverPreferences = await getServerPreferences();
        if (serverPreferences) {
          // تطبيق تفضيلات الخادم إذا كانت جديدة
          applyServerPreferences(serverPreferences);
        }
        
        // التحقق من إصدار التطبيق وإعلام المستخدم بالتحديثات
        checkForAppUpdates();
        
        // تعيين مستمعات الأحداث للمتصفح لتحسين تجربة المستخدم
        setupBrowserEventListeners();
        
        return () => clearInterval(progressInterval);
      } catch (error) {
        console.error('فشل في تحميل التطبيق:', error);
        setIsAppLoading(false);
      }
    };
    
    loadApp();
  }, [hasInitialized]);
  
  /**
   * تطبيق تفضيلات إمكانية الوصول المحفوظة
   */
  const applyAccessibilityPreferences = () => {
    // التحقق من تفضيلات تقليل الحركة
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const savedReducedMotion = localStorage.getItem('a11y-reducedMotion');
    
    if ((prefersReducedMotion.matches && savedReducedMotion !== 'false') || savedReducedMotion === 'true') {
      document.body.classList.add('reduced-motion');
    }
    
    // التحقق من تفضيلات التباين العالي
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    const prefersHighContrast = window.matchMedia('(prefers-contrast: more)');
    const savedHighContrast = localStorage.getItem('a11y-highContrast');
    
    if ((prefersDarkMode.matches && prefersHighContrast.matches && savedHighContrast !== 'false') || savedHighContrast === 'true') {
      document.body.classList.add('high-contrast');
    }
    
    // التحقق من تفضيلات حجم النص الكبير
    const savedLargeText = localStorage.getItem('a11y-largeText');
    if (savedLargeText === 'true') {
      document.body.classList.add('large-text');
    }
    
    // التحقق من تفضيلات وضع التركيز
    const savedFocusMode = localStorage.getItem('a11y-focusMode');
    if (savedFocusMode === 'true') {
      document.body.classList.add('focus-mode');
    }
    
    // التحقق من تفضيلات خط عسر القراءة
    const savedDyslexicFont = localStorage.getItem('a11y-dyslexicFont');
    if (savedDyslexicFont === 'true') {
      document.body.classList.add('dyslexic-font');
    }
    
    // التحقق من وضع عمى الألوان
    const colorBlindMode = localStorage.getItem('a11y-colorBlindMode');
    if (colorBlindMode && colorBlindMode !== 'none') {
      document.body.classList.add(colorBlindMode);
    }
  };
  
  /**
   * إعداد إعلانات قارئ الشاشة
   */
  const setupScreenReaderAnnouncements = () => {
    // إضافة عنصر معلن قارئ الشاشة
    const liveAnnouncer = document.createElement('div');
    liveAnnouncer.id = 'liveAnnouncer';
    liveAnnouncer.className = 'sr-only';
    liveAnnouncer.setAttribute('aria-live', 'polite');
    liveAnnouncer.setAttribute('aria-atomic', 'true');
    document.body.appendChild(liveAnnouncer);
    
    // إضافة وظيفة عالمية للإعلان
    window.announce = function(message: string, priority: 'polite' | 'assertive' = 'polite') {
      const announcer = document.getElementById('liveAnnouncer');
      if (announcer) {
        announcer.setAttribute('aria-live', priority);
        announcer.textContent = message;
        
        // مسح الرسالة بعد قراءتها
        setTimeout(() => {
          if (announcer && document.body.contains(announcer)) {
            announcer.textContent = '';
          }
        }, 5000);
      }
    };
  };
  
  /**
   * الحصول على تفضيلات الخادم (محاكاة)
   */
  const getServerPreferences = async () => {
    // محاكاة طلب الخادم - في التطبيق الفعلي، يمكن استبدال هذا بطلب API
    return new Promise<{version: string} | null>((resolve) => {
      setTimeout(() => {
        resolve({ version: APP_VERSION });
      }, 300);
    });
  };
  
  /**
   * تطبيق تفضيلات الخادم
   */
  const applyServerPreferences = (preferences: {version: string}) => {
    const currentVersion = localStorage.getItem('app_version');
    if (currentVersion !== preferences.version) {
      localStorage.setItem('app_version', preferences.version);
    }
  };
  
  /**
   * التحقق من تحديثات التطبيق
   */
  const checkForAppUpdates = () => {
    const currentVersion = localStorage.getItem('app_version');
    if (currentVersion !== APP_VERSION) {
      localStorage.setItem('app_version', APP_VERSION);
      
      // عرض إشعار بالتحديث فقط إذا كان التحديث من إصدار سابق
      if (currentVersion) {
        setTimeout(() => {
          toast({
            title: 'تم التحديث',
            description: `تم تحديث التطبيق إلى الإصدار ${APP_VERSION}`,
          });
        }, 2000);
      }
    }
  };
  
  /**
   * إعداد مستمعات أحداث المتصفح
   */
  const setupBrowserEventListeners = () => {
    // اكتشاف مستخدمي لوحة المفاتيح
    const handleFirstTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-user');
        setIsKeyboardUser(true);
        window.removeEventListener('keydown', handleFirstTab);
      }
    };
    
    window.addEventListener('keydown', handleFirstTab);
    
    // مراقبة حالة الاتصال بالإنترنت
    const handleOnlineStatus = () => {
      const isOnline = navigator.onLine;
      if (!isOnline) {
        toast({
          title: 'انقطع الاتصال',
          description: 'تم فقدان الاتصال بالإنترنت',
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'تم استعادة الاتصال',
          description: 'تم استعادة الاتصال بالإنترنت',
          variant: 'default'
        });
      }
    };
    
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    
    // إضافة رابط التخطي إلى المحتوى لمستخدمي لوحة المفاتيح
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-white focus:text-black focus:shadow-lg rounded';
    skipLink.textContent = document.documentElement.lang === 'ar' ? 'انتقل إلى المحتوى' : 'Skip to content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    return () => {
      window.removeEventListener('keydown', handleFirstTab);
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  };

  // عرض شاشة تحميل محسنة إذا كان التطبيق لا يزال يتم تحميله
  if (isAppLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-950 transition-colors duration-300">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">جاري التحميل...</h1>
            <p className="text-muted-foreground">نعمل على تجهيز أفضل تجربة لك</p>
          </div>
          
          <ProgressBar value={loadingProgress} className="mb-8" />
          
          <div className="space-y-4">
            <Skeleton className="h-12 w-full rounded-md" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-24 rounded-md" />
              <Skeleton className="h-24 rounded-md" />
            </div>
            <Skeleton className="h-40 w-full rounded-md" />
          </div>
        </div>
      </div>
    );
  }

  // عرض التطبيق
  return <App />;
};

// تعريف الأنواع العالمية للإعلانات
declare global {
  interface Window {
    announce(message: string, priority?: 'polite' | 'assertive'): void;
  }
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Skeleton className="h-24 w-24 rounded-full" />
      </div>
    }>
      <AppWrapper />
    </Suspense>
  </React.StrictMode>
);
