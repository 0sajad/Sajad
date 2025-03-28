
import React, { useState } from "react";
import { useMode } from "@/context/ModeContext";
import { useTranslation } from "react-i18next";
import { Switch } from "@/components/ui/switch";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Network, 
  Shield, 
  Zap, 
  Cpu, 
  BrainCircuit,
  Database, 
  BarChart, 
  Cloud, 
  ArrowUpDown, 
  Search
} from "lucide-react";

export function FeatureManagement() {
  const { features, toggleFeature, isDeveloperMode } = useMode();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("core");
  
  // وصف الميزات لعرضها في واجهة المستخدم
  const featureDescriptions: Record<string, { 
    description: string, 
    category: string, 
    icon: React.ReactNode,
    dependencies?: string[],
    incompatible?: string[]
  }> = {
    // الميزات الأساسية
    networkMonitoring: { 
      description: "مراقبة شبكات الاتصال وتحليل الأداء", 
      category: "core", 
      icon: <Network size={18} /> 
    },
    advancedSecurity: { 
      description: "حماية متقدمة للشبكات ضد الهجمات", 
      category: "core", 
      icon: <Shield size={18} /> 
    },
    aiAssistant: { 
      description: "مساعد ذكي لتحليل وحل مشاكل الشبكة", 
      category: "core", 
      icon: <BrainCircuit size={18} /> 
    },
    dnsOptimization: { 
      description: "تحسين أداء DNS وتسريع الاتصال", 
      category: "core", 
      icon: <Zap size={18} /> 
    },
    autoHealing: { 
      description: "إصلاح تلقائي للمشاكل المكتشفة", 
      category: "core", 
      icon: <Zap size={18} /> 
    },
    
    // الميزات المتقدمة
    holographicUI: { 
      description: "واجهة مستخدم ثلاثية الأبعاد لتصور الشبكة", 
      category: "advanced", 
      icon: <Cpu size={18} />,
      dependencies: ["latencyHeatmap"] 
    },
    latencyHeatmap: { 
      description: "خريطة حرارية لتأخير الشبكة في الوقت الحقيقي", 
      category: "advanced", 
      icon: <Network size={18} /> 
    },
    networkIsolation: { 
      description: "عزل الأجهزة المشبوهة تلقائيًا", 
      category: "advanced", 
      icon: <Shield size={18} />,
      dependencies: ["advancedSecurity"] 
    },
    trafficShaping: { 
      description: "تشكيل حركة المرور لتحسين الأداء", 
      category: "advanced", 
      icon: <ArrowUpDown size={18} /> 
    },
    invisibleMode: { 
      description: "إخفاء الأجهزة على الشبكة من الفحص الخارجي", 
      category: "advanced", 
      icon: <Shield size={18} />,
      incompatible: ["networkCloning"] 
    },
    networkCloning: { 
      description: "استنساخ بيئة الشبكة الحالية للاختبار", 
      category: "advanced", 
      icon: <Cpu size={18} />,
      incompatible: ["invisibleMode"] 
    },
    signalBooster: { 
      description: "تعزيز إشارة الشبكة اللاسلكية", 
      category: "advanced", 
      icon: <Zap size={18} /> 
    },
    darkWebProtection: { 
      description: "حماية من تهديدات الإنترنت المظلم", 
      category: "advanced", 
      icon: <Shield size={18} />,
      dependencies: ["advancedSecurity"] 
    },
    deviceHeat: { 
      description: "مراقبة درجة حرارة الأجهزة المتصلة", 
      category: "advanced", 
      icon: <Cpu size={18} /> 
    },
    zeroPower: { 
      description: "عمليات شبكة بأقل استهلاك للطاقة", 
      category: "advanced", 
      icon: <Zap size={18} /> 
    },
    multiNetwork: { 
      description: "ربط وإدارة شبكات متعددة", 
      category: "advanced", 
      icon: <Network size={18} /> 
    },
    
    // ميزات تحليل البيانات
    dataAnalysis: { 
      description: "تحليل متقدم لبيانات الشبكة والاتصالات", 
      category: "data", 
      icon: <Database size={18} /> 
    },
    elasticsearchIntegration: { 
      description: "تكامل مع Elasticsearch لتخزين وتحليل البيانات", 
      category: "data", 
      icon: <Search size={18} />,
      dependencies: ["dataAnalysis"] 
    },
    prometheusMonitoring: { 
      description: "مراقبة النظام باستخدام Prometheus", 
      category: "data", 
      icon: <BarChart size={18} />,
      dependencies: ["dataAnalysis"] 
    },
    influxDBIntegration: { 
      description: "تخزين بيانات السلاسل الزمنية باستخدام InfluxDB", 
      category: "data", 
      icon: <Database size={18} />,
      dependencies: ["dataAnalysis"] 
    },
    aiAnalytics: { 
      description: "تحليل البيانات باستخدام الذكاء الاصطناعي", 
      category: "data", 
      icon: <BrainCircuit size={18} />,
      dependencies: ["elasticsearchIntegration", "dataAnalysis"] 
    },
    kafkaStreaming: { 
      description: "معالجة تدفق البيانات باستخدام Apache Kafka", 
      category: "data", 
      icon: <ArrowUpDown size={18} />,
      dependencies: ["dataAnalysis"] 
    },
    sparkProcessing: { 
      description: "معالجة البيانات الكبيرة باستخدام Apache Spark", 
      category: "data", 
      icon: <Zap size={18} />,
      dependencies: ["dataAnalysis"] 
    },
    securityAnalysis: { 
      description: "تحليل أمني متقدم لبيانات الشبكة", 
      category: "data", 
      icon: <Shield size={18} />,
      dependencies: ["dataAnalysis", "advancedSecurity"] 
    },
    networkPacketAnalysis: { 
      description: "تحليل حزم الشبكة على مستوى البروتوكول", 
      category: "data", 
      icon: <Network size={18} />,
      dependencies: ["dataAnalysis"] 
    },
    cloudIntegration: { 
      description: "تكامل مع خدمات السحابة للتحليل والتخزين", 
      category: "data", 
      icon: <Cloud size={18} />,
      dependencies: ["dataAnalysis"] 
    },
    customScripting: { 
      description: "دعم النصوص البرمجية المخصصة للتحليل", 
      category: "data", 
      icon: <Cpu size={18} />,
      dependencies: ["dataAnalysis"] 
    },
    dataVisualization: { 
      description: "عرض مرئي متقدم لبيانات الشبكة", 
      category: "data", 
      icon: <BarChart size={18} />,
      dependencies: ["dataAnalysis"] 
    }
  };
  
  // التحقق من التبعيات والتعارضات
  const checkDependenciesAndConflicts = (featureId: string) => {
    const feature = featureDescriptions[featureId];
    
    // التحقق من التبعيات
    if (feature.dependencies) {
      for (const dep of feature.dependencies) {
        if (!features[dep]) {
          return {
            canEnable: false,
            message: `هذه الميزة تتطلب تفعيل: ${featureDescriptions[dep]?.description || dep}`
          };
        }
      }
    }
    
    // التحقق من التعارضات
    if (feature.incompatible) {
      for (const incompatible of feature.incompatible) {
        if (features[incompatible]) {
          return {
            canEnable: false,
            message: `هذه الميزة تتعارض مع: ${featureDescriptions[incompatible]?.description || incompatible}`
          };
        }
      }
    }
    
    return { canEnable: true, message: "" };
  };
  
  // عرض عنصر ميزة واحدة
  const renderFeatureItem = (featureId: string) => {
    const feature = featureDescriptions[featureId];
    if (!feature) return null;
    
    const { canEnable, message } = checkDependenciesAndConflicts(featureId);
    const isDisabled = !features[featureId] && !canEnable && isDeveloperMode;
    
    return (
      <div key={featureId} className="flex items-center justify-between space-y-1 py-2">
        <div className="flex items-start gap-2">
          <div className="mt-0.5">{feature.icon}</div>
          <div>
            <Label htmlFor={featureId} className="text-base font-medium">
              {t(`features.${featureId}`, featureId)}
            </Label>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
            {isDisabled && (
              <p className="text-xs text-red-500 mt-1">{message}</p>
            )}
          </div>
        </div>
        <Switch
          id={featureId}
          checked={features[featureId] || false}
          onCheckedChange={() => toggleFeature(featureId)}
          disabled={isDisabled}
        />
      </div>
    );
  };
  
  // تصفية الميزات حسب الفئة
  const getFeaturesByCategory = (category: string) => {
    return Object.keys(featureDescriptions).filter(
      featureId => featureDescriptions[featureId].category === category
    );
  };
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="core">
            <Zap className="h-4 w-4 mr-2" />
            {t('developer.features.core', 'الأساسية')}
          </TabsTrigger>
          <TabsTrigger value="advanced">
            <Cpu className="h-4 w-4 mr-2" />
            {t('developer.features.advanced', 'المتقدمة')}
          </TabsTrigger>
          <TabsTrigger value="data">
            <Database className="h-4 w-4 mr-2" />
            {t('developer.features.data', 'تحليل البيانات')}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="core">
          <Card>
            <CardHeader>
              <CardTitle>{t('developer.features.coreFeatures', 'الميزات الأساسية')}</CardTitle>
              <CardDescription>
                {t('developer.features.coreDesc', 'الميزات الضرورية لعمل التطبيق بالشكل الأساسي')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {getFeaturesByCategory('core').map(renderFeatureItem)}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>{t('developer.features.advancedFeatures', 'الميزات المتقدمة')}</CardTitle>
              <CardDescription>
                {t('developer.features.advancedDesc', 'ميزات إضافية لتحسين قدرات التطبيق')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {getFeaturesByCategory('advanced').map(renderFeatureItem)}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => {
                // تفعيل كل الميزات المتقدمة
                getFeaturesByCategory('advanced').forEach(featureId => {
                  if (!features[featureId]) {
                    const { canEnable } = checkDependenciesAndConflicts(featureId);
                    if (canEnable) {
                      toggleFeature(featureId);
                    }
                  }
                });
              }}>
                {t('developer.features.enableAllCompatible', 'تفعيل المتوافقة')}
              </Button>
              <Button variant="outline" onClick={() => {
                // تعطيل كل الميزات المتقدمة
                getFeaturesByCategory('advanced').forEach(featureId => {
                  if (features[featureId]) {
                    toggleFeature(featureId);
                  }
                });
              }}>
                {t('developer.features.disableAll', 'تعطيل الكل')}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle>{t('developer.features.dataFeatures', 'ميزات تحليل البيانات')}</CardTitle>
              <CardDescription>
                {t('developer.features.dataDesc', 'أدوات وتقنيات متقدمة لتحليل بيانات الشبكة')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {getFeaturesByCategory('data').map(renderFeatureItem)}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => {
                // تفعيل كل ميزات تحليل البيانات
                getFeaturesByCategory('data').forEach(featureId => {
                  if (!features[featureId]) {
                    const { canEnable } = checkDependenciesAndConflicts(featureId);
                    if (canEnable) {
                      toggleFeature(featureId);
                    }
                  }
                });
              }}>
                {t('developer.features.enableAllCompatible', 'تفعيل المتوافقة')}
              </Button>
              <Button variant="outline" onClick={() => {
                // تعطيل كل ميزات تحليل البيانات
                getFeaturesByCategory('data').forEach(featureId => {
                  if (features[featureId]) {
                    toggleFeature(featureId);
                  }
                });
              }}>
                {t('developer.features.disableAll', 'تعطيل الكل')}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
