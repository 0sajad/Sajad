import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, Stop, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface PingResult {
  time: string;
  status: 'success' | 'failure';
  responseTime?: number;
}

export function PingTool() {
  const { t } = useTranslation();
  const [host, setHost] = useState<string>('google.com');
  const [isPinging, setIsPinging] = useState<boolean>(false);
  const [pingResults, setPingResults] = useState<PingResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  
  const handleStartPing = useCallback(() => {
    if (isPinging) {
      toast.error(t('pingTool.alreadyPinging', 'الفحص قيد التشغيل بالفعل'));
      return;
    }
    
    setIsPinging(true);
    setPingResults([]);
    setError(null);
    
    const pingInterval = setInterval(async () => {
      try {
        const startTime = performance.now();
        const response = await fetch(`https://${host}`, { mode: 'no-cors' });
        const endTime = performance.now();
        const responseTime = endTime - startTime;
        
        if (response.type === 'opaque' || response.ok) {
          setPingResults(prevResults => [
            ...prevResults,
            { time: new Date().toLocaleTimeString(), status: 'success', responseTime }
          ]);
        } else {
          setPingResults(prevResults => [
            ...prevResults,
            { time: new Date().toLocaleTimeString(), status: 'failure' }
          ]);
        }
      } catch (e: any) {
        setPingResults(prevResults => [
          ...prevResults,
          { time: new Date().toLocaleTimeString(), status: 'failure' }
        ]);
        setError(e.message || t('pingTool.unknownError', 'حدث خطأ غير معروف'));
      }
    }, 2000);
    
    setIntervalId(pingInterval);
    toast.success(t('pingTool.pingStarted', 'بدأ الفحص'));
  }, [host, isPinging, t]);
  
  const handleStopPing = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      setIsPinging(false);
      toast.info(t('pingTool.pingStopped', 'تم إيقاف الفحص'));
    }
  };
  
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>{t('pingTool.title', 'أداة فحص الاتصال')}</CardTitle>
        <CardDescription>
          {t('pingTool.description', 'فحص الاتصال بالخادم عن طريق إرسال حزم البيانات')}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="host">{t('pingTool.hostLabel', 'المضيف')}</Label>
          <Input
            id="host"
            type="text"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            placeholder={t('pingTool.hostPlaceholder', 'أدخل اسم المضيف أو عنوان IP')}
            disabled={isPinging}
          />
        </div>
        
        <div className="flex justify-between">
          <Button
            variant="default"
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={handleStartPing}
            disabled={isPinging}
          >
            <Play className="mr-2 h-4 w-4" />
            {t('pingTool.startPing', 'بدء الفحص')}
          </Button>
          <Button
            variant="destructive"
            onClick={handleStopPing}
            disabled={!isPinging}
          >
            <Stop className="mr-2 h-4 w-4" />
            {t('pingTool.stopPing', 'إيقاف الفحص')}
          </Button>
        </div>
        
        {error && (
          <div className="rounded-md bg-destructive/15 p-3 py-2 text-sm text-destructive flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            {error}
          </div>
        )}
        
        <div className="space-y-2">
          <Label>{t('pingTool.resultsLabel', 'النتائج')}</Label>
          <ScrollArea className="h-[200px] w-full rounded-md border">
            <div className="p-2">
              {pingResults.length > 0 ? (
                <div className="space-y-1">
                  {pingResults.map((result, index) => (
                    <div
                      key={index}
                      className="text-sm"
                    >
                      {result.status === 'success' ? (
                        <span className="text-green-500">
                          {t('pingTool.success', 'نجاح')} - {result.time} - {result.responseTime?.toFixed(2)} ms
                        </span>
                      ) : (
                        <span className="text-red-500">
                          {t('pingTool.failure', 'فشل')} - {result.time}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {t('pingTool.noResults', 'لا توجد نتائج حتى الآن')}
                </p>
              )}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
