import React, { useState, useCallback } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  Play, 
  Loader2, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Network
} from "lucide-react";

interface Port {
  port: number;
  status: 'open' | 'closed' | 'filtered' | 'unknown';
}

export function PortScanner() {
  const { t } = useTranslation();
  const [ipAddress, setIpAddress] = useState("");
  const [ports, setPorts] = useState<Port[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  
  const handleStartScan = useCallback(async () => {
    if (!ipAddress) {
      toast.error(t('portScanner.enterIP', 'الرجاء إدخال عنوان IP'));
      return;
    }
    
    setIsScanning(true);
    setPorts([]);
    
    // Simulate scanning ports (replace with actual scanning logic)
    const scannedPorts: Port[] = [];
    const commonPorts = [21, 22, 23, 25, 53, 80, 110, 111, 135, 139, 143, 443, 445, 514, 515, 993, 995, 1025, 1026, 1027, 1028, 1029, 1030, 1433, 1723, 3306, 3389, 5000, 5432, 5900, 6000, 8000, 8008, 8080, 8443];
    
    for (const port of commonPorts) {
      // Simulate different port statuses
      const status = Math.random() > 0.8 ? 'open' : Math.random() > 0.5 ? 'closed' : 'filtered';
      scannedPorts.push({ port, status });
      
      // Update state after each port scan
      setPorts(prevPorts => [...prevPorts, { port, status }]);
      
      // Add a small delay to simulate scanning time
      await new Promise(resolve => setTimeout(resolve, 150));
    }
    
    setIsScanning(false);
    toast.success(t('portScanner.scanComplete', 'اكتمل الفحص'));
  }, [ipAddress, t]);
  
  return (
    <GlassCard className="p-4">
      <h2 className="text-lg font-semibold mb-4">{t('portScanner.title', 'فحص المنافذ')}</h2>
      
      <div className="mb-4">
        <Label htmlFor="ip-address" className="block mb-2">
          {t('portScanner.ipAddress', 'عنوان IP')}
        </Label>
        <Input
          type="text"
          id="ip-address"
          placeholder={t('portScanner.enterIP', 'أدخل عنوان IP')}
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
          disabled={isScanning}
        />
      </div>
      
      <Button
        variant="default"
        className="bg-green-600 hover:bg-green-700 text-white"
        onClick={handleStartScan}
        disabled={isScanning}
      >
        {isScanning ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t('portScanner.scanning', 'جاري الفحص...')}
          </>
        ) : (
          <>
            <Play className="mr-2 h-4 w-4" />
            {t('portScanner.startScan', 'بدء الفحص')}
          </>
        )}
      </Button>
      
      {ports.length > 0 && (
        <div className="mt-6">
          <h3 className="text-md font-medium mb-3">{t('portScanner.scanResults', 'نتائج الفحص')}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('portScanner.port', 'المنفذ')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('portScanner.status', 'الحالة')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {ports.map((port) => (
                  <tr key={port.port}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {port.port}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {port.status === 'open' && (
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                          {t('portScanner.open', 'مفتوح')}
                        </div>
                      )}
                      {port.status === 'closed' && (
                        <div className="flex items-center">
                          <XCircle className="h-4 w-4 text-red-500 mr-1" />
                          {t('portScanner.closed', 'مغلق')}
                        </div>
                      )}
                      {port.status === 'filtered' && (
                        <div className="flex items-center">
                          <AlertTriangle className="h-4 w-4 text-yellow-500 mr-1" />
                          {t('portScanner.filtered', 'مُرشَّح')}
                        </div>
                      )}
                      {port.status === 'unknown' && t('portScanner.unknown', 'غير معروف')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </GlassCard>
  );
}
