
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Wifi, WifiOff, Search, Loader2 } from "lucide-react";
import { useOfflineSupport } from '@/hooks/useOfflineSupport';
import { ArabicTextEnhancer } from '@/components/text/ArabicTextEnhancer';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

/**
 * أداة مسح الشبكة - تكتشف الأجهزة المتصلة بالشبكة المحلية
 */
export function NetworkScanner() {
  const { t } = useTranslation();
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const { isOnline } = useOfflineSupport();
  const [subnetInput, setSubnetInput] = useState('192.168.1.0/24');
  
  // وظيفة محاكاة لمسح الشبكة
  const handleScan = async () => {
    if (!isOnline) {
      return;
    }
    
    setIsScanning(true);
    setResults([]);
    
    // محاكاة مسح الشبكة - سيتم استبدالها بتنفيذ حقيقي
    try {
      // محاكاة تأخير المسح
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // بيانات عينة
      const mockDevices = [
        { ip: '192.168.1.1', mac: 'AA:BB:CC:DD:EE:FF', name: 'Router', status: 'online' },
        { ip: '192.168.1.2', mac: '11:22:33:44:55:66', name: 'Desktop-PC', status: 'online' },
        { ip: '192.168.1.3', mac: 'AA:11:BB:22:CC:33', name: 'Mobile-Device', status: 'online' },
        { ip: '192.168.1.4', mac: 'DD:EE:FF:00:11:22', name: 'Smart-TV', status: 'offline' },
        { ip: '192.168.1.5', mac: '99:88:77:66:55:44', name: 'NAS-Server', status: 'online' },
      ];
      
      setResults(mockDevices);
    } catch (error) {
      console.error('Network scan error:', error);
    } finally {
      setIsScanning(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input 
          value={subnetInput}
          onChange={(e) => setSubnetInput(e.target.value)}
          placeholder="192.168.1.0/24"
          disabled={isScanning || !isOnline}
          aria-label={t('networkTools.subnetToScan', 'نطاق الشبكة للمسح')}
        />
        <Button 
          onClick={handleScan} 
          disabled={isScanning || !isOnline}
          className="min-w-24"
        >
          {isScanning ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <ArabicTextEnhancer>{t('common.scanning', 'جارِ المسح...')}</ArabicTextEnhancer>
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              <ArabicTextEnhancer>{t('common.scan', 'مسح')}</ArabicTextEnhancer>
            </>
          )}
        </Button>
      </div>
      
      {!isOnline && (
        <Alert variant="destructive">
          <WifiOff className="h-4 w-4" />
          <AlertTitle>
            <ArabicTextEnhancer>{t('common.offlineMode', 'وضع عدم الاتصال')}</ArabicTextEnhancer>
          </AlertTitle>
          <AlertDescription>
            <ArabicTextEnhancer>
              {t('networkTools.offlineNotice', 'مسح الشبكة غير متاح في وضع عدم الاتصال')}
            </ArabicTextEnhancer>
          </AlertDescription>
        </Alert>
      )}
      
      {results.length > 0 && (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="p-2 text-left">IP</th>
                    <th className="p-2 text-left">MAC</th>
                    <th className="p-2 text-left">
                      <ArabicTextEnhancer>{t('networkTools.deviceName', 'اسم الجهاز')}</ArabicTextEnhancer>
                    </th>
                    <th className="p-2 text-left">
                      <ArabicTextEnhancer>{t('networkTools.status', 'الحالة')}</ArabicTextEnhancer>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((device, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-2">{device.ip}</td>
                      <td className="p-2">{device.mac}</td>
                      <td className="p-2">{device.name}</td>
                      <td className="p-2">
                        {device.status === 'online' ? (
                          <div className="flex items-center">
                            <Wifi className="h-4 w-4 text-green-500 mr-1" />
                            <ArabicTextEnhancer>{t('common.online', 'متصل')}</ArabicTextEnhancer>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <WifiOff className="h-4 w-4 text-red-500 mr-1" />
                            <ArabicTextEnhancer>{t('common.offline', 'غير متصل')}</ArabicTextEnhancer>
                          </div>
                        )}
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
