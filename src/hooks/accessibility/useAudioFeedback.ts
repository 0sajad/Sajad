
import { useEffect, useRef, useState } from 'react';

type SoundType = 'success' | 'error' | 'warning' | 'info' | 'notification' | 'click' | 'hover' | 'focus';

interface AudioFeedbackOptions {
  initialVolume?: number;
  basePath?: string;
  soundFiles?: Record<SoundType, string>;
  enabled?: boolean;
}

/**
 * خطاف لإدارة ردود الفعل الصوتية في التطبيق
 */
export function useAudioFeedback({
  initialVolume = 0.5,
  basePath = '/sounds/',
  soundFiles = {
    success: 'success.mp3',
    error: 'error.mp3',
    warning: 'warning.mp3',
    info: 'info.mp3',
    notification: 'notification.mp3',
    click: 'click.mp3',
    hover: 'hover.mp3',
    focus: 'focus.mp3'
  },
  enabled = false
}: AudioFeedbackOptions = {}) {
  const [volume, setVolume] = useState(initialVolume);
  const [isEnabled, setIsEnabled] = useState(enabled);
  const audioCache = useRef<Map<string, HTMLAudioElement>>(new Map());
  
  // تحميل مسبق للأصوات الشائعة
  useEffect(() => {
    if (isEnabled) {
      // تحميل مسبق للأصوات الأكثر استخدامًا فقط
      const preloadSounds: SoundType[] = ['success', 'error', 'notification'];
      
      preloadSounds.forEach(type => {
        if (!audioCache.current.has(type)) {
          try {
            const audio = new Audio(basePath + soundFiles[type]);
            audio.volume = volume;
            audio.preload = 'auto';
            audioCache.current.set(type, audio);
          } catch (error) {
            console.error('فشل تحميل الصوت:', error);
          }
        }
      });
    }
    
    return () => {
      // تنظيف كل الأصوات المؤقتة
      audioCache.current.forEach(audio => {
        audio.pause();
        audio.src = '';
      });
      audioCache.current.clear();
    };
  }, [isEnabled, basePath, soundFiles, volume]);
  
  // تعيين مستوى الصوت لجميع الأصوات المخزنة مؤقتًا
  useEffect(() => {
    audioCache.current.forEach(audio => {
      audio.volume = volume;
    });
  }, [volume]);
  
  /**
   * تشغيل صوت معين بنوعه
   */
  const playSound = (type: SoundType) => {
    if (!isEnabled) return Promise.resolve(false);
    
    try {
      // استخدام الصوت المخزن مؤقتًا إذا كان موجودًا
      let audio = audioCache.current.get(type);
      
      if (!audio) {
        audio = new Audio(basePath + soundFiles[type]);
        audio.volume = volume;
        audioCache.current.set(type, audio);
      }
      
      // إعادة تعيين الصوت إذا كان يتم تشغيله بالفعل
      if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      }
      
      return audio.play()
        .then(() => true)
        .catch(error => {
          console.error('فشل تشغيل الصوت:', error);
          return false;
        });
    } catch (error) {
      console.error('حدث خطأ أثناء تشغيل الصوت:', error);
      return Promise.resolve(false);
    }
  };
  
  /**
   * إيقاف جميع الأصوات قيد التشغيل
   */
  const stopAllSounds = () => {
    audioCache.current.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
  };
  
  return {
    playSound,
    stopAllSounds,
    volume,
    setVolume,
    isEnabled,
    setIsEnabled
  };
}
