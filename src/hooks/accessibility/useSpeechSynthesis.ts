
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export interface SpeechVoice {
  id: string;
  name: string;
  lang: string;
  default: boolean;
}

interface UseSpeechSynthesisOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  onEnd?: () => void;
  onError?: (error: any) => void;
}

export function useSpeechSynthesis(options: UseSpeechSynthesisOptions = {}) {
  const { i18n } = useTranslation();
  const [voices, setVoices] = useState<SpeechVoice[]>([]);
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  
  // التحقق من دعم تخليق الكلام
  useEffect(() => {
    const supported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
    setSupported(supported);
    
    if (supported) {
      // تحميل الأصوات
      const loadVoices = () => {
        const synthVoices = speechSynthesis.getVoices();
        
        if (synthVoices.length > 0) {
          // تحويل الأصوات إلى التنسيق المطلوب
          const voiceOptions: SpeechVoice[] = synthVoices.map(voice => ({
            id: voice.voiceURI,
            name: voice.name,
            lang: voice.lang,
            default: voice.default
          }));
          
          // ترتيب الأصوات: العربية أولاً ثم اللغة الحالية ثم الافتراضية ثم البقية
          const isArabicActive = i18n.language === 'ar' || i18n.language === 'ar-iq';
          const currentLang = isArabicActive ? 'ar' : i18n.language.split('-')[0];
          
          // فرز الأصوات لوضع الأصوات العربية أو الحالية أولاً
          const sortedVoices = [...voiceOptions].sort((a, b) => {
            // الأصوات العربية أو بلغة المستخدم الحالية
            const aIsCurrentLang = a.lang.toLowerCase().includes(currentLang.toLowerCase());
            const bIsCurrentLang = b.lang.toLowerCase().includes(currentLang.toLowerCase());
            
            if (aIsCurrentLang && !bIsCurrentLang) return -1;
            if (!aIsCurrentLang && bIsCurrentLang) return 1;
            
            // الأصوات الافتراضية
            if (a.default && !b.default) return -1;
            if (!a.default && b.default) return 1;
            
            return 0;
          });
          
          setVoices(sortedVoices);
          
          // إذا لم يكن هناك صوت محدد، حدد أولاً صوت باللغة الحالية أو الافتراضي
          if (!selectedVoice && sortedVoices.length > 0) {
            const currentLangVoice = sortedVoices.find(v => 
              v.lang.toLowerCase().includes(currentLang.toLowerCase())
            );
            
            const defaultVoice = sortedVoices.find(v => v.default);
            
            setSelectedVoice(currentLangVoice?.id || defaultVoice?.id || sortedVoices[0].id);
          }
        }
      };
      
      loadVoices();
      
      // استماع لتغيير الأصوات المتاحة
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }, [i18n.language, selectedVoice]);
  
  // استرداد صوت معين من معرفه
  const getVoiceById = useCallback((id: string | null) => {
    if (!id || !supported) return null;
    return speechSynthesis.getVoices().find(voice => voice.voiceURI === id) || null;
  }, [supported]);
  
  // وظيفة التحدث
  const speak = useCallback((text: string, voiceId?: string) => {
    if (!supported) return;
    
    // إيقاف أي كلام نشط
    speechSynthesis.cancel();
    
    // إنشاء نص جديد
    const utterance = new SpeechSynthesisUtterance(text);
    
    // تعيين الصوت المطلوب
    const voice = getVoiceById(voiceId || selectedVoice);
    if (voice) utterance.voice = voice;
    
    // تعيين خيارات إضافية
    utterance.rate = options.rate || 1;
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 1;
    
    // إعداد معالجات الأحداث
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => {
      setSpeaking(false);
      if (options.onEnd) options.onEnd();
    };
    utterance.onerror = (error) => {
      setSpeaking(false);
      if (options.onError) options.onError(error);
    };
    
    // تشغيل الكلام
    speechSynthesis.speak(utterance);
  }, [getVoiceById, options, selectedVoice, supported]);
  
  // وظيفة الإيقاف
  const cancel = useCallback(() => {
    if (!supported) return;
    speechSynthesis.cancel();
    setSpeaking(false);
  }, [supported]);
  
  return {
    supported,
    voices,
    speak,
    cancel,
    speaking,
    selectedVoice,
    setSelectedVoice
  };
}
