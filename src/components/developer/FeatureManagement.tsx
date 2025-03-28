
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMode } from "@/context/ModeContext";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { CommunicationTools } from "./CommunicationTools";

export function FeatureManagement() {
  const { features, toggleFeature, applyConfiguration, isSyncing } = useMode();
  const { t } = useTranslation();
  
  // Group features by category
  const featureCategories = {
    core: ["networkMonitoring", "advancedSecurity", "aiAssistant", "dnsOptimization", "autoHealing"],
    advanced: ["zeroPower", "holographicUI", "networkIsolation", "latencyHeatmap", "trafficShaping", "invisibleMode"],
    experimental: ["networkCloning", "multiNetwork", "signalBooster", "darkWebProtection", "deviceHeat"]
  };
  
  const getFeatureLabel = (featureId: string) => {
    // Map feature IDs to readable labels
    const labels: Record<string, string> = {
      networkMonitoring: t('developer.features.networkMonitoring', 'شبكة المراقبة'),
      advancedSecurity: t('developer.features.advancedSecurity', 'الأمان المتقدم'),
      aiAssistant: t('developer.features.aiAssistant', 'مساعد الذكاء الاصطناعي'),
      zeroPower: t('developer.features.zeroPower', 'وضع الطاقة الصفرية'),
      holographicUI: t('developer.features.holographicUI', 'واجهة ثلاثية الأبعاد'),
      networkIsolation: t('developer.features.networkIsolation', 'عزل الشبكة'),
      dnsOptimization: t('developer.features.dnsOptimization', 'تحسين DNS'),
      latencyHeatmap: t('developer.features.latencyHeatmap', 'خريطة حرارة التأخير'),
      trafficShaping: t('developer.features.trafficShaping', 'تشكيل حركة المرور'),
      invisibleMode: t('developer.features.invisibleMode', 'وضع التخفي'),
      networkCloning: t('developer.features.networkCloning', 'استنساخ الشبكة'),
      multiNetwork: t('developer.features.multiNetwork', 'الشبكات المتعددة'),
      autoHealing: t('developer.features.autoHealing', 'الإصلاح التلقائي'),
      signalBooster: t('developer.features.signalBooster', 'معزز الإشارة'),
      darkWebProtection: t('developer.features.darkWebProtection', 'حماية الويب المظلم'),
      deviceHeat: t('developer.features.deviceHeat', 'حرارة الجهاز')
    };
    
    return labels[featureId] || featureId;
  };
  
  const getFeatureDescription = (featureId: string) => {
    // Map feature IDs to descriptions
    const descriptions: Record<string, string> = {
      networkMonitoring: t('developer.features.networkMonitoringDesc', 'مراقبة نشاط الشبكة وتشخيص المشكلات بشكل استباقي'),
      advancedSecurity: t('developer.features.advancedSecurityDesc', 'حماية متقدمة ضد التهديدات والهجمات الإلكترونية'),
      aiAssistant: t('developer.features.aiAssistantDesc', 'مساعد ذكي لتحليل الشبكة وحل المشكلات'),
      zeroPower: t('developer.features.zeroPowerDesc', 'يعمل بدون استهلاك طاقة إضافية من النظام'),
      holographicUI: t('developer.features.holographicUIDesc', 'واجهة مستخدم ثلاثية الأبعاد مع تجسيد للبيانات'),
      networkIsolation: t('developer.features.networkIsolationDesc', 'عزل أجزاء من الشبكة للأمان والأداء'),
      dnsOptimization: t('developer.features.dnsOptimizationDesc', 'تحسين أداء وأمان خوادم DNS'),
      latencyHeatmap: t('developer.features.latencyHeatmapDesc', 'خريطة حرارية لعرض التأخير عبر الشبكة'),
      trafficShaping: t('developer.features.trafficShapingDesc', 'تحسين توزيع حركة المرور على الشبكة'),
      invisibleMode: t('developer.features.invisibleModeDesc', 'إخفاء الأجهزة عن المسح الشبكي'),
      networkCloning: t('developer.features.networkCloningDesc', 'إنشاء نسخة افتراضية من الشبكة للاختبار'),
      multiNetwork: t('developer.features.multiNetworkDesc', 'إدارة عدة شبكات من واجهة موحدة'),
      autoHealing: t('developer.features.autoHealingDesc', 'إصلاح مشاكل الشبكة تلقائياً دون تدخل بشري'),
      signalBooster: t('developer.features.signalBoosterDesc', 'تعزيز قوة إشارة الشبكة اللاسلكية'),
      darkWebProtection: t('developer.features.darkWebProtectionDesc', 'حماية من تهديدات الإنترنت المظلم'),
      deviceHeat: t('developer.features.deviceHeatDesc', 'رصد درجة حرارة الأجهزة الشبكية')
    };
    
    return descriptions[featureId] || '';
  };
  
  const handleFeatureToggle = (featureId: string) => {
    toggleFeature(featureId);
  };
  
  return (
    <Tabs defaultValue="core">
      <TabsList className="grid grid-cols-4 mb-6">
        <TabsTrigger value="core" className="font-tajawal">
          {t('developer.features.coreFeaturesTab', 'الميزات الأساسية')}
        </TabsTrigger>
        <TabsTrigger value="advanced" className="font-tajawal">
          {t('developer.features.advancedFeaturesTab', 'الميزات المتقدمة')}
        </TabsTrigger>
        <TabsTrigger value="experimental" className="font-tajawal">
          {t('developer.features.experimentalFeaturesTab', 'الميزات التجريبية')}
        </TabsTrigger>
        <TabsTrigger value="tools" className="font-tajawal">
          {t('developer.features.communicationToolsTab', 'أدوات الاتصالات')}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="core">
        <div className="space-y-4">
          {featureCategories.core.map((featureId) => (
            <div key={featureId} className="flex items-start justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <div className="flex items-center">
                  <Label htmlFor={featureId} className="font-tajawal text-base font-medium">
                    {getFeatureLabel(featureId)}
                  </Label>
                  <Badge className="ml-2 bg-green-500 hover:bg-green-600">
                    {t('developer.features.coreTag', 'أساسي')}
                  </Badge>
                </div>
                <p className="text-muted-foreground font-tajawal text-sm">
                  {getFeatureDescription(featureId)}
                </p>
              </div>
              
              <Switch
                id={featureId}
                checked={features[featureId]}
                onCheckedChange={() => handleFeatureToggle(featureId)}
              />
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button onClick={applyConfiguration} disabled={isSyncing}>
            {isSyncing ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                {t('developer.features.applying', 'جارٍ التطبيق...')}
              </div>
            ) : (
              t('developer.features.applyChanges', 'تطبيق التغييرات')
            )}
          </Button>
        </div>
      </TabsContent>
      
      <TabsContent value="advanced">
        <div className="space-y-4">
          {featureCategories.advanced.map((featureId) => (
            <div key={featureId} className="flex items-start justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <div className="flex items-center">
                  <Label htmlFor={featureId} className="font-tajawal text-base font-medium">
                    {getFeatureLabel(featureId)}
                  </Label>
                  <Badge className="ml-2 bg-blue-500 hover:bg-blue-600">
                    {t('developer.features.advancedTag', 'متقدم')}
                  </Badge>
                </div>
                <p className="text-muted-foreground font-tajawal text-sm">
                  {getFeatureDescription(featureId)}
                </p>
              </div>
              
              <Switch
                id={featureId}
                checked={features[featureId]}
                onCheckedChange={() => handleFeatureToggle(featureId)}
              />
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button onClick={applyConfiguration} disabled={isSyncing}>
            {isSyncing ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                {t('developer.features.applying', 'جارٍ التطبيق...')}
              </div>
            ) : (
              t('developer.features.applyChanges', 'تطبيق التغييرات')
            )}
          </Button>
        </div>
      </TabsContent>
      
      <TabsContent value="experimental">
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-md p-3 mb-4">
          <p className="text-sm font-tajawal">
            {t('developer.features.experimentalWarning', 'تحذير: الميزات التجريبية قد تكون غير مستقرة وقد تؤثر على أداء النظام.')}
          </p>
        </div>
        
        <div className="space-y-4">
          {featureCategories.experimental.map((featureId) => (
            <div key={featureId} className="flex items-start justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <div className="flex items-center">
                  <Label htmlFor={featureId} className="font-tajawal text-base font-medium">
                    {getFeatureLabel(featureId)}
                  </Label>
                  <Badge className="ml-2 bg-amber-500 hover:bg-amber-600">
                    {t('developer.features.experimentalTag', 'تجريبي')}
                  </Badge>
                </div>
                <p className="text-muted-foreground font-tajawal text-sm">
                  {getFeatureDescription(featureId)}
                </p>
              </div>
              
              <Switch
                id={featureId}
                checked={features[featureId]}
                onCheckedChange={() => handleFeatureToggle(featureId)}
              />
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button onClick={applyConfiguration} disabled={isSyncing}>
            {isSyncing ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                {t('developer.features.applying', 'جارٍ التطبيق...')}
              </div>
            ) : (
              t('developer.features.applyChanges', 'تطبيق التغييرات')
            )}
          </Button>
        </div>
      </TabsContent>
      
      <TabsContent value="tools">
        <CommunicationTools />
      </TabsContent>
    </Tabs>
  );
}
