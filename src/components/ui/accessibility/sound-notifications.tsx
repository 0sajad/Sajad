
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Volume2, VolumeX, Bell, Play } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface SoundNotificationsProps {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
  volume: number;
  setVolume: (value: number) => void;
  voice?: string;
  setVoice?: (value: string) => void;
}

export function SoundNotifications({
  enabled,
  setEnabled,
  volume,
  setVolume,
  voice,
  setVoice
}: SoundNotificationsProps) {
  const { t, i18n } = useTranslation();
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [filteredVoices, setFilteredVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  // استعلام عن الأصوات المتاحة
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // تحميل الأصوات المتاحة
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          setAvailableVoices(voices);
        }
      };
      
      // الاستماع لحدث تغيير الأصوات
      window.speechSynthesis.onvoiceschanged = loadVoices;
      
      // محاولة تحميل الأصوات مباشرة (قد تكون محملة بالفعل)
      loadVoices();
      
      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  }, []);
  
  // تصفية الأصوات حسب اللغة الحالية
  useEffect(() => {
    if (availableVoices.length > 0) {
      // تحديد رمز اللغة للتصفية
      const langCode = i18n.language.startsWith('ar') ? 'ar' : i18n.language;
      
      // تصفية الأصوات حسب اللغة
      const langVoices = availableVoices.filter(voice => 
        voice.lang.startsWith(langCode) || voice.lang.startsWith(langCode.split('-')[0])
      );
      
      // إذا لم تكن هناك أصوات متاحة للغة الحالية، استخدم كل الأصوات
      setFilteredVoices(langVoices.length > 0 ? langVoices : availableVoices);
      
      // تعيين الصوت الافتراضي إذا لم يتم تعيينه بعد
      if (setVoice && (!voice || !availableVoices.some(v => v.name === voice))) {
        const defaultVoice = langVoices.length > 0 ? langVoices[0].name : availableVoices[0]?.name;
        if (defaultVoice) {
          setVoice(defaultVoice);
        }
      }
    }
  }, [availableVoices, i18n.language, voice, setVoice]);
  
  // اختبار الإشعار الصوتي
  const testSoundNotification = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && enabled) {
      const utterance = new SpeechSynthesisUtterance(
        i18n.language.startsWith('ar')
          ? 'هذا اختبار للإشعارات الصوتية'
          : 'This is a test for sound notifications'
      );
      
      // تعيين الصوت المحدد
      if (voice) {
        const selectedVoice = availableVoices.find(v => v.name === voice);
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
      }
      
      // تعيين مستوى الصوت
      utterance.volume = volume;
      
      // تعيين اللغة
      if (i18n.language) {
        utterance.lang = i18n.language;
      }
      
      // تشغيل الإشعار الصوتي
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center">
          <Bell className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" aria-hidden="true" />
          {t('accessibility.soundNotifications', 'الإشعارات الصوتية')}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* تفعيل الإشعارات الصوتية */}
        <div className="flex items-center justify-between">
          <Label htmlFor="soundEnabled" className="text-sm cursor-pointer">
            {t('accessibility.enableSoundNotifications', 'تفعيل الإشعارات الصوتية')}
          </Label>
          <Switch 
            id="soundEnabled"
            checked={enabled}
            onCheckedChange={setEnabled}
          />
        </div>
        
        {enabled && (
          <>
            <Separator />
            
            {/* مستوى الصوت */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="volume" className="text-sm flex items-center">
                  {volume === 0 ? (
                    <VolumeX className="h-3.5 w-3.5 mr-1.5 rtl:ml-1.5 rtl:mr-0" aria-hidden="true" />
                  ) : (
                    <Volume2 className="h-3.5 w-3.5 mr-1.5 rtl:ml-1.5 rtl:mr-0" aria-hidden="true" />
                  )}
                  {t('accessibility.volume', 'مستوى الصوت')}
                </Label>
                <span className="text-xs text-muted-foreground">{Math.round(volume * 100)}%</span>
              </div>
              <Slider
                id="volume"
                min={0}
                max={1}
                step={0.1}
                value={[volume]}
                onValueChange={(values) => setVolume(values[0])}
                disabled={!enabled}
              />
            </div>
            
            {/* اختيار الصوت */}
            {setVoice && (
              <div className="space-y-2">
                <Label htmlFor="voice" className="text-sm">
                  {t('accessibility.voice', 'الصوت')}
                </Label>
                <Select 
                  value={voice} 
                  onValueChange={setVoice}
                  disabled={!enabled || filteredVoices.length === 0}
                >
                  <SelectTrigger id="voice">
                    <SelectValue placeholder={t('accessibility.selectVoice', 'اختر الصوت')} />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredVoices.map((v) => (
                      <SelectItem key={v.name} value={v.name}>
                        {v.name} ({v.lang})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {/* اختبار الصوت */}
            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={testSoundNotification}
                disabled={!enabled}
                className="w-full"
              >
                <Play className="h-3.5 w-3.5 mr-1.5 rtl:ml-1.5 rtl:mr-0" />
                {t('accessibility.testSound', 'اختبار الصوت')}
              </Button>
            </div>
          </>
        )}
        
        {/* رسالة عدم الدعم */}
        {typeof window !== 'undefined' && !('speechSynthesis' in window) && (
          <div className="text-sm text-destructive">
            {t('accessibility.speechSynthesisNotSupported', 'تقنية تحويل النص إلى كلام غير مدعومة في متصفحك.')}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
