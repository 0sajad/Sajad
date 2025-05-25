
import React, { useEffect } from 'react';
import { useRealNetworkMonitoring } from '@/hooks/useRealNetworkMonitoring';
import { toast } from 'sonner';

/**
 * مكون الإشعارات التلقائية للشبكة
 * يراقب تغييرات الشبكة ويرسل إشعارات
 */
export function NetworkNotifications() {
  const { isOnline, connectionType, speed } = useRealNetworkMonitoring();

  useEffect(() => {
    // إشعار عند انخفاض السرعة
    if (speed.download > 0 && speed.download < 5) {
      toast.warning('تحذير: سرعة الإنترنت منخفضة', {
        description: `السرعة الحالية: ${speed.download.toFixed(1)} Mbps`
      });
    }

    // إشعار عند ارتفاع زمن الاستجابة
    if (speed.ping > 100) {
      toast.warning('تحذير: زمن الاستجابة مرتفع', {
        description: `Ping: ${speed.ping.toFixed(0)}ms`
      });
    }

    // إشعار عند السرعة الممتازة
    if (speed.download > 100) {
      toast.success('🚀 سرعة إنترنت ممتازة!', {
        description: `${speed.download.toFixed(1)} Mbps`
      });
    }
  }, [speed]);

  return null; // هذا المكون لا يعرض أي شيء، فقط يدير الإشعارات
}
