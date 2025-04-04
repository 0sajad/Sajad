
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCcw, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export function PredictiveAnalysis() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastAnalysisTime, setLastAnalysisTime] = useState<Date | null>(null);
  const [predictedIssues, setPredictedIssues] = useState<any[]>([]);
  
  // محاكاة تحليل الشبكة عند تحميل المكون
  useEffect(() => {
    performPredictiveAnalysis();
  }, []);
  
  // محاكاة تحليل تنبؤي للشبكة
  const performPredictiveAnalysis = () => {
    setIsAnalyzing(true);
    
    // محاكاة وقت التحليل
    setTimeout(() => {
      // توليد مشاكل متوقعة عشوائية
      const possibleIssues = [
        {
          id: 1,
          type: 'bandwidthSaturation',
          probability: 0.75,
          timeFrame: 'days',
          confidence: 'medium',
        },
        {
          id: 2,
          type: 'securityVulnerability',
          probability: 0.89,
          timeFrame: 'hours',
          confidence: 'high',
        },
        {
          id: 3,
          type: 'deviceFailure',
          probability: 0.65,
          timeFrame: 'weeks',
          confidence: 'medium',
        },
        {
          id: 4,
          type: 'networkCongestion',
          probability: 0.55,
          timeFrame: 'days',
          confidence: 'low',
        },
        {
          id: 5,
          type: 'dnsFailure',
          probability: 0.80,
          timeFrame: 'month',
          confidence: 'medium',
        },
        {
          id: 6,
          type: 'wirelessInterference',
          probability: 0.72,
          timeFrame: 'days',
          confidence: 'high',
        }
      ];
      
      // اختيار مشاكل عشوائية من الممكن حدوثها
      const shouldShowIssues = Math.random() > 0.3; // 70% احتمالية وجود مشاكل
      
      if (shouldShowIssues) {
        // اختيار عدد عشوائي من المشاكل (1-3)
        const numberOfIssues = Math.floor(Math.random() * 3) + 1;
        const shuffledIssues = [...possibleIssues].sort(() => 0.5 - Math.random());
        const selectedIssues = shuffledIssues.slice(0, numberOfIssues);
        setPredictedIssues(selectedIssues);
        
        // إظهار إشعار بوجود مشاكل متوقعة
        toast.warning(t('predictiveAnalysis.alerts.newPrediction', 'تم اكتشاف مشكلة محتملة جديدة'));
      } else {
        setPredictedIssues([]);
      }
      
      setIsAnalyzing(false);
      setLastAnalysisTime(new Date());
    }, 2000);
  };
  
  // تحديث التحليل يدويًا
  const handleRefreshAnalysis = () => {
    toast.info(t('predictiveAnalysis.analyzing', 'جاري التحليل...'));
    performPredictiveAnalysis();
  };
  
  // محاكاة تطبيق الإصلاح
  const handleApplyFix = (issueId: number) => {
    toast.success(t('predictiveAnalysis.alerts.issueResolved', 'تم حل مشكلة متوقعة بنجاح'));
    setPredictedIssues(prev => prev.filter(issue => issue.id !== issueId));
  };
  
  return (
    <Card className="w-full h-full shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">
            {t('predictiveAnalysis.title', 'التحليل التنبؤي للشبكة')}
          </CardTitle>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={handleRefreshAnalysis}
            disabled={isAnalyzing}
            title={t('predictiveAnalysis.refresh', 'تحديث التحليل')}
          >
            <RefreshCcw className={`h-4 w-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          {t('predictiveAnalysis.subtitle', 'توقع المشاكل قبل حدوثها')}
        </p>
      </CardHeader>
      
      <CardContent className="pt-0">
        {isAnalyzing ? (
          <div className="flex flex-col items-center justify-center p-6">
            <RefreshCcw className="h-8 w-8 animate-spin text-primary mb-3" />
            <p>{t('predictiveAnalysis.analyzing', 'جاري التحليل...')}</p>
          </div>
        ) : predictedIssues.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <CheckCircle2 className="h-8 w-8 text-green-500 mb-3" />
            <h3 className="font-semibold mb-1">{t('predictiveAnalysis.noIssues', 'لا توجد مشاكل متوقعة')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('predictiveAnalysis.networkHealthy', 'شبكتك تعمل بشكل جيد ولا توجد مشاكل متوقعة في المستقبل القريب.')}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center text-amber-600 dark:text-amber-500">
              <AlertTriangle className="h-5 w-5 mr-1 rtl:ml-1 rtl:mr-0" />
              {t('predictiveAnalysis.predictedIssues', 'مشاكل متوقعة')}
            </h3>
            
            <div className="space-y-3">
              {predictedIssues.map((issue) => (
                <div key={issue.id} className="border rounded-lg p-3 relative">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">
                        {t(`predictiveAnalysis.issues.${issue.type}`, issue.type)}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t(`predictiveAnalysis.issues.${issue.type}Desc`, 'وصف المشكلة')}
                      </p>
                    </div>
                    <Badge className={
                      issue.probability > 0.8 ? 'bg-red-500' : 
                      issue.probability > 0.7 ? 'bg-amber-500' : 
                      'bg-yellow-500'
                    }>
                      {Math.round(issue.probability * 100)}%
                    </Badge>
                  </div>
                  
                  <div className="mt-3 border-t pt-2 text-sm flex justify-between items-center flex-wrap">
                    <div className="space-x-2 rtl:space-x-reverse">
                      <Badge variant="secondary">
                        {t(`predictiveAnalysis.confidence.${issue.confidence}`, issue.confidence)}
                      </Badge>
                      <Badge variant="secondary">
                        {t(`predictiveAnalysis.timeFrames.${issue.timeFrame}`, issue.timeFrame)}
                      </Badge>
                    </div>
                    
                    <div className="flex space-x-2 rtl:space-x-reverse mt-2 sm:mt-0">
                      <Button 
                        size="sm" 
                        variant="default" 
                        className="text-xs h-7"
                        onClick={() => handleApplyFix(issue.id)}
                      >
                        {t('predictiveAnalysis.actions.applyFix', 'تطبيق الإصلاح')}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        className="text-xs h-7"
                      >
                        {t('predictiveAnalysis.actions.moreInfo', 'مزيد من المعلومات')}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-2 text-sm">
                    <strong>{t('predictiveAnalysis.recommendedSolution', 'الحل المقترح')}: </strong>
                    {t(`predictiveAnalysis.issues.${issue.type}Solution`, 'حل المشكلة')}
                  </div>
                </div>
              ))}
            </div>
            
            {predictedIssues.length > 0 && (
              <div className="text-xs text-muted-foreground text-center mt-4">
                {t('predictiveAnalysis.poweredBy', 'يعمل بواسطة محرك التحليلات التنبؤية للذكاء الاصطناعي، يتعلم تلقائيًا من أنماط الشبكة السابقة.')}
              </div>
            )}
          </div>
        )}
        
        {lastAnalysisTime && !isAnalyzing && (
          <div className="text-xs text-muted-foreground mt-4 pt-2 border-t text-center">
            {t('predictiveAnalysis.lastUpdate', 'آخر تحديث')}: {lastAnalysisTime.toLocaleTimeString()}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
