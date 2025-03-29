
import React from "react";
import { useMode } from "@/context/ModeContext";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, RefreshCw } from "lucide-react";

export function FeatureManagement() {
  const { t } = useTranslation();
  const { features, updateFeature, applyConfiguration, isSyncing } = useMode();
  
  const featureGroups = {
    core: ["networkMonitoring", "advancedSecurity", "aiAssistant"],
    advanced: [
      "zeroPower", "holographicUI", "networkIsolation", "dnsOptimization", 
      "latencyHeatmap", "trafficShaping", "invisibleMode", "networkCloning",
      "multiNetwork", "autoHealing", "signalBooster", "darkWebProtection", "deviceHeat"
    ],
    analytics: [
      "dataAnalysis", "elasticsearchIntegration", "prometheusMonitoring", 
      "influxDBIntegration", "aiAnalytics", "kafkaStreaming", "sparkProcessing", 
      "securityAnalysis", "networkPacketAnalysis", "cloudIntegration", 
      "customScripting", "dataVisualization"
    ]
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-md p-3 mb-4 flex items-start">
        <AlertCircle className="text-blue-500 mr-2 mt-0.5 h-5 w-5 shrink-0" />
        <p className="text-sm">
          {t('developer.features.warning', 'بعض الميزات قد تتداخل مع بعضها البعض. تأكد من التوافق قبل تطبيق التغييرات على وضع العميل.')}
        </p>
      </div>
      
      <div className="flex justify-end mb-4">
        <Button 
          onClick={applyConfiguration} 
          disabled={isSyncing}
          className="bg-octaBlue-600 hover:bg-octaBlue-700"
        >
          {isSyncing ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              {t('developer.features.syncing', 'جاري التطبيق...')}
            </>
          ) : (
            t('developer.features.apply', 'تطبيق التكوين على وضع العميل')
          )}
        </Button>
      </div>
      
      <div className="space-y-6">
        {/* الميزات الأساسية */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold font-tajawal">
            {t('developer.features.core.title', 'الميزات الأساسية')}
          </h3>
          
          <div className="space-y-4">
            {featureGroups.core.map((featureId) => (
              <div key={featureId} className="flex items-center justify-between">
                <Label 
                  htmlFor={featureId} 
                  className="font-tajawal cursor-pointer"
                >
                  {t(`developer.features.${featureId}.name`, featureId)}
                </Label>
                <Switch
                  id={featureId}
                  checked={features[featureId] || false}
                  onCheckedChange={(checked) => updateFeature(featureId, checked)}
                />
              </div>
            ))}
          </div>
        </div>
        
        <Separator />
        
        {/* الميزات المتقدمة */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold font-tajawal">
            {t('developer.features.advanced.title', 'الميزات المتقدمة')}
          </h3>
          
          <div className="space-y-4">
            {featureGroups.advanced.map((featureId) => (
              <div key={featureId} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label 
                    htmlFor={featureId} 
                    className="font-tajawal cursor-pointer"
                  >
                    {t(`developer.features.${featureId}.name`, featureId)}
                  </Label>
                  
                  {featureId === "zeroPower" && (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      {t('developer.features.new', 'جديد')}
                    </Badge>
                  )}
                  
                  {featureId === "holographicUI" && (
                    <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                      {t('developer.features.experimental', 'تجريبي')}
                    </Badge>
                  )}
                </div>
                <Switch
                  id={featureId}
                  checked={features[featureId] || false}
                  onCheckedChange={(checked) => updateFeature(featureId, checked)}
                />
              </div>
            ))}
          </div>
        </div>
        
        <Separator />
        
        {/* ميزات تحليل البيانات */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold font-tajawal">
            {t('developer.features.analytics.title', 'ميزات تحليل البيانات')}
          </h3>
          
          <div className="space-y-4">
            {featureGroups.analytics.map((featureId) => (
              <div key={featureId} className="flex items-center justify-between">
                <Label 
                  htmlFor={featureId} 
                  className="font-tajawal cursor-pointer"
                >
                  {t(`developer.features.${featureId}.name`, featureId)}
                </Label>
                <Switch
                  id={featureId}
                  checked={features[featureId] || false}
                  onCheckedChange={(checked) => updateFeature(featureId, checked)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
