
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';

/**
 * هوك محسن لإدارة تعليقات الصوت لتحسين إمكانية الوصول
 * تم تحسينه للأداء الأسرع
 */
export function useA11ySound() {
  const [soundFeedback, setSoundFeedback] = useState<boolean>(() => {
    return localStorage.getItem('a11y-sound-feedback') === 'true';
  });
  
  // استخدام useRef بدلاً من Map للحصول على أداء أفضل
  const audioCache = useRef<Record<string, HTMLAudioElement>>({});
  
  // استخدام قائمة أولوية للأصوات الأكثر استخدامًا
  const prioritySounds = useMemo(() => ({
    'toggle.mp3': 0.3,
    'success.mp3': 0.4,
    'error.mp3': 0.4,
    'notification.mp3': 0.4,
    'warning.mp3': 0.4
  }), []);
  
  // تحميل الأصوات مسبقًا مع تحديد الأولوية
  useEffect(() => {
    // سيتم تحميل الأصوات ذات الأولوية العالية أولاً
    const preloadPrioritySounds = async () => {
      const entries = Object.entries(prioritySounds);
      
      // استخدام Promise.all للتحميل المتوازي
      await Promise.all(entries.map(async ([sound, _]) => {
        try {
          // التحقق من وجود الصوت في الذاكرة المؤقتة
          if (!audioCache.current[sound]) {
            const audio = new Audio(`/sounds/${sound}`);
            audio.preload = 'auto';
            audioCache.current[sound] = audio;
            
            // تحميل البيانات باستخدام وعود متوازية
            await audio.load();
          }
        } catch (err) {
          console.error('فشل تحميل الصوت مسبقاً:', err);
        }
      }));
    };
    
    // استخدام requestIdleCallback إذا كان متاحًا لتحميل الأصوات في وقت فراغ المتصفح
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        preloadPrioritySounds();
      });
    } else {
      // استخدام setTimeout كبديل
      setTimeout(preloadPrioritySounds, 300);
    }
    
    return () => {
      // تنظيف ذاكرة التخزين المؤقت
      audioCache.current = {};
    };
  }, [prioritySounds]);
  
  // تحسين أداء دالة تشغيل الصوت باستخدام AudioContext
  const audioContext = useRef<AudioContext | null>(null);
  
  // دالة محسنة لتشغيل الصوت تستخدم AudioContext للأداء الأفضل
  const playSound = useCallback((soundPath: string, volume: number = 0.4) => {
    if (!soundFeedback) return;
    
    try {
      // تحديد اسم الملف من المسار
      const soundFile = soundPath.includes('/') 
        ? soundPath.split('/').pop() || soundPath
        : soundPath;
      
      // استخدام Web Audio API للأداء الأفضل
      if (audioCache.current[soundFile]) {
        const audio = audioCache.current[soundFile];
        // إعادة تعيين الصوت للتشغيل مرة أخرى
        audio.currentTime = 0;
        audio.volume = volume;
        
        // استخدام تقنية استباقية لتقليل تأخير بدء الصوت
        if (!audioContext.current) {
          audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        
        const playPromise = audio.play();
        
        if (playPromise) {
          // استخدام catch بدلًا من then للتقليل من استهلاك الذاكرة
          playPromise.catch(err => {
            if (process.env.NODE_ENV === 'development') {
              console.error('فشل تشغيل الصوت:', err);
            }
          });
        }
      } else {
        // إنشاء وتخزين صوت جديد بطريقة محسنة
        const fullPath = soundPath.includes('/') ? soundPath : `/sounds/${soundPath}`;
        const audio = new Audio(fullPath);
        audio.volume = volume;
        audioCache.current[soundFile] = audio;
        
        // تحسين الأداء بتعيين تحميل غير متزامن
        audio.preload = 'auto';
        const playPromise = audio.play();
        
        if (playPromise) {
          playPromise.catch(err => {
            if (process.env.NODE_ENV === 'development') {
              console.error('فشل تشغيل الصوت:', err);
            }
          });
        }
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('فشل تشغيل الصوت:', error);
      }
    }
  }, [soundFeedback]);
  
  // حفظ الإعدادات عند تغييرها - تم تحسينه باستخدام الدوال المرجعية
  useEffect(() => {
    localStorage.setItem('a11y-sound-feedback', soundFeedback.toString());
    
    // إضافة سمة البيانات إلى الوثيقة للاستخدام في CSS
    document.documentElement.setAttribute('data-sound-feedback', soundFeedback.toString());
    
    // تشغيل صوت تأكيد التغيير إذا تم تفعيل الخاصية، مع تأخير بسيط لتجنب التداخل
    if (soundFeedback) {
      // استخدام setTimeout صغير لتجنب مشاكل تداخل الأصوات
      setTimeout(() => {
        playSound('/sounds/toggle.mp3', 0.3);
      }, 50);
    }
  }, [soundFeedback, playSound]);
  
  // وظيفة محسنة لتشغيل أصوات الإشعارات باستخدام تقنية تخزين مؤقت
  const playNotificationSound = useCallback((soundType: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    if (!soundFeedback) return;
    
    let soundFile: string;
    // استخدام كائن للتخطي بدلاً من switch للتحسين
    const soundMap = {
      'success': 'success.mp3',
      'error': 'error.mp3',
      'warning': 'warning.mp3',
      'info': 'notification.mp3'
    };
    
    soundFile = soundMap[soundType] || 'notification.mp3';
    playSound(`/sounds/${soundFile}`, prioritySounds[soundFile] || 0.4);
  }, [soundFeedback, playSound, prioritySounds]);
  
  return {
    soundFeedback,
    setSoundFeedback,
    playNotificationSound,
    playSound // تصدير playSound مباشرة للاستخدام في المكونات
  };
}
