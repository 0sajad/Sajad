
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Loader2, Scan, AlertTriangle, Check, X } from "lucide-react";
import { ArabicTextEnhancer } from '@/components/text/ArabicTextEnhancer';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Port {
  port: number;
  status: 'open' | 'closed' | 'filtered';
  service?: string;
}

/**
 * أداة فحص المنافذ - تقوم بفحص المنافذ المفتوحة على عنوان IP محدد
 */
export function PortScanner() {
  const { t } = useTranslation();
  const [isScanning, setIsScanning] = useState(false);
  const [hostInput, setHostInput] = useState('');
  const [results, setResults] = useState<Port[]>([]);
  const [scanMode, setScanMode] = useState<'common' | 'range' | 'specific'>('common');
  const [error, setError] = useState<string | null>(null);
  
  // وظيفة محاكاة لفحص المنافذ
  const handleScan = async () => {
    if (!hostInput) {
      setError(t('networkTools.errors.enterHost', 'يرجى إدخال عنوان IP أو اسم مضيف'));
      return;
    }
    
    setError(null);
    setIsScanning(true);
    setResults([]);
    
    try {
      // محاكاة تأخير المسح
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // بيانات عينة
      let mockPorts: Port[] = [];
      
      if (scanMode === 'common') {
        mockPorts = [
          { port: 21, status: 'closed', service: 'FTP' },
          { port: 22, status: 'open', service: 'SSH' },
          { port: 25, status: 'filtered', service: 'SMTP' },
          { port: 80, status: 'open', service: 'HTTP' },
          { port: 443, status: 'open', service: 'HTTPS' },
          { port: 3306, status: 'closed', service: 'MySQL' },
          { port: 8080, status: 'open', service: 'HTTP-Proxy' },
        ];
      } else if (scanMode === 'range') {
        // مثال على نطاق منافذ
        const ports = [80, 443, 8080, 8443, 3000, 5000];
        mockPorts = ports.map(port => ({
          port,
          status: Math.random() > 0.5 ? 'open' : 'closed',
          service: port === 80 ? 'HTTP' : port === 443 ? 'HTTPS' : 'Unknown'
        }));
      } else {
        // للمنافذ المحددة
        mockPorts = [
          { port: 22, status: 'open', service: 'SSH' },
          { port: 80, status: 'open', service: 'HTTP' },
          { port: 443, status: 'open', service: 'HTTPS' },
        ];
      }
      
      setResults(mockPorts);
    } catch (error) {
      console.error('Port scan error:', error);
      setError(t('networkTools.errors.scanFailed', 'فشل فحص المنافذ'));
    } finally {
      setIsScanning(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="host-input">
            <ArabicTextEnhancer>{t('networkTools.hostToScan', 'المضيف')}</ArabicTextEnhancer>
          </Label>
          <Input 
            id="host-input"
            value={hostInput}
            onChange={(e) => setHostInput(e.target.value)}
            placeholder="example.com أو 192.168.1.1"
            disabled={isScanning}
            aria-label={t('networkTools.hostToScan', 'المضيف')}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="scan-mode">
            <ArabicTextEnhancer>{t('networkTools.scanMode', 'وضع الفحص')}</ArabicTextEnhancer>
          </Label>
          <Select 
            value={scanMode}
            onValueChange={(value) => setScanMode(value as any)}
            disabled={isScanning}
          >
            <SelectTrigger id="scan-mode">
              <SelectValue placeholder={t('networkTools.selectScanMode', 'اختر وضع الفحص')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="common">
                <ArabicTextEnhancer>{t('networkTools.commonPorts', 'المنافذ الشائعة')}</ArabicTextEnhancer>
              </SelectItem>
              <SelectItem value="range">
                <ArabicTextEnhancer>{t('networkTools.portRange', 'نطاق المنافذ')}</ArabicTextEnhancer>
              </SelectItem>
              <SelectItem value="specific">
                <ArabicTextEnhancer>{t('networkTools.specificPorts', 'منافذ محددة')}</ArabicTextEnhancer>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={handleScan} 
          disabled={isScanning || !hostInput}
        >
          {isScanning ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <ArabicTextEnhancer>{t('common.scanning', 'جارِ الفحص...')}</ArabicTextEnhancer>
            </>
          ) : (
            <>
              <Scan className="mr-2 h-4 w-4" />
              <ArabicTextEnhancer>{t('networkTools.scanPorts', 'فحص المنافذ')}</ArabicTextEnhancer>
            </>
          )}
        </Button>
      </div>
      
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>
            <ArabicTextEnhancer>{t('common.error', 'خطأ')}</ArabicTextEnhancer>
          </AlertTitle>
          <AlertDescription>
            <ArabicTextEnhancer>{error}</ArabicTextEnhancer>
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
                    <th className="p-2 text-left">
                      <ArabicTextEnhancer>{t('networkTools.port', 'المنفذ')}</ArabicTextEnhancer>
                    </th>
                    <th className="p-2 text-left">
                      <ArabicTextEnhancer>{t('networkTools.status', 'الحالة')}</ArabicTextEnhancer>
                    </th>
                    <th className="p-2 text-left">
                      <ArabicTextEnhancer>{t('networkTools.service', 'الخدمة')}</ArabicTextEnhancer>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((port, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-2">{port.port}</td>
                      <td className="p-2">
                        {port.status === 'open' ? (
                          <Badge variant="success" className="flex items-center gap-1 w-fit">
                            <Check className="h-3 w-3" />
                            <ArabicTextEnhancer>{t('networkTools.open', 'مفتوح')}</ArabicTextEnhancer>
                          </Badge>
                        ) : port.status === 'closed' ? (
                          <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                            <X className="h-3 w-3" />
                            <ArabicTextEnhancer>{t('networkTools.closed', 'مغلق')}</ArabicTextEnhancer>
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="flex items-center gap-1 w-fit">
                            <AlertTriangle className="h-3 w-3" />
                            <ArabicTextEnhancer>{t('networkTools.filtered', 'مُصفى')}</ArabicTextEnhancer>
                          </Badge>
                        )}
                      </td>
                      <td className="p-2">{port.service || '-'}</td>
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
