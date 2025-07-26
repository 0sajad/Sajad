import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Wifi, Router, Smartphone, Monitor } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const NetworkOverview = () => {
  const { t } = useTranslation();

  const networkInfo = {
    ssid: 'Home_Network_5G',
    security: 'WPA3',
    channel: '149',
    frequency: '5.745 GHz',
    signalStrength: 85,
    bandwidth: '80 MHz'
  };

  const connectedDevices = [
    { name: 'iPhone 13', type: 'phone', icon: Smartphone, status: 'active' },
    { name: 'MacBook Pro', type: 'laptop', icon: Monitor, status: 'active' },
    { name: 'Samsung TV', type: 'tv', icon: Monitor, status: 'idle' },
    { name: 'Router', type: 'router', icon: Router, status: 'active' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'idle':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Network Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wifi className="h-5 w-5" />
            <span>{t('dashboard.network.networkInfo')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">SSID:</span>
              <span className="text-sm font-medium">{networkInfo.ssid}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">الأمان:</span>
              <Badge variant="outline">{networkInfo.security}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">القناة:</span>
              <span className="text-sm font-medium">{networkInfo.channel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">التردد:</span>
              <span className="text-sm font-medium">{networkInfo.frequency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">النطاق:</span>
              <span className="text-sm font-medium">{networkInfo.bandwidth}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">قوة الإشارة:</span>
              <span className="text-sm font-medium">{networkInfo.signalStrength}%</span>
            </div>
            <Progress value={networkInfo.signalStrength} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Connected Devices */}
      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.network.connectedDevices')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {connectedDevices.map((device, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <device.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{device.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div 
                    className={`w-2 h-2 rounded-full ${getStatusColor(device.status)}`}
                  />
                  <span className="text-xs text-muted-foreground capitalize">
                    {device.status === 'active' ? 'نشط' : 
                     device.status === 'idle' ? 'خامل' : 'غير متصل'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NetworkOverview;