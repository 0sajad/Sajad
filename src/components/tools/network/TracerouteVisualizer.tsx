
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Loader2, PlayCircle, GlobeIcon } from "lucide-react";
import { ArabicTextEnhancer } from '@/components/text/ArabicTextEnhancer';
import { toast } from 'sonner';
import { useA11y } from '@/hooks/useA11y';
import { Label } from '@/components/ui/label';
import { useOfflineSupport } from '@/hooks/useOfflineSupport';

interface HopData {
  hop: number;
  host: string;
  ip: string;
  rtt1?: number;
  rtt2?: number;
  rtt3?: number;
  avgRtt?: number;
  location?: string;
}

/**
 * محاكاة تتبع المسار - أداة لعرض مسار حزم البيانات عبر الإنترنت
 */
export function TracerouteVisualizer() {
  const { t } = useTranslation();
  const [isRunning, setIsRunning] = useState(false);
  const [host, setHost] = useState('');
  const [hops, setHops] = useState<HopData[]>([]);
  const [maxHops, setMaxHops] = useState(30);
  const { announce } = useA11y?.() || { announce: undefined };
  const { isOnline } = useOfflineSupport();
  
  // إعادة تعيين النتائج عند تغيير المضيف
  useEffect(() => {
    setHops([]);
  }, [host]);
  
  // وظيفة محاكاة للتتبع
  const handleTrace = async () => {
    if (!host) {
      toast.error(t('networkTools.errors.enterHost', 'يرجى إدخال اسم مضيف أو عنوان IP'));
      return;
    }
    
    if (!isOnline) {
      toast.error(t('networkTools.errors.offline', 'هذه الأداة تتطلب اتصالاً بالإنترنت'));
      return;
    }
    
    setIsRunning(true);
    setHops([]);
    
    try {
      const mockHops: HopData[] = [
        { hop: 1, host: 'router.local', ip: '192.168.1.1', rtt1: 1.2, rtt2: 0.9, rtt3: 1.0, location: 'Local Network' },
        { hop: 2, host: 'isp-gateway.net', ip: '10.0.0.1', rtt1: 15.4, rtt2: 14.8, rtt3: 14.9, location: 'ISP Network' },
        { hop: 3, host: 'regional-hub.isp.net', ip: '172.16.0.1', rtt1: 25.6, rtt2: 24.9, rtt3: 26.3, location: 'Regional Hub' },
        { hop: 4, host: 'core-router.backbone.net', ip: '172.20.0.1', rtt1: 45.8, rtt2: 46.2, rtt3: 45.9, location: 'Backbone Network' },
        { hop: 5, host: 'edge-server.cloudprovider.com', ip: '104.18.0.1', rtt1: 65.3, rtt2: 64.7, rtt3: 65.5, location: 'Edge Server' },
        { hop: 6, host: host, ip: '104.18.10.1', rtt1: 75.1, rtt2: 74.9, rtt3: 75.2, location: 'Destination' },
      ];
      
      // محاكاة وصول كل قفزة واحدة تلو الأخرى
      for (let i = 0; i < mockHops.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 700));
        
        const hop = mockHops[i];
        hop.avgRtt = ((hop.rtt1 || 0) + (hop.rtt2 || 0) + (hop.rtt3 || 0)) / 3;
        
        setHops(prev => [...prev, hop]);
        
        if (announce && i === mockHops.length - 1) {
          announce(t('networkTools.traceComplete', 'اكتمل تتبع المسار'), 'polite');
        }
      }
    } catch (error) {
      console.error('Traceroute error:', error);
      toast.error(t('networkTools.errors.traceFailed', 'فشل تتبع المسار'));
    } finally {
      setIsRunning(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="sm:col-span-3 space-y-2">
          <Label htmlFor="host-input">
            <ArabicTextEnhancer>{t('networkTools.hostToTrace', 'المضيف للتتبع')}</ArabicTextEnhancer>
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
          <Label htmlFor="max-hops">
            <ArabicTextEnhancer>{t('networkTools.maxHops', 'القفزات القصوى')}</ArabicTextEnhancer>
          </Label>
          <Input 
            id="max-hops"
            type="number"
            value={maxHops}
            onChange={(e) => setMaxHops(Number(e.target.value))}
            min={1}
            max={64}
            disabled={isRunning}
          />
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={handleTrace} 
          disabled={isRunning || !host || !isOnline}
        >
          {isRunning ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <ArabicTextEnhancer>{t('networkTools.tracing', 'جارِ التتبع...')}</ArabicTextEnhancer>
            </>
          ) : (
            <>
              <PlayCircle className="mr-2 h-4 w-4" />
              <ArabicTextEnhancer>{t('networkTools.startTrace', 'بدء التتبع')}</ArabicTextEnhancer>
            </>
          )}
        </Button>
      </div>
      
      {hops.length > 0 && (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="p-2 text-left">
                      <ArabicTextEnhancer>{t('networkTools.hop', 'القفزة')}</ArabicTextEnhancer>
                    </th>
                    <th className="p-2 text-left">
                      <ArabicTextEnhancer>{t('networkTools.hostIP', 'المضيف / IP')}</ArabicTextEnhancer>
                    </th>
                    <th className="p-2 text-left">
                      <ArabicTextEnhancer>{t('networkTools.ping1', 'Ping 1')}</ArabicTextEnhancer>
                    </th>
                    <th className="p-2 text-left">
                      <ArabicTextEnhancer>{t('networkTools.ping2', 'Ping 2')}</ArabicTextEnhancer>
                    </th>
                    <th className="p-2 text-left">
                      <ArabicTextEnhancer>{t('networkTools.ping3', 'Ping 3')}</ArabicTextEnhancer>
                    </th>
                    <th className="p-2 text-left">
                      <ArabicTextEnhancer>{t('networkTools.location', 'الموقع')}</ArabicTextEnhancer>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {hops.map((hop, index) => (
                    <tr key={index} className={`border-t ${hop.host === host ? 'bg-primary/10' : ''}`}>
                      <td className="p-2">{hop.hop}</td>
                      <td className="p-2">
                        <div className="font-medium">{hop.host}</div>
                        <div className="text-xs text-muted-foreground">{hop.ip}</div>
                      </td>
                      <td className="p-2">{hop.rtt1?.toFixed(2)} ms</td>
                      <td className="p-2">{hop.rtt2?.toFixed(2)} ms</td>
                      <td className="p-2">{hop.rtt3?.toFixed(2)} ms</td>
                      <td className="p-2">
                        <div className="flex items-center">
                          <GlobeIcon className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                          {hop.location}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
