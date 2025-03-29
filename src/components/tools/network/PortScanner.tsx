import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scan, Loader2 } from 'lucide-react';

interface PortScanResult {
  port: number;
  isOpen: boolean | null;
}

export function PortScanner() {
  const { t } = useTranslation();
  const [host, setHost] = useState('');
  const [ports, setPorts] = useState('21,22,23,25,80,110,143,443,587,993,995,3306,8080');
  const [results, setResults] = useState<PortScanResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // دالة لتحويل حالة المنفذ إلى variant زر مدعوم
  const getPortStatusVariant = (isOpen: boolean | null): "default" | "destructive" | "outline" | "secondary" => {
    if (isOpen === null) return "outline";
    if (isOpen === true) return "destructive"; // مفتوح - أحمر
    return "default"; // مغلق - استخدام default مع css مخصص
  };
  
  const scanPorts = useCallback(async () => {
    if (!host || !ports) return;
    
    setIsLoading(true);
    setResults([]);
    
    const portList = ports.split(',').map(p => parseInt(p.trim(), 10)).filter(p => !isNaN(p));
    
    const newResults: PortScanResult[] = [];
    
    for (const port of portList) {
      try {
        // فحص المنفذ باستخدام Promise
        const isOpen = await checkPort(host, port, 400);
        newResults.push({ port, isOpen });
      } catch (error) {
        console.error(`Error checking port ${port}:`, error);
        newResults.push({ port, isOpen: null });
      }
    }
    
    setResults(newResults);
    setIsLoading(false);
  }, [host, ports]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('portScanner.title', 'فحص المنافذ')}</CardTitle>
        <CardDescription>{t('portScanner.description', 'اكتشف المنافذ المفتوحة على جهاز')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="host" className="text-sm font-medium block">{t('portScanner.host', 'المضيف')}</label>
          <Input
            id="host"
            type="text"
            placeholder="example.com"
            value={host}
            onChange={(e) => setHost(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="ports" className="text-sm font-medium block">{t('portScanner.ports', 'المنافذ')}</label>
          <Input
            id="ports"
            type="text"
            placeholder="21, 22, 80, 443"
            value={ports}
            onChange={(e) => setPorts(e.target.value)}
          />
        </div>
        <Button onClick={scanPorts} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('common.loading', 'جاري التحميل...')}
            </>
          ) : (
            <>
              <Scan className="mr-2 h-4 w-4" />
              {t('portScanner.scan', 'فحص')}
            </>
          )}
        </Button>
        
        {results.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium">{t('portScanner.results', 'النتائج')}</h3>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {results.map((result) => (
                <div key={result.port} className="text-center">
                  <p className="text-xs">{t('portScanner.port', 'المنفذ')} {result.port}</p>
                  <Button 
                    size="sm" 
                    variant={getPortStatusVariant(result.isOpen)}
                    className={`min-w-24 ${
                      result.isOpen === false ? "bg-green-500 hover:bg-green-600" : ""
                    }`}
                  >
                    {result.isOpen ? t('portScanner.open', 'مفتوح') : t('portScanner.closed', 'مغلق')}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// دالة فحص المنفذ
async function checkPort(host: string, port: number, timeout: number): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(`ws://${host}:${port}`);
    
    const timer = setTimeout(() => {
      socket.close();
      resolve(false);
    }, timeout);
    
    socket.onopen = () => {
      clearTimeout(timer);
      socket.close();
      resolve(true);
    };
    
    socket.onerror = () => {
      clearTimeout(timer);
      resolve(false);
    };
    
    socket.onclose = () => {
      clearTimeout(timer);
      resolve(false);
    };
  });
}
