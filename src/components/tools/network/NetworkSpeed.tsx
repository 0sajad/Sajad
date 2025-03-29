
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Loader2, RefreshCw, ArrowDown, ArrowUp, Gauge, AlertTriangle } from "lucide-react";
import { ArabicTextEnhancer } from '@/components/text/ArabicTextEnhancer';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { useOfflineSupport } from '@/hooks/useOfflineSupport';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface SpeedTestResult {
  downloadSpeed: number;
  uploadSpeed: number;
  ping: number;
  jitter: number;
  latency: number;
  serverName: string;
  serverLocation: string;
  isp: string;
  testTime: Date;
}

/**
 * أداة قياس سرعة الشبكة - تقيس سرعة التحميل والرفع
 */
export function NetworkSpeed() {
  const { t } = useTranslation();
  const [isRunning, setIsRunning] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [result, setResult] = useState<SpeedTestResult | null>(null);
  const [testServer, setTestServer] = useState('auto');
  const { isOnline } = useOfflineSupport();
  
  // تحديث التقدم أثناء الاختبار
  useEffect(() => {
    if (!isRunning) {
      return;
    }
    
    let progressTimer: NodeJS.Timeout;
    let progress = 0;
    
    const updateProgress = () => {
      progress += 2;
      setTestProgress(progress);
      
      if (progress >= 100) {
        clearInterval(progressTimer);
        setIsRunning(false);
        
        // إنشاء نتيجة وهمية بعد اكتمال الاختبار
        const mockResult: SpeedTestResult = {
          downloadSpeed: 85 + Math.random() * 30,
          uploadSpeed: 20 + Math.random() * 10,
          ping: 15 + Math.random() * 20,
          jitter: 2 + Math.random() * 5,
          latency: 20 + Math.random() * 15,
          serverName: 'Speedtest Server',
          serverLocation: 'Dubai, UAE',
          isp: 'Example ISP',
          testTime: new Date()
        };
        
        setResult(mockResult);
      }
    };
    
    progressTimer = setInterval(updateProgress, 100);
    
    return () => clearInterval(progressTimer);
  }, [isRunning]);
  
  // وظيفة بدء اختبار السرعة
  const handleSpeedTest = async () => {
    if (!isOnline) {
      return;
    }
    
    setIsRunning(true);
    setTestProgress(0);
    setResult(null);
  };
  
  // تنسيق حجم السرعة
  const formatSpeed = (mbps: number) => {
    if (mbps < 1) {
      return `${(mbps * 1000).toFixed(2)} Kbps`;
    }
    return `${mbps.toFixed(2)} Mbps`;
  };
  
  // تقييم جودة الاتصال
  const getSpeedRating = (speed: number) => {
    if (speed >= 100) return t('networkTools.excellent', 'ممتاز');
    if (speed >= 50) return t('networkTools.good', 'جيد');
    if (speed >= 25) return t('networkTools.fair', 'متوسط');
    if (speed >= 10) return t('networkTools.poor', 'ضعيف');
    return t('networkTools.veryPoor', 'ضعيف جدًا');
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-end">
        <div className="space-y-2 w-full sm:w-auto">
          <Label htmlFor="test-server">
            <ArabicTextEnhancer>{t('networkTools.testServer', 'خادم الاختبار')}</ArabicTextEnhancer>
          </Label>
          <Select 
            value={testServer}
            onValueChange={setTestServer}
            disabled={isRunning || !isOnline}
          >
            <SelectTrigger id="test-server" className="w-full sm:w-[200px]">
              <SelectValue placeholder={t('networkTools.selectServer', 'اختر الخادم')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">
                <ArabicTextEnhancer>{t('networkTools.automatic', 'تلقائي')}</ArabicTextEnhancer>
              </SelectItem>
              <SelectItem value="server1">
                <ArabicTextEnhancer>{t('networkTools.server1', 'خادم 1 (دبي)')}</ArabicTextEnhancer>
              </SelectItem>
              <SelectItem value="server2">
                <ArabicTextEnhancer>{t('networkTools.server2', 'خادم 2 (الرياض)')}</ArabicTextEnhancer>
              </SelectItem>
              <SelectItem value="server3">
                <ArabicTextEnhancer>{t('networkTools.server3', 'خادم 3 (القاهرة)')}</ArabicTextEnhancer>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          onClick={handleSpeedTest} 
          disabled={isRunning || !isOnline}
          className="w-full sm:w-auto"
        >
          {isRunning ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <ArabicTextEnhancer>{t('networkTools.testingSpeed', 'جارِ الاختبار...')}</ArabicTextEnhancer>
            </>
          ) : (
            <>
              <Gauge className="mr-2 h-4 w-4" />
              <ArabicTextEnhancer>{t('networkTools.startSpeedTest', 'بدء اختبار السرعة')}</ArabicTextEnhancer>
            </>
          )}
        </Button>
      </div>
      
      {!isOnline && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>
            <ArabicTextEnhancer>{t('common.offlineMode', 'وضع عدم الاتصال')}</ArabicTextEnhancer>
          </AlertTitle>
          <AlertDescription>
            <ArabicTextEnhancer>
              {t('networkTools.speedTestOffline', 'اختبار السرعة غير متاح في وضع عدم الاتصال')}
            </ArabicTextEnhancer>
          </AlertDescription>
        </Alert>
      )}
      
      {isRunning && (
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm">
              <ArabicTextEnhancer>{t('networkTools.testingInProgress', 'جارِ اختبار السرعة...')}</ArabicTextEnhancer>
            </span>
            <span className="text-sm">{testProgress}%</span>
          </div>
          <Progress value={testProgress} className="h-2" />
        </div>
      )}
      
      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <ArrowDown className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                    <ArabicTextEnhancer className="text-lg font-medium">
                      {t('networkTools.downloadSpeed', 'سرعة التنزيل')}
                    </ArabicTextEnhancer>
                  </div>
                  <span className="text-lg font-bold">{formatSpeed(result.downloadSpeed)}</span>
                </div>
                <Progress value={(result.downloadSpeed / 150) * 100} className="h-2 bg-blue-200 dark:bg-blue-900" />
                <div className="text-sm text-right">
                  <ArabicTextEnhancer>
                    {t('networkTools.speedRating', 'التقييم')}: {getSpeedRating(result.downloadSpeed)}
                  </ArabicTextEnhancer>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <ArrowUp className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                    <ArabicTextEnhancer className="text-lg font-medium">
                      {t('networkTools.uploadSpeed', 'سرعة الرفع')}
                    </ArabicTextEnhancer>
                  </div>
                  <span className="text-lg font-bold">{formatSpeed(result.uploadSpeed)}</span>
                </div>
                <Progress value={(result.uploadSpeed / 50) * 100} className="h-2 bg-green-200 dark:bg-green-900" />
                <div className="text-sm text-right">
                  <ArabicTextEnhancer>
                    {t('networkTools.speedRating', 'التقييم')}: {getSpeedRating(result.uploadSpeed)}
                  </ArabicTextEnhancer>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">
                    <ArabicTextEnhancer>{t('networkTools.ping', 'استجابة الخادم')}</ArabicTextEnhancer>
                  </div>
                  <div className="font-medium">{result.ping.toFixed(2)} ms</div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">
                    <ArabicTextEnhancer>{t('networkTools.jitter', 'التذبذب')}</ArabicTextEnhancer>
                  </div>
                  <div className="font-medium">{result.jitter.toFixed(2)} ms</div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">
                    <ArabicTextEnhancer>{t('networkTools.latency', 'زمن الوصول')}</ArabicTextEnhancer>
                  </div>
                  <div className="font-medium">{result.latency.toFixed(2)} ms</div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">
                    <ArabicTextEnhancer>{t('networkTools.server', 'الخادم')}</ArabicTextEnhancer>
                  </div>
                  <div className="font-medium text-sm">{result.serverName}<br/>{result.serverLocation}</div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">
                    <ArabicTextEnhancer>{t('networkTools.isp', 'مزود الخدمة')}</ArabicTextEnhancer>
                  </div>
                  <div className="font-medium">{result.isp}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      <div className="flex justify-end mt-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleSpeedTest} 
          disabled={isRunning || !isOnline}
          className="text-xs"
        >
          <RefreshCw className="h-3 w-3 mr-1" />
          <ArabicTextEnhancer>{t('common.runAgain', 'تشغيل مرة أخرى')}</ArabicTextEnhancer>
        </Button>
      </div>
    </div>
  );
}
