import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from 'react-i18next';
import { Loader2, CheckCircle, AlertTriangle, XCircle, Square } from 'lucide-react';

interface PingResult {
  host: string;
  result: number | null;
  timestamp: Date;
}

function getPingStatusText(latency: number | null): string {
  if (latency === null) {
    return "لم يتم الفحص";
  } else if (latency < 100) {
    return `جيد (${latency}ms)`;
  } else if (latency < 200) {
    return `متوسط (${latency}ms)`;
  } else {
    return `سيء (${latency}ms)`;
  }
}

import { Square } from 'lucide-react';
// تم استبدال Stop المفقود بـ Square الموجود بالفعل

// دالة تحويل الحالة إلى variant زر مدعوم
const getPingStatusVariant = (latency: number | null): "default" | "destructive" | "outline" | "secondary" => {
  if (latency === null) return "outline";
  if (latency < 100) return "default"; // جيد - استخدام default مع css مخصص
  if (latency < 200) return "secondary"; // متوسط
  return "destructive"; // سيء
};

export function PingTool() {
  const { t } = useTranslation();
  const [host, setHost] = useState('google.com');
  const [isPinging, setIsPinging] = useState(false);
  const [pingResults, setPingResults] = useState<PingResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // فحص الاتصال
  const handlePing = async () => {
    setIsPinging(true);
    setError(null);
    
    try {
      // إرسال طلب HTTP بسيط لقياس زمن الوصول
      const startTime = Date.now();
      await fetch(`https://${host}`, { mode: 'no-cors' });
      const endTime = Date.now();
      const latency = endTime - startTime;
      
      // إضافة النتيجة إلى سجل النتائج
      setPingResults(prevResults => [
        ...prevResults,
        { host, result: latency, timestamp: new Date() }
      ]);
    } catch (e: any) {
      // تسجيل الخطأ
      setError(e.message || 'فشل الاتصال');
      
      // إضافة نتيجة الخطأ إلى سجل النتائج
      setPingResults(prevResults => [
        ...prevResults,
        { host, result: null, timestamp: new Date() }
      ]);
    } finally {
      setIsPinging(false);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t('pingTool.title', 'أداة فحص الاتصال')}</CardTitle>
        <CardDescription>{t('pingTool.description', 'تحقق من زمن الوصول إلى أي مضيف')}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
          <Label htmlFor="host">{t('pingTool.hostLabel', 'المضيف')}</Label>
          <Input
            id="host"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            className="col-span-2"
            placeholder="google.com"
          />
        </div>
        <Button onClick={handlePing} disabled={isPinging}>
          {isPinging ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('common.loading', 'جاري الفحص...')}
            </>
          ) : (
            t('pingTool.pingButton', 'فحص الاتصال')
          )}
        </Button>
        
        {error && (
          <div className="text-red-500 mt-2 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            {error}
          </div>
        )}
        
        {pingResults.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium">{t('pingTool.results', 'النتائج')}</h3>
            <div className="mt-2 space-y-1">
              {pingResults.map((ping, index) => (
                <div key={index} className="flex items-center justify-between border rounded-md p-2">
                  <div>
                    <span className="font-mono text-sm">{ping.host}</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {ping.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  
                  {ping.result === null ? (
                    <Button 
                      variant={getPingStatusVariant(ping.result)}
                      size="sm"
                      className={`min-w-24 ${
                        ping.result !== null && ping.result < 100 ? "bg-green-500 hover:bg-green-600" : ""
                      }`}
                    >
                      {getPingStatusText(ping.result)}
                    </Button>
                  ) : (
                    <Button 
                      variant={getPingStatusVariant(ping.result)}
                      size="sm"
                      className={`min-w-24 ${
                        ping.result !== null && ping.result < 100 ? "bg-green-500 hover:bg-green-600" : ""
                      }`}
                    >
                      {getPingStatusText(ping.result)}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// في مكان استخدام Stop
<Square className="h-4 w-4 mr-2" />
