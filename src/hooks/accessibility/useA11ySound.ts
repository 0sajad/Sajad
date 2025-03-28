
import { useState, useEffect } from 'react';

/**
 * إدارة تعليقات الصوت لتحسين إمكانية الوصول
 */
export function useA11ySound() {
  const [soundFeedback, setSoundFeedback] = useState<boolean>(() => {
    return localStorage.getItem('a11y-sound-feedback') === 'true';
  });
  
  // حفظ الإعدادات عند تغييرها
  useEffect(() => {
    localStorage.setItem('a11y-sound-feedback', soundFeedback.toString());
    
    // إضافة سمة البيانات إلى الوثيقة للاستخدام في CSS
    document.documentElement.setAttribute('data-sound-feedback', soundFeedback.toString());
    
    // تشغيل صوت تأكيد التغيير إذا تم تفعيل الخاصية
    if (soundFeedback) {
      try {
        const audio = new Audio('/sounds/toggle.mp3');
        audio.volume = 0.3;
        audio.play().catch(err => console.error('فشل تشغيل الصوت التأكيدي:', err));
      } catch (error) {
        console.error('غير قادر على تشغيل الإشعار الصوتي:', error);
      }
    }
  }, [soundFeedback]);
  
  // وظيفة لتشغيل أصوات الإشعارات عند حدوث أحداث مهمة
  const playNotificationSound = (soundType: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    if (!soundFeedback) return;
    
    let soundPath = '/sounds/';
    switch (soundType) {
      case 'success':
        soundPath += 'success.mp3';
        break;
      case 'error':
        soundPath += 'error.mp3';
        break;
      case 'warning':
        soundPath += 'warning.mp3';
        break;
      case 'info':
      default:
        soundPath += 'notification.mp3';
        break;
    }
    
    try {
      const audio = new Audio(soundPath);
      audio.volume = 0.4;
      audio.play().catch(err => console.error('فشل تشغيل صوت الإشعار:', err));
    } catch (error) {
      console.error('فشل تشغيل صوت الإشعار:', error);
    }
  };
  
  return {
    soundFeedback,
    setSoundFeedback,
    playNotificationSound
  };
}
