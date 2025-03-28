
import React, { useEffect, useRef } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Volume, VolumeX, Play } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useA11y } from "@/hooks/useA11y";

interface VoiceOption {
  id: string;
  name: string;
  lang: string;
}

interface SoundTabContentProps {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
  volume: number;
  setVolume: (value: number) => void;
  voice: string;
  setVoice: (value: string) => void;
}

export function SoundTabContent({
  enabled,
  setEnabled,
  volume,
  setVolume,
  voice,
  setVoice
}: SoundTabContentProps) {
  const { t, i18n } = useTranslation();
  const { announce } = useA11y();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const voicesRef = useRef<VoiceOption[]>([]);
  
  // تحميل الأصوات المتاحة
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      
      // وظيفة تحديث قائمة الأصوات
      const updateVoices = () => {
        const voices = synthRef.current?.getVoices() || [];
        const arabicVoices = voices.filter(v => 
          v.lang.includes('ar') || 
          v.lang.includes('AR') || 
          v.name.includes('Arabic')
        );
        const otherVoices = voices.filter(v => 
          !v.lang.includes('ar') && 
          !v.lang.includes('AR') && 
          !v.name.includes('Arabic')
        );
        
        // ترتيب الأصوات: العربية أولاً ثم غيرها
        const sortedVoices = [...arabicVoices, ...otherVoices].map(v => ({
          id: v.voiceURI,
          name: v.name,
          lang: v.lang
        }));
        
        voicesRef.current = sortedVoices;
      };
      
      // استدعاء تحديث الأصوات مباشرة وعند تغيرها
      if (synthRef.current.onvoiceschanged !== undefined) {
        synthRef.current.onvoiceschanged = updateVoices;
      }
      
      updateVoices();
      
      // تحميل الصوت المحفوظ سابقاً
      const savedVoice = localStorage.getItem('a11y-voice');
      if (savedVoice) {
        setVoice(savedVoice);
      } else if (voicesRef.current.length > 0) {
        // اختيار صوت عربي تلقائيًا إذا كانت اللغة الحالية عربية
        const isArabic = i18n.language === 'ar' || i18n.language === 'ar-iq';
        const defaultVoice = isArabic 
          ? voicesRef.current.find(v => v.lang.includes('ar'))?.id 
          : voicesRef.current[0].id;
          
        if (defaultVoice) {
          setVoice(defaultVoice);
        }
      }
    }
  }, [i18n.language, setVoice]);
  
  // حفظ إعدادات الصوت
  useEffect(() => {
    localStorage.setItem('a11y-soundEnabled', String(enabled));
    localStorage.setItem('a11y-volume', String(volume));
    
    if (voice) {
      localStorage.setItem('a11y-voice', voice);
    }
  }, [enabled, volume, voice]);
  
  // تشغيل صوت للاختبار
  const playTestSound = () => {
    try {
      // تشغيل صوت تنبيه عادي
      if (audioRef.current) {
        audioRef.current.volume = volume;
        audioRef.current.play().catch(() => {});
      }
      
      // استخدام قارئ النص إذا كان متاحًا
      if (synthRef.current && enabled && voice) {
        synthRef.current.cancel();
        
        const message = i18n.language === 'ar' || i18n.language === 'ar-iq'
          ? 'هذا اختبار للصوت. هل تسمعني؟'
          : 'This is a sound test. Can you hear me?';
          
        const utterance = new SpeechSynthesisUtterance(message);
        const selectedVoice = synthRef.current.getVoices().find(v => v.voiceURI === voice);
        
        if (selectedVoice) {
          utterance.voice = selectedVoice;
          utterance.volume = volume;
          utterance.rate = 1;
          utterance.pitch = 1;
          synthRef.current.speak(utterance);
        }
      }
      
      // إعلان للإخبار عن اختبار الصوت
      announce(t('accessibility.soundTestPlaying', 'جاري تشغيل اختبار الصوت...'), 'polite');
    } catch (error) {
      console.error('Error playing test sound:', error);
    }
  };
  
  return (
    <TabsContent value="sound" className="space-y-6 mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume className="h-5 w-5" />
            {t('accessibility.soundSettings', 'إعدادات الصوت')}
          </CardTitle>
          <CardDescription>
            {t('accessibility.soundDescription', 'تخصيص الإشعارات الصوتية والتعليقات')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sound-feedback">{t('accessibility.soundFeedback', 'التنبيهات الصوتية')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('accessibility.soundFeedbackDescription', 'تفعيل الإشعارات والتعليقات الصوتية')}
                  </p>
                </div>
                <Switch
                  id="sound-feedback"
                  checked={enabled}
                  onCheckedChange={setEnabled}
                  aria-label={t('accessibility.soundFeedback', 'التنبيهات الصوتية')}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="sound-volume">{t('accessibility.volume', 'مستوى الصوت')}</Label>
                  <span className="text-sm w-12 text-end">{Math.round(volume * 100)}%</span>
                </div>
                <Slider
                  id="sound-volume"
                  min={0}
                  max={1}
                  step={0.05}
                  value={[volume]}
                  onValueChange={(vals) => setVolume(vals[0])}
                  disabled={!enabled}
                  aria-label={t('accessibility.volume', 'مستوى الصوت')}
                />
              </div>

              <Button 
                variant="secondary" 
                size="sm" 
                className="w-auto self-start mt-2"
                onClick={playTestSound}
                disabled={!enabled}
              >
                <Play className="h-4 w-4 me-2" />
                {t('accessibility.testSound', 'اختبار الصوت')}
              </Button>
            </div>

            <div className="space-y-2 pt-4 border-t">
              <Label>{t('accessibility.voiceSelection', 'اختيار الصوت')}</Label>
              <RadioGroup 
                value={voice} 
                onValueChange={setVoice}
                className="space-y-2 mt-2"
                disabled={!enabled}
              >
                {voicesRef.current.length > 0 ? (
                  voicesRef.current.map((voiceOption) => (
                    <div key={voiceOption.id} className="flex items-center space-x-2 rtl:space-x-reverse">
                      <RadioGroupItem value={voiceOption.id} id={voiceOption.id} />
                      <Label htmlFor={voiceOption.id} className="flex-1">
                        {voiceOption.name} <span className="text-xs text-muted-foreground">({voiceOption.lang})</span>
                      </Label>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {t('accessibility.noVoicesAvailable', 'لا توجد أصوات متاحة على جهازك')}
                  </p>
                )}
              </RadioGroup>
            </div>
          </div>
          
          {/* عنصر الصوت المخفي للاختبار */}
          <audio 
            ref={audioRef} 
            src="/sounds/notification.mp3" 
            preload="auto"
            className="hidden"
          />
        </CardContent>
      </Card>
    </TabsContent>
  );
}
