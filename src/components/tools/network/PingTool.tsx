import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Loader2, RefreshCw, Zap, AlertTriangle, Check, History } from "lucide-react";
import { ArabicTextEnhancer } from '@/components/text/ArabicTextEnhancer';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { useOfflineSupport } from '@/hooks/useOfflineSupport';
import { LineChart, XAxis, YAxis, Line, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Progress } from '@/components/ui/progress';
import { useTheme } from '@/hooks/useTheme';

interface PingResult {
  sequence: number;
  time: number;
  ttl: number;
  timestamp: Date;
}

/**
 * أداة Ping - لاختبار الاتصال والاستجابة مع مضيف
 */
export function PingTool() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [isRunning, setIsRunning] = useState(false);
  const [host, setHost] = useState('');
  const [counts, setCounts] = useState(5);
  const [results, setResults] = useState<PingResult[]>([]);
  const [stats, setStats] = useState({ min: 0, max: 0, avg: 0, loss: 0 });
  const [pingsCompleted, setPingsCompleted] = useState(0);
  const { isOnline } = useOfflineSupport();
  
  // إعادة تعيين النتائج عند تغيير المضيف
  useEffect(() => {
    if (host !== '' && results.length > 0) {
      setResults([]);
      setPingsCompleted(0);
    }
  }, [host]);
  
  // وظيفة محاكاة لـ Ping
  const handlePing = async () => {
    if (!host || !isOnline) {
      return;
    }
    
    setIsRunning(true);
    setResults([]);
    setPingsCompleted(0);
    
    try {
      // محاكاة إرسال عدة طلبات ping
      const newResults: PingResult[] = [];
      let failedPings = 0;
      
      for (let i = 1; i <= counts; i++) {
        // تأخير عشوائي في الاستجابة
        await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 300));
        
        // محاكاة فقدان حزمة واحدة عشوائيًا
        if (Math.random() > 0.85) {
          failedPings++;
          setPingsCompleted(prev => prev + 1);
          continue;
        }
        
        // إنشاء استجابة مزيفة
        const pingTime = 20 + Math.random() * 80;
        const result: PingResult = {
          sequence: i,
          time: pingTime,
          ttl: 64,
          timestamp: new Date()
        };
        
        newResults.push(result);
        setResults(prev => [...prev, result]);
        setPingsCompleted(prev => prev + 1);
      }
      
      // حساب إحصائيات عند الانتهاء
      if (newResults.length > 0) {
        const times = newResults.map(r => r.time);
        setStats({
          min: Math.min(...times),
          max: Math.max(...times),
          avg: times.reduce((a, b) => a + b, 0) / times.length,
          loss: (failedPings / counts) * 100
        });
      }
    } catch (error) {
      console.error('Ping error:', error);
    } finally {
      setIsRunning(false);
    }
  };
  
  // تحويل بيانات ping لرسم بياني
  const chartData = results.map((result) => ({
    sequence: result.sequence,
    time: result.time,
  }));
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2 space-y-2">
          <Label htmlFor="host-input">
            <ArabicTextEnhancer>{t('networkTools.hostToPing', 'المضيف')}</ArabicTextEnhancer>
          </Label>
          <Input 
            id="host-input"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            placeholder="example.com أو 8.8.8.8"
            disabled={isRunning}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="ping-count">
            <ArabicTextEnhancer>{t('networkTools.pingCount', 'عدد مرات ping')}</ArabicTextEnhancer>
          </Label>
          <Input 
            id="ping-count"
            type="number"
            value={counts}
            onChange={(e) => setCounts(Number(e.target.value))}
            min={1}
            max={50}
            disabled={isRunning}
          />
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={handlePing} 
          className="w-full bg-green-600 hover:bg-green-700 text-white"
          variant="default"
          disabled={isRunning || !host || !isOnline}
        >
          {isRunning ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <ArabicTextEnhancer>{t('networkTools.pinging', 'جارِ ping...')}</ArabicTextEnhancer>
            </>
          ) : (
            <>
              <Zap className="mr-2 h-4 w-4" />
              <ArabicTextEnhancer>{t('networkTools.startPing', 'بدء ping')}</ArabicTextEnhancer>
            </>
          )}
        </Button>
      </div>
      
      {isRunning && (
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="flex items-center">
              <History className="h-4 w-4 mr-1 animate-spin" />
              <span className="text-sm">
                <ArabicTextEnhancer>
                  {t('networkTools.sendingPing', 'إرسال طلب ping إلى')}: {host}
                </ArabicTextEnhancer>
              </span>
            </div>
            <span className="text-sm">{pingsCompleted} / {counts}</span>
          </div>
          <Progress value={(pingsCompleted / counts) * 100} className="h-2" />
        </div>
      )}
      
      {results.length > 0 && (
        <>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="p-2 text-left">#</th>
                      <th className="p-2 text-left">
                        <ArabicTextEnhancer>{t('networkTools.time', 'الوقت')}</ArabicTextEnhancer>
                      </th>
                      <th className="p-2 text-left">TTL</th>
                      <th className="p-2 text-left">
                        <ArabicTextEnhancer>{t('networkTools.status', 'الحالة')}</ArabicTextEnhancer>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((result, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-2">{result.sequence}</td>
                        <td className="p-2">{result.time.toFixed(2)} ms</td>
                        <td className="p-2">{result.ttl}</td>
                        <td className="p-2">
                          <Badge variant="success" className="flex items-center gap-1 w-fit">
                            <Check className="h-3 w-3" />
                            <ArabicTextEnhancer>{t('common.success', 'نجاح')}</ArabicTextEnhancer>
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <XAxis 
                  dataKey="sequence" 
                  label={{ 
                    value: t('networkTools.sequence', 'التسلسل'), 
                    position: 'insideBottomRight', 
                    offset: -5 
                  }}
                />
                <YAxis 
                  label={{ 
                    value: t('networkTools.responseTime', 'وقت الاستجابة (ms)'), 
                    angle: -90, 
                    position: 'insideLeft' 
                  }}
                />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Tooltip formatter={(value: any) => [`${value} ms`, t('networkTools.responseTime', 'وقت الاستجابة')]} />
                <Line 
                  type="monotone" 
                  dataKey="time" 
                  stroke={theme === 'dark' ? '#60a5fa' : '#3b82f6'} 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">
                    <ArabicTextEnhancer>{t('networkTools.minimum', 'الحد الأدنى')}</ArabicTextEnhancer>
                  </div>
                  <div className="font-medium">{stats.min.toFixed(2)} ms</div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">
                    <ArabicTextEnhancer>{t('networkTools.maximum', 'الحد الأقصى')}</ArabicTextEnhancer>
                  </div>
                  <div className="font-medium">{stats.max.toFixed(2)} ms</div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">
                    <ArabicTextEnhancer>{t('networkTools.average', 'المتوسط')}</ArabicTextEnhancer>
                  </div>
                  <div className="font-medium">{stats.avg.toFixed(2)} ms</div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">
                    <ArabicTextEnhancer>{t('networkTools.packetLoss', 'فقدان الحزم')}</ArabicTextEnhancer>
                  </div>
                  <div className="font-medium">{stats.loss.toFixed(2)}%</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePing} 
              disabled={isRunning || !isOnline}
              className="text-xs"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              <ArabicTextEnhancer>{t('common.runAgain', 'تشغيل مرة أخرى')}</ArabicTextEnhancer>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
