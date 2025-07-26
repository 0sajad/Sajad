import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const RecentActivity = () => {
  const { t } = useTranslation();

  const activities = [
    {
      id: 1,
      type: 'success',
      title: t('dashboard.activity.networkScanCompleted'),
      time: '5 دقائق مضت',
      description: 'تم العثور على 8 أجهزة متصلة',
      icon: CheckCircle
    },
    {
      id: 2,
      type: 'warning',
      title: t('dashboard.activity.slowConnection'),
      time: '15 دقيقة مضت',
      description: 'سرعة الإنترنت أقل من المعتاد',
      icon: AlertTriangle
    },
    {
      id: 3,
      type: 'info',
      title: t('dashboard.activity.deviceConnected'),
      time: '30 دقيقة مضت',
      description: 'جهاز جديد متصل بالشبكة',
      icon: Info
    },
    {
      id: 4,
      type: 'success',
      title: t('dashboard.activity.speedTestCompleted'),
      time: '1 ساعة مضت',
      description: 'نتائج اختبار السرعة: 125 Mbps',
      icon: CheckCircle
    }
  ];

  const getVariant = (type: string) => {
    switch (type) {
      case 'success':
        return 'default';
      case 'warning':
        return 'destructive';
      case 'info':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'info':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('dashboard.activity.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <activity.icon className={`h-5 w-5 mt-1 ${getIconColor(activity.type)}`} />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <Badge variant={getVariant(activity.type)} className="text-xs">
                    {activity.time}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;