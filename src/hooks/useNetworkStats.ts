
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

interface NetworkStats {
  download: number;
  upload: number;
  ping: number;
  signalStrength: number;
  connectedDevices: number;
  dataTransfer: string;
  networkSpeed: string;
}

export function useNetworkStats() {
  const [networkStats, setNetworkStats] = useState<NetworkStats>({
    download: 0,
    upload: 0,
    ping: 0,
    signalStrength: 0,
    connectedDevices: 0,
    dataTransfer: "0",
    networkSpeed: "0",
  });

  useEffect(() => {
    // محاكاة قياس سرعة الشبكة
    const interval = setInterval(() => {
      setNetworkStats(prev => ({
        ...prev,
        download: Math.random() * 100,
        upload: Math.random() * 50,
        ping: Math.random() * 100,
        signalStrength: Math.random() * 100,
        connectedDevices: Math.floor(Math.random() * 10),
        dataTransfer: (Math.random() * 2).toFixed(1) + " GB",
        networkSpeed: Math.floor(Math.random() * 1000) + " Mbps"
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // مراقبة حالة الشبكة وإرسال تنبيهات
  useEffect(() => {
    if (networkStats.signalStrength < 30) {
      toast({
        title: "تحذير: إشارة ضعيفة",
        description: "قوة إشارة الشبكة منخفضة. حاول الاقتراب من نقطة الوصول.",
        variant: "destructive"
      });
    }
  }, [networkStats.signalStrength]);

  return networkStats;
}
