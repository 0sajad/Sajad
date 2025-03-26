
import React from "react";
import { useMode } from "@/context/ModeContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { InfoCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export function FeatureManagement() {
  const { features, toggleFeature, isDeveloperMode } = useMode();
  const { t } = useTranslation();
  
  const featureGroups = [
    {
      title: t('developer.features.ai.title', 'ميزات الذكاء الاصطناعي'),
      items: [
        {
          id: 'aiAssistant',
          name: t('developer.features.ai.assistant', 'المساعد الذكي'),
          description: t('developer.features.ai.assistantDesc', 'مساعد ذكي يعمل بتقنية الذكاء الاصطناعي'),
          badge: 'أساسي'
        },
        {
          id: 'autoHealing',
          name: t('developer.features.ai.autoHealing', 'إصلاح تلقائي'),
          description: t('developer.features.ai.autoHealingDesc', 'إصلاح مشاكل الشبكة تلقائيًا'),
          badge: 'متقدم'
        },
        {
          id: 'networkIsolation',
          name: t('developer.features.ai.isolation', 'عزل الأجهزة المشبوهة'),
          description: t('developer.features.ai.isolationDesc', 'عزل الأجهزة المشبوهة تلقائيًا'),
          badge: 'أمان'
        },
      ]
    },
    {
      title: t('developer.features.network.title', 'ميزات الشبكة'),
      items: [
        {
          id: 'networkMonitoring',
          name: t('developer.features.network.monitoring', 'مراقبة الشبكة'),
          description: t('developer.features.network.monitoringDesc', 'مراقبة حالة واستخدام الشبكة'),
          badge: 'أساسي'
        },
        {
          id: 'dnsOptimization',
          name: t('developer.features.network.dns', 'تحسين خوادم DNS'),
          description: t('developer.features.network.dnsDesc', 'تحسين أداء تصفح الإنترنت'),
        },
        {
          id: 'multiNetwork',
          name: t('developer.features.network.multi', 'دمج عدة شبكات'),
          description: t('developer.features.network.multiDesc', 'استخدام عدة شبكات في وقت واحد'),
          badge: 'متقدم'
        },
        {
          id: 'trafficShaping',
          name: t('developer.features.network.traffic', 'توجيه ذكي لحركة البيانات'),
          description: t('developer.features.network.trafficDesc', 'توزيع النطاق الترددي حسب الأولوية'),
        },
        {
          id: 'latencyHeatmap',
          name: t('developer.features.network.latency', 'خريطة تأخير الشبكة'),
          description: t('developer.features.network.latencyDesc', 'عرض مناطق الشبكة الأسرع والأبطأ'),
        },
      ]
    },
    {
      title: t('developer.features.security.title', 'ميزات الأمان'),
      items: [
        {
          id: 'advancedSecurity',
          name: t('developer.features.security.advanced', 'أمان متقدم'),
          description: t('developer.features.security.advancedDesc', 'حماية متقدمة للشبكة والأجهزة'),
          badge: 'أساسي'
        },
        {
          id: 'invisibleMode',
          name: t('developer.features.security.invisible', 'وضع التخفي'),
          description: t('developer.features.security.invisibleDesc', 'جعل الجهاز غير قابل للكشف'),
        },
        {
          id: 'darkWebProtection',
          name: t('developer.features.security.darkweb', 'الحماية من الشبكة المظلمة'),
          description: t('developer.features.security.darkwebDesc', 'منع الاتصالات المشبوهة'),
          badge: 'متقدم'
        },
      ]
    },
    {
      title: t('developer.features.system.title', 'ميزات النظام'),
      items: [
        {
          id: 'zeroPower',
          name: t('developer.features.system.zeroPower', 'وضع استهلاك منخفض'),
          description: t('developer.features.system.zeroPowerDesc', 'تقليل استهلاك موارد النظام'),
        },
        {
          id: 'deviceHeat',
          name: t('developer.features.system.heat', 'مراقبة حرارة الأجهزة'),
          description: t('developer.features.system.heatDesc', 'مراقبة والتحذير من ارتفاع الحرارة'),
        },
      ]
    },
    {
      title: t('developer.features.ui.title', 'ميزات الواجهة'),
      items: [
        {
          id: 'holographicUI',
          name: t('developer.features.ui.holographic', 'واجهة ثلاثية الأبعاد'),
          description: t('developer.features.ui.holographicDesc', 'عرض البيانات كمجسمات تفاعلية'),
          badge: 'متقدم'
        },
      ]
    },
  ];
  
  return (
    <div className="space-y-6">
      {featureGroups.map((group, groupIndex) => (
        <Card key={groupIndex} className="overflow-hidden">
          <CardHeader className="bg-muted/50 pb-3">
            <CardTitle className="text-lg font-tajawal">{group.title}</CardTitle>
          </CardHeader>
          
          <CardContent className="p-0">
            {group.items.map((feature, featureIndex) => (
              <div key={featureIndex}>
                {featureIndex > 0 && <Separator />}
                <div className="flex items-center justify-between p-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Label className="font-tajawal text-base">{feature.name}</Label>
                      {feature.badge && (
                        <Badge variant="outline" className="ml-2 text-xs font-tajawal">
                          {feature.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground font-tajawal">{feature.description}</p>
                  </div>
                  <Switch
                    checked={features[feature.id] || false}
                    onCheckedChange={() => toggleFeature(feature.id)}
                    disabled={!isDeveloperMode || (feature.id === 'aiAssistant' || feature.id === 'networkMonitoring' || feature.id === 'advancedSecurity')}
                  />
                </div>
              </div>
            ))}
          </CardContent>
          
          {groupIndex === 0 && (
            <CardFooter className="bg-blue-50 p-3 flex items-start">
              <InfoCircle className="text-blue-500 mr-2 mt-0.5 h-4 w-4 shrink-0" />
              <p className="text-xs text-blue-700 font-tajawal">
                {t('developer.features.coreNotice', 'الميزات الأساسية لا يمكن تعطيلها لضمان عمل النظام بشكل صحيح')}
              </p>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
}
