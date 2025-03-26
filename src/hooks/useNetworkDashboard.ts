
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "@/components/ui/use-toast";

export function useNetworkDashboard() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState({
    deviceCount: 0,
    activeAlerts: 0,
    networkScore: 0,
    securityStatus: 'secure',
    recentEvents: []
  });

  useEffect(() => {
    // محاكاة تحميل بيانات لوحة المعلومات
    const timer = setTimeout(() => {
      setDashboardStats({
        deviceCount: Math.floor(Math.random() * 15) + 5,
        activeAlerts: Math.floor(Math.random() * 3),
        networkScore: Math.floor(Math.random() * 30) + 70,
        securityStatus: Math.random() > 0.2 ? 'secure' : 'warning',
        recentEvents: [
          { id: 1, type: 'connection', device: 'Laptop', time: '10 min ago' },
          { id: 2, type: 'security', device: 'Router', time: '25 min ago' },
          { id: 3, type: 'performance', device: 'Network', time: '1 hr ago' }
        ]
      });
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // مراقبة التنبيهات النشطة وإظهار إشعار إذا كانت هناك تنبيهات
  useEffect(() => {
    if (!isLoading && dashboardStats.activeAlerts > 0) {
      toast({
        title: t('dashboard.alerts'),
        description: t('dashboard.activeAlertsDescription', {
          count: dashboardStats.activeAlerts
        }),
        variant: dashboardStats.activeAlerts > 1 ? "destructive" : "default"
      });
    }
  }, [dashboardStats.activeAlerts, isLoading, t]);

  return {
    isLoading,
    ...dashboardStats
  };
}
