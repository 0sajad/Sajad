
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Loader2, RefreshCw, Network, CheckCircle2, XCircle } from "lucide-react";
import { ArabicTextEnhancer } from '@/components/text/ArabicTextEnhancer';
import { useOfflineSupport } from '@/hooks/useOfflineSupport';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ConnectionTestResult {
  name: string;
  status: 'success' | 'warning' | 'error' | 'info';
  message: string;
  details?: string;
}

/**
 * أداة تحليل الاتصال - تفحص حالة الشبكة والاتصال بالإنترنت
 */
export function ConnectionAnalyzer() {
  const { t } = useTranslation();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<ConnectionTestResult[]>([]);
  const { isOnline, networkStatus, checkConnection } = useOfflineSupport();
  
  // تحديث التقدم أثناء التحليل
  useEffect(() => {
    if (!isAnalyzing) {
      return;
    }
    
    let progressTimer: NodeJS.Timeout;
    let currentProgress = 0;
    
    const updateProgress = () => {
      currentProgress += 5;
      setProgress(Math.min(currentProgress, 100));
      
      if (currentProgress >= 100) {
        clearInterval(progressTimer);
        setIsAnalyzing(false);
      }
    };
    
    progressTimer = setInterval(updateProgress, 200);
    
    return () => clearInterval(progressTimer);
  }, [isAnalyzing]);
  
  // وظيفة محاكاة لتحليل الاتصال
  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setProgress(0);
    setResults([]);
    
    try {
      // محاكاة اختبارات الاتصال المختلفة
      await checkConnection();
      
      // إنشاء تأخير في ظهور النتائج
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // إنشاء نتائج مزيفة
      const mockResults: ConnectionTestResult[] = [
        {
          name: t('networkTools.analyzer.internetConnection', 'اتصال الإنترنت'),
          status: isOnline ? 'success' : 'error',
          message: isOnline 
            ? t('networkTools.analyzer.connected', 'متصل بالإنترنت') 
            : t('networkTools.analyzer.notConnected', 'غير متصل بالإنترنت')
        },
        {
          name: t('networkTools.analyzer.dnsResolution', 'تحليل DNS'),
          status: isOnline ? 'success' : 'error',
          message: isOnline 
            ? t('networkTools.analyzer.dnsWorking', 'تحليل DNS يعمل بشكل صحيح') 
            : t('networkTools.analyzer.dnsNotWorking', 'مشكلة في تحليل DNS')
        },
        {
          name: t('networkTools.analyzer.gatewayConnection', 'اتصال البوابة'),
          status: 'success',
          message: t('networkTools.analyzer.gatewayReachable', 'البوابة يمكن الوصول إليها')
        },
        {
          name: t('networkTools.analyzer.bandwidthUsage', 'استخدام عرض النطاق'),
          status: 'warning',
          message: t('networkTools.analyzer.highUsage', 'استخدام عرض النطاق مرتفع (75%)'),
          details: t('networkTools.analyzer.bandwidthDetails', 'قد يؤثر على أداء التطبيقات التي تتطلب عرض نطاق عالي')
        },
        {
          name: t('networkTools.analyzer.latency', 'زمن الوصول'),
          status: Math.random() > 0.5 ? 'success' : 'warning',
          message: Math.random() > 0.5 
            ? t('networkTools.analyzer.lowLatency', 'زمن وصول منخفض (25ms)') 
            : t('networkTools.analyzer.highLatency', 'زمن وصول مرتفع (120ms)'),
          details: Math.random() > 0.5 
            ? t('networkTools.analyzer.goodForGaming', 'مناسب للألعاب والتطبيقات التفاعلية') 
            : t('networkTools.analyzer.mayAffectExperience', 'قد يؤثر على تجربة التطبيقات التفاعلية')
        },
        {
          name: t('networkTools.analyzer.packetLoss', 'فقدان الحزم'),
          status: Math.random() > 0.8 ? 'warning' : 'success',
          message: Math.random() > 0.8 
            ? t('networkTools.analyzer.moderateLoss', 'فقدان حزم متوسط (3%)') 
            : t('networkTools.analyzer.noLoss', 'لا يوجد فقدان للحزم (0%)')
        },
        {
          name: t('networkTools.analyzer.networkType', 'نوع الشبكة'),
          status: 'info',
          message: Math.random() > 0.5 
            ? t('networkTools.analyzer.wired', 'شبكة سلكية (Ethernet)') 
            : t('networkTools.analyzer.wireless', 'شبكة لاسلكية (Wi-Fi)')
        },
        {
          name: t('networkTools.analyzer.ipVersion', 'إصدار IP'),
          status: 'info',
          message: Math.random() > 0.3 
            ? t('networkTools.analyzer.dualStack', 'مزدوج (IPv4 & IPv6)') 
            : t('networkTools.analyzer.ipv4Only', 'IPv4 فقط')
        }
      ];
      
      setResults(mockResults);
    } catch (error) {
      console.error('Connection analysis error:', error);
    } finally {
      setIsAnalyzing(false);
      setProgress(100);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button 
          onClick={handleAnalyze} 
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <ArabicTextEnhancer>{t('networkTools.analyzing', 'جارِ التحليل...')}</ArabicTextEnhancer>
            </>
          ) : (
            <>
              <Network className="mr-2 h-4 w-4" />
              <ArabicTextEnhancer>{t('networkTools.analyzeConnection', 'تحليل الاتصال')}</ArabicTextEnhancer>
            </>
          )}
        </Button>
      </div>
      
      {isAnalyzing && (
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="flex items-center">
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              <span className="text-sm">
                <ArabicTextEnhancer>{t('networkTools.runningTests', 'جارِ تشغيل اختبارات الشبكة...')}</ArabicTextEnhancer>
              </span>
            </div>
            <span className="text-sm">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}
      
      {!isOnline && !isAnalyzing && results.length === 0 && (
        <Alert variant="destructive">
          <AlertDescription>
            <div className="flex items-center">
              <XCircle className="h-4 w-4 mr-2" />
              <ArabicTextEnhancer>
                {t('networkTools.offlineAlert', 'أنت حاليًا في وضع عدم الاتصال. بعض اختبارات الشبكة قد لا تعمل بشكل صحيح.')}
              </ArabicTextEnhancer>
            </div>
          </AlertDescription>
        </Alert>
      )}
      
      {results.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="border-b pb-3 last:border-b-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">
                      {result.name}
                    </div>
                    <Badge 
                      variant={
                        result.status === 'success' ? 'success' :
                        result.status === 'warning' ? 'warning' :
                        result.status === 'error' ? 'destructive' : 'outline'
                      }
                      className="ml-2"
                    >
                      {result.status === 'success' && (
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                      )}
                      {result.status === 'error' && (
                        <XCircle className="h-3 w-3 mr-1" />
                      )}
                      <ArabicTextEnhancer>
                        {result.status === 'success' ? t('common.success', 'نجاح') :
                         result.status === 'warning' ? t('common.warning', 'تحذير') :
                         result.status === 'error' ? t('common.error', 'خطأ') :
                         t('common.info', 'معلومات')}
                      </ArabicTextEnhancer>
                    </Badge>
                  </div>
                  <div className="text-sm mt-1">
                    <ArabicTextEnhancer>{result.message}</ArabicTextEnhancer>
                  </div>
                  {result.details && (
                    <div className="text-xs text-muted-foreground mt-1">
                      <ArabicTextEnhancer>{result.details}</ArabicTextEnhancer>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {results.length > 0 && (
        <div className="flex justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleAnalyze} 
            disabled={isAnalyzing}
            className="text-xs"
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            <ArabicTextEnhancer>{t('common.runAgain', 'تشغيل مرة أخرى')}</ArabicTextEnhancer>
          </Button>
        </div>
      )}
    </div>
  );
}
