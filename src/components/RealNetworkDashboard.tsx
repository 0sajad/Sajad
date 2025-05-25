
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRealNetworkMonitoring } from '@/hooks/useRealNetworkMonitoring';
import { Wifi, Cable, Smartphone, Gauge, RefreshCw, Zap, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';

/**
 * لوحة مراقبة الشبكة الحقيقية
 * تعرض بيانات فعلية من الشبكة
 */
export function RealNetworkDashboard() {
  const { t } = useTranslation();
  const {
    isOnline,
    connectionType,
    speed,
    devices,
    lastUpdate,
    isLoading,
    measureSpeed,
    scanDevices,
    qualityScore
  } = useRealNetworkMonitoring();

  const getConnectionIcon = () => {
    if (connectionType.includes('كابل') || connectionType.includes('ethernet')) {
      return <Cable className="h-5 w-5" />;
    }
    if (connectionType.includes('واي فاي') || connectionType.includes('wifi')) {
      return <Wifi className="h-5 w-5" />;
    }
    if (connectionType.includes('جوال') || connectionType.includes('cellular')) {
      return <Smartphone className="h-5 w-5" />;
    }
    return <Zap className="h-5 w-5" />;
  };

  const getSpeedColor = (speed: number) => {
    if (speed > 50) return 'text-green-600';
    if (speed > 25) return 'text-yellow-600';
    if (speed > 10) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* حالة الاتصال الرئيسية */}
      <Card className="border-2">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getConnectionIcon()}
              <span>حالة الشبكة المباشرة</span>
            </div>
            <Badge variant={isOnline ? 'default' : 'destructive'}>
              {isOnline ? 'متصل' : 'غير متصل'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">نوع الاتصال</div>
              <div className="font-medium">{connectionType}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">جودة الاتصال</div>
              <div className="font-medium">{qualityScore}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">الأجهزة المتصلة</div>
              <div className="font-medium">{devices.length}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">آخر تحديث</div>
              <div className="font-medium text-xs">
                {formatDistanceToNow(lastUpdate, { addSuffix: true, locale: ar })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* سرعة الإنترنت الفعلية */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gauge className="h-5 w-5" />
              <span>اختبار السرعة الفعلي</span>
            </div>
            <Button 
              onClick={measureSpeed} 
              disabled={isLoading || !isOnline}
              size="sm"
              variant="outline"
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Gauge className="h-4 w-4 mr-2" />
              )}
              {isLoading ? 'جاري القياس...' : 'قياس السرعة'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">سرعة التحميل</div>
              <div className={`text-2xl font-bold ${getSpeedColor(speed.download)}`}>
                {speed.download.toFixed(1)} 
                <span className="text-sm ml-1">Mbps</span>
              </div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">سرعة الرفع</div>
              <div className={`text-2xl font-bold ${getSpeedColor(speed.upload)}`}>
                {speed.upload.toFixed(1)}
                <span className="text-sm ml-1">Mbps</span>
              </div>
            </div>
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">زمن الاستجابة</div>
              <div className={`text-2xl font-bold ${speed.ping < 50 ? 'text-green-600' : 'text-red-600'}`}>
                {speed.ping.toFixed(0)}
                <span className="text-sm ml-1">ms</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* الأجهزة المتصلة */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span>الأجهزة المكتشفة</span>
            </div>
            <Button 
              onClick={scanDevices} 
              size="sm"
              variant="outline"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              فحص الشبكة
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {devices.length > 0 ? (
            <div className="space-y-2">
              {devices.map((device, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <div className="font-medium">{device.name}</div>
                    <div className="text-sm text-muted-foreground">{device.ip}</div>
                  </div>
                  <Badge variant="outline">{device.type}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              انقر "فحص الشبكة" لكشف الأجهزة المتصلة
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
