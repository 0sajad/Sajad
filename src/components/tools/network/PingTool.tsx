
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, Wifi, BarChart2, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { usePingData } from '@/hooks/usePingData';

// Create a unique component name for the Square component
const PingSquare = ({ value, color }: { value: number; color: string }) => (
  <div
    className={`h-4 w-4 transition-colors duration-300 ${color}`}
    title={`${value}ms`}
  ></div>
);

export function PingTool() {
  const { t } = useTranslation();
  const [host, setHost] = useState('example.com');
  const [pingActive, setPingActive] = useState(false);
  const { 
    pingResults, 
    isPinging, 
    error, 
    pingHost, 
    stopPing, 
    currentPingDelay, 
    pingHistory 
  } = usePingData();
  
  useEffect(() => {
    return () => {
      stopPing();
    };
  }, [stopPing]);
  
  const handleStartPing = () => {
    setPingActive(true);
    pingHost(host);
  };
  
  const handleStopPing = () => {
    setPingActive(false);
    stopPing();
  };
  
  const getPingColor = (ping: number) => {
    if (ping === 0) return 'bg-gray-200';
    if (ping < 50) return 'bg-green-500';
    if (ping < 100) return 'bg-blue-500';
    if (ping < 200) return 'bg-yellow-500';
    if (ping < 400) return 'bg-orange-500';
    return 'bg-red-500';
  };
  
  // Calculate average and maximum ping
  const calculateStats = () => {
    if (pingResults.length === 0) return { avg: 0, max: 0 };
    
    const times = pingResults.map(result => result.time);
    const sum = times.reduce((acc, time) => acc + time, 0);
    const avg = Math.round(sum / times.length);
    const max = Math.max(...times);
    
    return { avg, max };
  };
  
  const stats = calculateStats();
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Zap className="w-5 h-5 mr-2 text-blue-500" />
          {t('tools.pingTool', 'اختبار زمن الاستجابة')}
        </CardTitle>
        <CardDescription>
          {t('tools.pingDescription', 'قياس زمن الاستجابة للخوادم والمواقع المختلفة')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <div className="flex-1">
            <Label htmlFor="ping-host" className="sr-only">{t('tools.hostToPing', 'مضيف الاختبار')}</Label>
            <Input
              id="ping-host"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              disabled={pingActive}
              placeholder="example.com"
              className="w-full"
            />
          </div>
          {!pingActive ? (
            <Button onClick={handleStartPing} disabled={!host.trim()} variant="outline">
              {t('tools.startPing', 'بدء')}
            </Button>
          ) : (
            <Button onClick={handleStopPing} variant="outline" className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700">
              {t('tools.stopPing', 'إيقاف')}
            </Button>
          )}
        </div>
        
        {pingActive && (
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">
              {currentPingDelay > 0 ? `${currentPingDelay} ms` : '...'}
            </div>
            <div className="text-sm text-muted-foreground">
              {currentPingDelay > 0 ? t('tools.currentPing', 'زمن الاستجابة الحالي') : t('tools.waitingForResponse', 'بانتظار الاستجابة...')}
            </div>
          </div>
        )}
        
        <div className="mt-4">
          <div className="text-sm font-medium mb-2 flex items-center">
            <BarChart2 className="h-4 w-4 mr-1" />
            {t('tools.pingHistory', 'سجل الاستجابة')}
          </div>
          <div className="flex space-x-1 h-4">
            {pingHistory.map((ping, index) => (
              <PingSquare key={index} value={ping} color={getPingColor(ping)} />
            ))}
            {pingHistory.length === 0 && (
              <div className="text-sm text-muted-foreground italic">
                {t('tools.noPingDataYet', 'لا توجد بيانات بعد')}
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 text-xs text-muted-foreground border-t flex justify-between items-center">
        <div className="flex items-center">
          <Wifi className="h-3 w-3 mr-1" />
          {t('tools.pingCount', 'عدد الفحوصات')}: {pingResults.length}
        </div>
        {pingResults.length > 0 && (
          <div className="flex items-center">
            <span className="mr-2">
              {t('tools.avgPing', 'المتوسط')}: {stats.avg} ms
            </span>
            <span>
              {t('tools.maxPing', 'الأقصى')}: {stats.max} ms
            </span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
