import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wifi, Activity, Settings, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const actions = [
    {
      title: t('dashboard.quickActions.scanNetwork'),
      description: t('dashboard.quickActions.scanNetworkDesc'),
      icon: Wifi,
      action: () => navigate('/fiber-optic'),
      color: 'bg-blue-500'
    },
    {
      title: t('dashboard.quickActions.speedTest'),
      description: t('dashboard.quickActions.speedTestDesc'),
      icon: Zap,
      action: () => navigate('/real-monitor'),
      color: 'bg-green-500'
    },
    {
      title: t('dashboard.quickActions.realTimeMonitor'),
      description: t('dashboard.quickActions.realTimeMonitorDesc'),
      icon: Activity,
      action: () => navigate('/real-monitor'),
      color: 'bg-orange-500'
    },
    {
      title: t('dashboard.quickActions.settings'),
      description: t('dashboard.quickActions.settingsDesc'),
      icon: Settings,
      action: () => navigate('/settings'),
      color: 'bg-purple-500'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('dashboard.quickActions.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 flex flex-col items-start space-y-2"
              onClick={action.action}
            >
              <div className="flex items-center space-x-2">
                <div className={`p-2 rounded-md ${action.color}`}>
                  <action.icon className="h-4 w-4 text-white" />
                </div>
                <span className="font-semibold">{action.title}</span>
              </div>
              <p className="text-sm text-muted-foreground text-left">
                {action.description}
              </p>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;