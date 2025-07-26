import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Globe, Wifi, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const DashboardStats = () => {
  const { t } = useTranslation();

  const stats = [
    {
      title: t('dashboard.stats.networkSpeed'),
      value: '125 Mbps',
      icon: Activity,
      trend: '+12%'
    },
    {
      title: t('dashboard.stats.connectedDevices'),
      value: '8',
      icon: Users,
      trend: '+2'
    },
    {
      title: t('dashboard.stats.signalStrength'),
      value: '92%',
      icon: Wifi,
      trend: '+5%'
    },
    {
      title: t('dashboard.stats.networkStatus'),
      value: t('dashboard.stats.online'),
      icon: Globe,
      trend: '100%'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.trend} من الشهر الماضي
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;