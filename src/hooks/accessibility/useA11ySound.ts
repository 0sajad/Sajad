
import { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * هوك محسن لإدارة تعليقات الصوت لتحسين إمكانية الوصول
 */
export function useA11ySound() {
  const [soundFeedback, setSoundFeedback] = useState<boolean>(() => {
    return localStorage.getItem('a11y-sound-feedback') === 'true';
  });
  
  // تخزين مرجعي للملفات الصوتية لتحسين الأداء
  const audioCache = useMemo(() => new Map<string, HTMLAudioElement>(), []);
  
  // القيام بالإعداد المسبق لملفات الصوت الشائعة
  useEffect(() => {
    const preloadSounds = ['toggle.mp3', 'success.mp3', 'error.mp3', 'notification.mp3', 'warning.mp3'];
    
    // تحميل الأصوات مسبقًا لاستجابة أسرع
    preloadSounds.forEach(sound => {
      try {
        const audio = new Audio(`/sounds/${sound}`);
        audio.preload = 'auto';
        audioCache.set(sound, audio);
        
        // تحميل البيانات
        const loadPromise = audio.load();
      } catch (err) {
        console.error('فشل تحميل الصوت مسبقاً:', err);
      }
    });
    
    return () => {
      // تنظيف ذاكرة التخزين المؤقت
      audioCache.clear();
    };
  }, [audioCache]);
  
  // دالة محسنة لتشغيل الصوت تستخدم ذاكرة التخزين المؤقت
  const playSound = useCallback((soundPath: string, volume: number = 0.4) => {
    if (!soundFeedback) return;
    
    try {
      // استخدام الصوت المخزن مؤقتًا أو إنشاء واحد جديد
      let audio = audioCache.get(soundPath);
      if (!audio) {
        audio = new Audio(soundPath);
        audioCache.set(soundPath, audio);
      } else {
        // إعادة تعيين الصوت للتشغيل مرة أخرى
        audio.currentTime = 0;
      }
      
      audio.volume = volume;
      const playPromise = audio.play();
      
      if (playPromise) {
        playPromise.catch(err => {
          if (process.env.NODE_ENV === 'development') {
            console.error('فشل تشغيل الصوت:', err);
          }
        });
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('فشل تشغيل الصوت:', error);
      }
    }
  }, [soundFeedback, audioCache]);
  
  // حفظ الإعدادات عند تغييرها
  useEffect(() => {
    localStorage.setItem('a11y-sound-feedback', soundFeedback.toString());
    
    // إضافة سمة البيانات إلى الوثيقة للاستخدام في CSS
    document.documentElement.setAttribute('data-sound-feedback', soundFeedback.toString());
    
    // تشغيل صوت تأكيد التغيير إذا تم تفعيل الخاصية
    if (soundFeedback) {
      playSound('/sounds/toggle.mp3', 0.3);
    }
  }, [soundFeedback, playSound]);
  
  // وظيفة محسنة لتشغيل أصوات الإشعارات عند حدوث أحداث مهمة
  const playNotificationSound = useCallback((soundType: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    if (!soundFeedback) return;
    
    let soundFile: string;
    switch (soundType) {
      case 'success':
        soundFile = 'success.mp3';
        break;
      case 'error':
        soundFile = 'error.mp3';
        break;
      case 'warning':
        soundFile = 'warning.mp3';
        break;
      case 'info':
      default:
        soundFile = 'notification.mp3';
        break;
    }
    
    playSound(`/sounds/${soundFile}`, 0.4);
  }, [soundFeedback, playSound]);
  
  return {
    soundFeedback,
    setSoundFeedback,
    playNotificationSound
  };
}
