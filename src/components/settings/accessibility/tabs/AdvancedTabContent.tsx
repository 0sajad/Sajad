
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AccessibilityToggle } from "@/components/ui/accessibility/accessibility-toggle";
import { useA11y } from "@/hooks/useA11y";
import { Keyboard, Settings, Zap } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AdvancedTabContent() {
  const { t } = useTranslation();
  const { 
    soundFeedback, setSoundFeedback, 
    readingGuide, setReadingGuide 
  } = useA11y();
  
  const experimentalFeatures = [
    {
      id: "sound-feedback",
      label: t('accessibility.soundFeedback', 'ردود صوتية'),
      description: t('accessibility.soundFeedbackDescription', 'تشغيل أصوات عند استخدام الميزات واستلام الإشعارات'),
      icon: Zap,
      checked: soundFeedback,
      onChange: setSoundFeedback,
      shortcutKey: "Alt+S",
    },
    {
      id: "reading-guide",
      label: t('accessibility.readingGuide', 'دليل القراءة'),
      description: t('accessibility.readingGuideDescription', 'إظهار دليل للمساعدة في تتبع النص أثناء القراءة'),
      icon: Keyboard,
      checked: readingGuide,
      onChange: setReadingGuide,
      shortcutKey: "Alt+R",
    }
  ];
  
  return (
    <TabsContent value="advanced" className="space-y-6 mt-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('accessibility.experimentalFeatures', 'ميزات تجريبية')}</CardTitle>
          <CardDescription>
            {t('accessibility.experimentalFeaturesDescription', 'ميزات متقدمة تحت التطوير')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="mb-4">
            <Settings className="h-4 w-4" />
            <AlertTitle>{t('accessibility.betaFeatures', 'ميزات تجريبية')}</AlertTitle>
            <AlertDescription>
              {t('accessibility.betaFeaturesDescription', 'هذه الميزات لا تزال قيد التطوير وقد لا تعمل بشكل مثالي في جميع المتصفحات.')}
            </AlertDescription>
          </Alert>
          
          <div className="space-y-2">
            {experimentalFeatures.map((feature) => (
              <AccessibilityToggle
                key={feature.id}
                id={feature.id}
                label={feature.label}
                icon={feature.icon}
                checked={feature.checked}
                onChange={feature.onChange}
                shortcutKey={feature.shortcutKey}
                description={feature.description}
              />
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('accessibility.comingFeatures', 'ميزات قادمة')}</CardTitle>
          <CardDescription>
            {t('accessibility.comingFeaturesDescription', 'ميزات ستتوفر في الإصدارات المستقبلية')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-2 list-disc list-inside text-sm text-muted-foreground">
            <li>{t('accessibility.voiceNavigation', 'التنقل الصوتي')}</li>
            <li>{t('accessibility.customKeyboardShortcuts', 'اختصارات لوحة المفاتيح المخصصة')}</li>
            <li>{t('accessibility.automaticAltText', 'نص بديل تلقائي للصور')}</li>
            <li>{t('accessibility.aiAccessibilityAssistant', 'مساعد الذكاء الاصطناعي لإمكانية الوصول')}</li>
          </ul>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
