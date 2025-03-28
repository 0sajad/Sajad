
import React, { useEffect, useRef } from "react";
import { useA11y } from "@/hooks/useA11y";
import { useSpeechSynthesis } from "@/hooks/accessibility/useSpeechSynthesis";
import { useTranslation } from "react-i18next";

// تعريف الأصوات المختلفة
const SOUND_PATHS = {
  success: "/sounds/success.mp3",
  error: "/sounds/error.mp3",
  warning: "/sounds/warning.mp3",
  info: "/sounds/info.mp3",
  notification: "/sounds/notification.mp3",
  focus: "/sounds/focus.mp3",
  click: "/sounds/click.mp3",
  hover: "/sounds/hover.mp3"
};

type SoundType = keyof typeof SOUND_PATHS;

interface AudioFeedbackProps {
  children?: React.ReactNode;
}

/**
 * مكون لإدارة التعليقات الصوتية في التطبيق
 */
export function AudioFeedback({ children }: AudioFeedbackProps) {
  const { soundFeedback, setColorBlindMode } = useA11y();
  const { i18n } = useTranslation();
  const audioRefs = useRef<Record<SoundType, HTMLAudioElement | null>>({
    success: null,
    error: null,
    warning: null,
    info: null,
    notification: null,
    focus: null,
    click: null,
    hover: null
  });
  
  const { speak, cancel } = useSpeechSynthesis({
    rate: 1,
    pitch: 1,
    volume: 0.8
  });
  
  // إضافة وظيفة تشغيل الصوت على الwindow
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.playSound = (type: SoundType = 'notification', volume: number = 0.5) => {
        if (!soundFeedback) return;
        
        const audio = audioRefs.current[type];
        if (audio) {
          audio.volume = volume;
          audio.currentTime = 0;
          audio.play().catch(err => console.error('Error playing sound:', err));
        }
      };
      
      window.speakText = (text: string, interrupt: boolean = false) => {
        if (!soundFeedback) return;
        
        if (interrupt) {
          cancel();
        }
        speak(text);
      };
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        // @ts-ignore - إزالة الوظائف من النافذة
        delete window.playSound;
        delete window.speakText;
      }
    };
  }, [soundFeedback, speak, cancel]);
  
  // إنشاء عناصر الصوت
  const audioElements = Object.entries(SOUND_PATHS).map(([key, path]) => (
    <audio
      key={key}
      ref={el => audioRefs.current[key as SoundType] = el}
      src={path}
      preload="auto"
      className="hidden"
    />
  ));
  
  return (
    <>
      {audioElements}
      {children}
    </>
  );
}

// تعريف الأنواع للوظائف العامة
declare global {
  interface Window {
    playSound(type?: keyof typeof SOUND_PATHS, volume?: number): void;
    speakText(text: string, interrupt?: boolean): void;
  }
}
