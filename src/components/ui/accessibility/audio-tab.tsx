
import React, { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { AccessibilityToggle } from "./accessibility-toggle";
import { Volume2, Mic, VolumeX, Bell } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useA11yContext } from "@/hooks/accessibility/useA11yContext";
import { ArabicTextEnhancer } from "@/components/text/ArabicTextEnhancer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AudioTabProps {
  soundFeedback: boolean;
  setSoundFeedback: (value: boolean) => void;
}

/**
 * تبويب الصوت لإعدادات إمكانية الوصول
 */
export function AudioTab({ soundFeedback, setSoundFeedback }: AudioTabProps) {
  const { t } = useTranslation();
  const a11y = useA11yContext();
  const [volume, setVolume] = useState(80);
  const [voiceType, setVoiceType] = useState("default");
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
  
  // معالج تغيير الصوت
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    
    // تعيين مستوى الصوت عالميًا
    if (typeof window !== 'undefined') {
      localStorage.setItem('a11y-volume', newVolume.toString());
      
      // محاكاة تطبيق مستوى الصوت
      if (newVolume > 0 && soundFeedback) {
        a11y?.playSound('info');
      }
    }
  };
  
  // معالج تغيير نوع الصوت
  const handleVoiceTypeChange = (value: string) => {
    setVoiceType(value);
    if (a11y) {
      a11y.announce(t('accessibility.voiceChanged', 'تم تغيير نوع الصوت'), 'polite');
    }
  };
  
  // معالج تبديل تحويل النص إلى كلام
  const handleSpeechToggle = (checked: boolean) => {
    setIsSpeechEnabled(checked);
    if (a11y) {
      if (checked) {
        a11y.announce(t('accessibility.speechEnabled', 'تم تفعيل تحويل النص إلى كلام'), 'polite');
      } else {
        a11y.announce(t('accessibility.speechDisabled', 'تم تعطيل تحويل النص إلى كلام'), 'polite');
      }
    }
  };
  
  // اختبار تشغيل الصوت
  const playTestSound = () => {
    if (a11y) {
      a11y.playSound('notification');
      a11y.announce(t('accessibility.testSoundPlayed', 'تم تشغيل صوت الاختبار'), 'polite');
    }
  };
  
  return (
    <TabsContent value="audio" className="space-y-4 py-2">
      <AccessibilityToggle
        id="sound-feedback-toggle"
        label={t('accessibility.soundFeedback', 'ردود صوتية')}
        description={t('accessibility.soundFeedbackDesc', 'تشغيل أصوات عند تنفيذ إجراءات')}
        icon={Bell}
        checked={soundFeedback}
        onChange={setSoundFeedback}
      />
      
      <AccessibilityToggle
        id="speech-toggle"
        label={t('accessibility.textToSpeech', 'تحويل النص إلى كلام')}
        description={t('accessibility.textToSpeechDesc', 'قراءة النص بصوت عالٍ عند تحديده')}
        icon={Mic}
        checked={isSpeechEnabled}
        onChange={handleSpeechToggle}
      />
      
      <div className="space-y-2 pt-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="volume-slider">
            <ArabicTextEnhancer>{t('accessibility.volume', 'مستوى الصوت')}</ArabicTextEnhancer>
          </Label>
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon"
              className="h-6 w-6"
              onClick={() => soundFeedback && volume > 0 ? setSoundFeedback(false) : setSoundFeedback(true)}
              aria-label={soundFeedback && volume > 0 
                ? t('accessibility.muteAudio', 'كتم الصوت') 
                : t('accessibility.unmuteAudio', 'إلغاء كتم الصوت')
              }
            >
              {soundFeedback && volume > 0 ? (
                <Volume2 className="h-4 w-4" />
              ) : (
                <VolumeX className="h-4 w-4" />
              )}
            </Button>
            <span className="text-sm font-mono w-8 text-right">{volume}%</span>
          </div>
        </div>
        <Slider
          id="volume-slider"
          defaultValue={[volume]}
          max={100}
          min={0}
          step={5}
          onValueChange={handleVolumeChange}
          aria-label={t('accessibility.volume', 'مستوى الصوت')}
          disabled={!soundFeedback}
        />
        <div className="text-xs text-muted-foreground mt-1">
          <ArabicTextEnhancer>
            {soundFeedback 
              ? t('accessibility.volumeInfo', 'ضبط مستوى صوت الإشعارات وردود الفعل الصوتية') 
              : t('accessibility.volumeDisabled', 'قم بتفعيل ردود الفعل الصوتية أولاً')}
          </ArabicTextEnhancer>
        </div>
      </div>
      
      <div className="space-y-2 pt-4">
        <Label htmlFor="voice-type">
          <ArabicTextEnhancer>{t('accessibility.voiceType', 'نوع الصوت')}</ArabicTextEnhancer>
        </Label>
        <Select
          value={voiceType}
          onValueChange={handleVoiceTypeChange}
          disabled={!isSpeechEnabled}
        >
          <SelectTrigger id="voice-type">
            <SelectValue placeholder={t('accessibility.selectVoice', 'اختر الصوت')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">
              <ArabicTextEnhancer>{t('accessibility.defaultVoice', 'الصوت الافتراضي للجهاز')}</ArabicTextEnhancer>
            </SelectItem>
            <SelectItem value="female-ar">
              <ArabicTextEnhancer>{t('accessibility.femaleArabic', 'صوت أنثوي - عربي')}</ArabicTextEnhancer>
            </SelectItem>
            <SelectItem value="male-ar">
              <ArabicTextEnhancer>{t('accessibility.maleArabic', 'صوت ذكوري - عربي')}</ArabicTextEnhancer>
            </SelectItem>
            <SelectItem value="female-en">
              <ArabicTextEnhancer>{t('accessibility.femaleEnglish', 'صوت أنثوي - إنجليزي')}</ArabicTextEnhancer>
            </SelectItem>
            <SelectItem value="male-en">
              <ArabicTextEnhancer>{t('accessibility.maleEnglish', 'صوت ذكوري - إنجليزي')}</ArabicTextEnhancer>
            </SelectItem>
          </SelectContent>
        </Select>
        <div className="text-xs text-muted-foreground mt-1">
          <ArabicTextEnhancer>
            {isSpeechEnabled 
              ? t('accessibility.voiceInfo', 'يتم استخدام هذا الصوت لقراءة المحتوى') 
              : t('accessibility.speechDisabledInfo', 'قم بتفعيل تحويل النص إلى كلام أولاً')}
          </ArabicTextEnhancer>
        </div>
      </div>
      
      <div className="pt-4">
        <Button 
          variant="outline" 
          onClick={playTestSound}
          disabled={!soundFeedback || volume === 0}
          className="w-full"
        >
          <Bell className="h-4 w-4 mr-2" />
          <ArabicTextEnhancer>{t('accessibility.testSound', 'اختبار الصوت')}</ArabicTextEnhancer>
        </Button>
      </div>
    </TabsContent>
  );
}
