
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { AlertTriangle, CheckCircle, TrendingUp, Zap, BarChart2, ArrowRight } from "lucide-react";

interface NetworkIssue {
  id: string;
  type: 'warning' | 'critical' | 'info';
  title: string;
  description: string;
  solution: string;
  probability: number; // 0-100
  timeFrame: string; // متى من المتوقع حدوث المشكلة
  detected: Date;
}

export function PredictiveAnalysis() {
  const { t } = useTranslation();
  const [predictedIssues, setPredictedIssues] = useState<NetworkIssue[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // محاكاة تحليل الشبكة واكتشاف المشاكل المحتملة
  const analyzeNetwork = () => {
    setIsAnalyzing(true);
    
    // محاكاة وقت المعالجة
    setTimeout(() => {
      const issues: NetworkIssue[] = [
        {
          id: 'issue-1',
          type: 'warning',
          title: t('predictiveAnalysis.issues.bandwidthSaturation', 'تشبع النطاق الترددي'),
          description: t('predictiveAnalysis.issues.bandwidthSaturationDesc', 'بناءً على نمط الاستخدام الحالي، من المتوقع أن تصل إلى 90% من سعة النطاق الترددي خلال الأيام القادمة.'),
          solution: t('predictiveAnalysis.issues.bandwidthSaturationSolution', 'تحديث حدود النطاق الترددي أو توزيع الحمل على أوقات مختلفة.'),
          probability: 78,
          timeFrame: t('predictiveAnalysis.timeFrames.days', 'خلال 3-5 أيام'),
          detected: new Date()
        },
        {
          id: 'issue-2',
          type: 'critical',
          title: t('predictiveAnalysis.issues.securityVulnerability', 'ثغرة أمنية محتملة'),
          description: t('predictiveAnalysis.issues.securityVulnerabilityDesc', 'تم اكتشاف نمط حركة مرور غير عادي يشير إلى محاولة استكشاف للثغرات الأمنية.'),
          solution: t('predictiveAnalysis.issues.securityVulnerabilitySolution', 'تحديث جدار الحماية وتطبيق قواعد أمان إضافية على المنافذ المشبوهة.'),
          probability: 65,
          timeFrame: t('predictiveAnalysis.timeFrames.hours', 'خلال 24-48 ساعة'),
          detected: new Date()
        },
        {
          id: 'issue-3',
          type: 'info',
          title: t('predictiveAnalysis.issues.deviceFailure', 'فشل جهاز متوقع'),
          description: t('predictiveAnalysis.issues.deviceFailureDesc', 'أحد أجهزة الشبكة يظهر علامات تدهور الأداء التي قد تؤدي إلى فشل قريب.'),
          solution: t('predictiveAnalysis.issues.deviceFailureSolution', 'فحص الجهاز وإجراء صيانة وقائية أو استبداله قبل حدوث الفشل.'),
          probability: 42,
          timeFrame: t('predictiveAnalysis.timeFrames.weeks', 'خلال 1-2 أسبوع'),
          detected: new Date()
        }
      ];
      
      setPredictedIssues(issues);
      setIsAnalyzing(false);
    }, 2000);
  };
  
  // تحليل أولي عند تحميل المكون
  useEffect(() => {
    analyzeNetwork();
  }, []);
  
  // تصنيف المشاكل حسب الأولوية
  const getIssuesByPriority = () => {
    return [...predictedIssues].sort((a, b) => {
      // ترتيب حسب النوع ثم الاحتمالية
      if (a.type === 'critical' && b.type !== 'critical') return -1;
      if (a.type !== 'critical' && b.type === 'critical') return 1;
      if (a.type === 'warning' && b.type === 'info') return -1;
      if (a.type === 'info' && b.type === 'warning') return 1;
      return b.probability - a.probability;
    });
  };
  
  const prioritizedIssues = getIssuesByPriority();
  
  return (
    <Card className="border-octaBlue-200 shadow-md">
      <CardHeader className="bg-gradient-to-r from-octaBlue-50 to-octaBlue-100 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <TrendingUp className="h-5 w-5 text-octaBlue-600" />
            <CardTitle className="text-octaBlue-800">
              {t('predictiveAnalysis.title', 'التحليل التنبؤي للشبكة')}
            </CardTitle>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={analyzeNetwork}
            disabled={isAnalyzing}
            className="bg-white"
          >
            <BarChart2 className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
            {isAnalyzing 
              ? t('predictiveAnalysis.analyzing', 'جاري التحليل...') 
              : t('predictiveAnalysis.refresh', 'تحديث التحليل')}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4 pb-5 space-y-4">
        {isAnalyzing ? (
          <div className="flex items-center justify-center py-8 space-x-2 rtl:space-x-reverse">
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" />
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce delay-75" />
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce delay-150" />
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce delay-300" />
          </div>
        ) : predictedIssues.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-2" />
            <h3 className="text-lg font-medium">
              {t('predictiveAnalysis.noIssues', 'لا توجد مشاكل متوقعة')}
            </h3>
            <p className="text-muted-foreground mt-1">
              {t('predictiveAnalysis.networkHealthy', 'شبكتك تعمل بشكل جيد ولا توجد مشاكل متوقعة في المستقبل القريب.')}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">
                {t('predictiveAnalysis.predictedIssues', 'مشاكل متوقعة')}
              </h3>
              <Badge variant="outline" className="bg-white">
                {predictedIssues.length} {t('predictiveAnalysis.issuesDetected', 'مشكلة محتملة')}
              </Badge>
            </div>
            
            {prioritizedIssues.map((issue) => (
              <Alert 
                key={issue.id} 
                variant={issue.type === 'critical' ? 'destructive' : issue.type === 'warning' ? 'default' : 'outline'}
                className="border-l-4 border-l-blue-500"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <AlertTriangle className={`h-4 w-4 ${
                        issue.type === 'critical' ? 'text-red-500' : 
                        issue.type === 'warning' ? 'text-amber-500' : 'text-blue-500'
                      }`} />
                      <AlertTitle className="font-semibold mb-1">{issue.title}</AlertTitle>
                      <Badge className={`${
                        issue.type === 'critical' ? 'bg-red-100 text-red-800 border-red-200' : 
                        issue.type === 'warning' ? 'bg-amber-100 text-amber-800 border-amber-200' : 
                        'bg-blue-100 text-blue-800 border-blue-200'
                      } ml-2`}>
                        {issue.probability}% {t('predictiveAnalysis.probability', 'احتمالية')}
                      </Badge>
                    </div>
                    <AlertDescription className="mt-2">
                      <p className="mb-1">{issue.description}</p>
                      <div className="mt-3 p-2 bg-muted/50 rounded-md">
                        <p className="font-medium text-sm">{t('predictiveAnalysis.recommendedSolution', 'الحل المقترح')}:</p>
                        <p className="text-sm mt-1">{issue.solution}</p>
                      </div>
                    </AlertDescription>
                  </div>
                  <div className="text-xs text-muted-foreground text-right rtl:text-left whitespace-nowrap">
                    <p>{t('predictiveAnalysis.expectedIn', 'متوقع في')}:</p>
                    <p className="font-medium">{issue.timeFrame}</p>
                  </div>
                </div>
              </Alert>
            ))}
            
            <div className="flex justify-end mt-2">
              <Button variant="link" size="sm" className="text-octaBlue-600">
                {t('predictiveAnalysis.viewAllPredictions', 'عرض جميع التوقعات')}
                <ArrowRight className="h-3.5 w-3.5 ml-1 rtl:mr-1 rtl:ml-0 rtl:rotate-180" />
              </Button>
            </div>
          </div>
        )}
        
        <div className="border-t pt-4 mt-6">
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-muted-foreground">
            <Zap className="h-4 w-4 text-amber-500" />
            <p>
              {t('predictiveAnalysis.poweredBy', 'يعمل بواسطة محرك التحليلات التنبؤية للذكاء الاصطناعي، يتعلم تلقائيًا من أنماط الشبكة السابقة.')}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
