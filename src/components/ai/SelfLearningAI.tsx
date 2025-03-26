
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BrainCircuit, 
  Zap, 
  Database, 
  Globe, 
  RefreshCw, 
  Code, 
  Network, 
  Bot,
  Cpu
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMode } from "@/context/ModeContext";

export const SelfLearningAI = () => {
  const { t } = useTranslation();
  const { features } = useMode();
  const [activeTab, setActiveTab] = useState("learning");
  const [trainingProgress, setTrainingProgress] = useState(68);
  const [learningModules, setLearningModules] = useState<Array<{
    id: string;
    name: string;
    progress: number;
    status: "active" | "paused" | "completed";
    type: string;
  }>>([
    { id: "network_optimization", name: "selfLearning.modules.networkOptimization", progress: 87, status: "active", type: "core" },
    { id: "security_protocols", name: "selfLearning.modules.securityProtocols", progress: 92, status: "completed", type: "core" },
    { id: "code_analysis", name: "selfLearning.modules.codeAnalysis", progress: 74, status: "active", type: "extended" },
    { id: "natural_language", name: "selfLearning.modules.naturalLanguage", progress: 81, status: "active", type: "core" },
    { id: "patterns_detection", name: "selfLearning.modules.patternsDetection", progress: 65, status: "active", type: "extended" },
    { id: "error_correction", name: "selfLearning.modules.errorCorrection", progress: 79, status: "active", type: "core" },
  ]);
  
  // محاكاة استمرار عملية التعلم
  useEffect(() => {
    if (!features.aiAssistant) return;
    
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        const newProgress = prev + Math.random() * 0.5;
        return newProgress > 100 ? 100 : newProgress;
      });
      
      setLearningModules(prev => 
        prev.map(module => {
          if (module.status === "completed") return module;
          
          const newProgress = module.progress + Math.random() * 0.3;
          const updatedProgress = newProgress > 100 ? 100 : newProgress;
          
          return {
            ...module,
            progress: updatedProgress,
            status: updatedProgress === 100 ? "completed" : "active"
          };
        })
      );
    }, 3000);
    
    return () => clearInterval(interval);
  }, [features.aiAssistant]);
  
  // محاكاة نشاط التعلم
  const learningActivities = [
    { timestamp: "08:45:22", activity: "selfLearning.activities.networkAnalysis", type: "learning" },
    { timestamp: "08:32:17", activity: "selfLearning.activities.securityPatterns", type: "discovery" },
    { timestamp: "08:17:05", activity: "selfLearning.activities.optimizationAlgorithms", type: "learning" },
    { timestamp: "07:58:33", activity: "selfLearning.activities.errorPatterns", type: "discovery" },
    { timestamp: "07:42:11", activity: "selfLearning.activities.language", type: "learning" },
    { timestamp: "07:30:29", activity: "selfLearning.activities.codeRefactoring", type: "implementation" },
    { timestamp: "07:15:42", activity: "selfLearning.activities.newProtocols", type: "discovery" },
    { timestamp: "07:02:18", activity: "selfLearning.activities.bugFixes", type: "implementation" },
    { timestamp: "06:45:07", activity: "selfLearning.activities.dataIntegration", type: "learning" },
    { timestamp: "06:30:55", activity: "selfLearning.activities.newTools", type: "implementation" },
  ];
  
  // مصادر التعلم
  const learningSources = [
    { name: "selfLearning.sources.academicPapers", count: 247, type: "academic" },
    { name: "selfLearning.sources.techDocs", count: 892, type: "documentation" },
    { name: "selfLearning.sources.repositories", count: 1243, type: "code" },
    { name: "selfLearning.sources.industryBlogs", count: 568, type: "blog" },
    { name: "selfLearning.sources.networkStandards", count: 126, type: "standard" },
    { name: "selfLearning.sources.securityAdvisories", count: 319, type: "security" },
  ];
  
  // الحصول على لون الشارة حسب نوع النشاط
  const getActivityBadgeColor = (type: string) => {
    switch (type) {
      case "learning": return "bg-blue-50 text-blue-700 border-blue-200";
      case "discovery": return "bg-purple-50 text-purple-700 border-purple-200";
      case "implementation": return "bg-green-50 text-green-700 border-green-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };
  
  // الحصول على لون الشارة حسب نوع المصدر
  const getSourceBadgeColor = (type: string) => {
    switch (type) {
      case "academic": return "bg-amber-50 text-amber-700 border-amber-200";
      case "documentation": return "bg-blue-50 text-blue-700 border-blue-200";
      case "code": return "bg-green-50 text-green-700 border-green-200";
      case "blog": return "bg-purple-50 text-purple-700 border-purple-200";
      case "standard": return "bg-gray-50 text-gray-700 border-gray-200";
      case "security": return "bg-red-50 text-red-700 border-red-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };
  
  // لون شارة حالة الوحدة
  const getModuleStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-50 text-green-700 border-green-200";
      case "paused": return "bg-amber-50 text-amber-700 border-amber-200";
      case "completed": return "bg-blue-50 text-blue-700 border-blue-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };
  
  if (!features.aiAssistant) {
    return (
      <Card className="border-octaBlue-200">
        <CardHeader className="bg-gradient-to-r from-octaBlue-50 to-octaBlue-100 rounded-t-lg">
          <CardTitle className="text-lg flex items-center">
            <BrainCircuit className="mr-2 h-5 w-5 text-octaBlue-600" />
            {t('selfLearning.title', 'الذكاء الاصطناعي ذاتي التعلم')}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6 text-center">
          <BrainCircuit className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
          <h3 className="text-lg font-medium mb-1">
            {t('selfLearning.disabled', 'ميزة الذكاء الاصطناعي ذاتي التعلم غير مفعّلة')}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t('selfLearning.enableInDeveloper', 'يمكنك تفعيل هذه الميزة من خلال وضع المطور')}
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="border-octaBlue-200">
      <CardHeader className="bg-gradient-to-r from-octaBlue-50 to-octaBlue-100 rounded-t-lg">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg flex items-center font-tajawal">
              <BrainCircuit className="mr-2 h-5 w-5 text-octaBlue-600" />
              {t('selfLearning.title', 'الذكاء الاصطناعي ذاتي التعلم')}
            </CardTitle>
            <CardDescription className="font-tajawal">
              {t('selfLearning.description', 'التعلم المستمر والتحسين الذاتي للذكاء الاصطناعي')}
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {t('selfLearning.active', 'نشط')}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center text-sm font-medium">
              <Zap className="mr-2 h-4 w-4 text-blue-500" />
              {t('selfLearning.trainingProgress', 'التقدم في التدريب')}
            </div>
            <span className="text-sm">{Math.floor(trainingProgress)}%</span>
          </div>
          <Progress value={trainingProgress} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1 font-tajawal">
            {t('selfLearning.continuousTraining', 'التدريب مستمر على مدار الساعة باستخدام مصادر متنوعة من المعرفة')}
          </p>
        </div>
        
        <Tabs defaultValue="learning" value={activeTab} onValueChange={setActiveTab}>
          <div className="px-4">
            <TabsList className="w-full grid grid-cols-3 mb-4">
              <TabsTrigger value="learning" className="font-tajawal">
                <RefreshCw className="mr-2 h-4 w-4" />
                {t('selfLearning.tabs.learning', 'التعلم')}
              </TabsTrigger>
              <TabsTrigger value="modules" className="font-tajawal">
                <Cpu className="mr-2 h-4 w-4" />
                {t('selfLearning.tabs.modules', 'الوحدات')}
              </TabsTrigger>
              <TabsTrigger value="sources" className="font-tajawal">
                <Database className="mr-2 h-4 w-4" />
                {t('selfLearning.tabs.sources', 'المصادر')}
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="learning" className="mt-0">
            <ScrollArea className="h-[300px]">
              <div className="space-y-2 p-4">
                <h3 className="text-sm font-medium mb-2 flex items-center font-tajawal">
                  <Bot className="mr-2 h-4 w-4 text-purple-500" />
                  {t('selfLearning.recentActivities', 'أنشطة التعلم الأخيرة')}
                </h3>
                
                {learningActivities.map((activity, index) => (
                  <div key={index} className="flex justify-between items-center border rounded-md p-3">
                    <div className="flex items-start">
                      <div className="text-xs text-muted-foreground mr-2 pt-0.5 whitespace-nowrap">
                        {activity.timestamp}
                      </div>
                      <div className="text-sm font-tajawal">{t(activity.activity)}</div>
                    </div>
                    <Badge variant="outline" className={getActivityBadgeColor(activity.type)}>
                      {t(`selfLearning.activityTypes.${activity.type}`)}
                    </Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="modules" className="mt-0">
            <ScrollArea className="h-[300px]">
              <div className="space-y-3 p-4">
                {learningModules.map((module) => (
                  <div key={module.id} className="border rounded-md p-3">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium text-sm font-tajawal">{t(module.name)}</div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={module.type === "core" ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"}>
                          {t(`selfLearning.moduleTypes.${module.type}`)}
                        </Badge>
                        <Badge variant="outline" className={getModuleStatusColor(module.status)}>
                          {t(`selfLearning.moduleStatus.${module.status}`)}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">{t('selfLearning.moduleProgress', 'التقدم')}:</span>
                      <span className="text-xs">{Math.floor(module.progress)}%</span>
                    </div>
                    <Progress value={module.progress} className="h-1.5" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="sources" className="mt-0">
            <ScrollArea className="h-[300px]">
              <div className="p-4">
                <h3 className="text-sm font-medium mb-3 flex items-center font-tajawal">
                  <Globe className="mr-2 h-4 w-4 text-blue-500" />
                  {t('selfLearning.knowledgeSources', 'مصادر المعرفة')}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {learningSources.map((source, index) => (
                    <div key={index} className="flex justify-between items-center border rounded-md p-3">
                      <div className="text-sm font-tajawal">{t(source.name)}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{source.count.toLocaleString()}</span>
                        <Badge variant="outline" className={getSourceBadgeColor(source.type)}>
                          {t(`selfLearning.sourceTypes.${source.type}`)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 rounded-md">
                  <h3 className="text-sm font-medium mb-1 flex items-center font-tajawal">
                    <Code className="mr-2 h-4 w-4 text-blue-600" />
                    {t('selfLearning.continuousIntegration', 'التكامل المستمر')}
                  </h3>
                  <p className="text-xs text-blue-700 font-tajawal">
                    {t('selfLearning.continuousIntegrationDesc', 'يقوم الذكاء الاصطناعي بتحليل ودمج المعرفة الجديدة من مصادر متنوعة باستمرار، مما يسمح له بتطوير قدراته وتحسين أدائه تلقائيًا.')}
                  </p>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
