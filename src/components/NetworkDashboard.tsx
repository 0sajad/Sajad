
import React, { useState, useEffect } from "react";
import { GlassCard } from "./ui/glass-card";
import { toast } from "./ui/use-toast";
import { 
  Activity, 
  Wifi, 
  Database, 
  Zap, 
  BarChart3, 
  Shield, 
  Cpu,
  Server,
  WifiOff,
  AlertTriangle
} from "lucide-react";
import { Progress } from "./ui/progress";

export function NetworkDashboard() {
  const [networkStats, setNetworkStats] = useState({
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

  return (
    <section id="dashboard" className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-tajawal">لوحة مراقبة الشبكة</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-tajawal">
            تحليل ومراقبة أداء الشبكة والأجهزة المتصلة في الوقت الفعلي
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <GlassCard className="p-4 animate-fade-in">
            <div className="flex items-center">
              <div className="p-3 rounded-xl mr-4 text-green-500 bg-green-50">
                <Activity size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-tajawal">حالة الشبكة</p>
                <p className="text-xl font-semibold font-tajawal">نشطة</p>
              </div>
            </div>
            <Progress value={networkStats.signalStrength} className="mt-2" />
          </GlassCard>

          <GlassCard className="p-4 animate-fade-in">
            <div className="flex items-center">
              <div className="p-3 rounded-xl mr-4 text-octaBlue-600 bg-octaBlue-50">
                <Wifi size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-tajawal">الأجهزة المتصلة</p>
                <p className="text-xl font-semibold">{networkStats.connectedDevices}</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-4 animate-fade-in">
            <div className="flex items-center">
              <div className="p-3 rounded-xl mr-4 text-purple-500 bg-purple-50">
                <Database size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-tajawal">نقل البيانات</p>
                <p className="text-xl font-semibold">{networkStats.dataTransfer}</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-4 animate-fade-in">
            <div className="flex items-center">
              <div className="p-3 rounded-xl mr-4 text-amber-500 bg-amber-50">
                <Zap size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-tajawal">سرعة الشبكة</p>
                <p className="text-xl font-semibold">{networkStats.networkSpeed}</p>
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <GlassCard className="lg:col-span-2 h-[300px] animate-fade-in p-0 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-medium font-tajawal">أداء الشبكة</h3>
              <p className="text-sm text-muted-foreground font-tajawal">السرعة والتأخير في الوقت الفعلي</p>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-tajawal">سرعة التحميل</span>
                    <span className="text-sm">{networkStats.download.toFixed(1)} Mbps</span>
                  </div>
                  <Progress value={networkStats.download} />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-tajawal">سرعة الرفع</span>
                    <span className="text-sm">{networkStats.upload.toFixed(1)} Mbps</span>
                  </div>
                  <Progress value={networkStats.upload} />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-tajawal">زمن الاستجابة</span>
                    <span className="text-sm">{networkStats.ping.toFixed(0)} ms</span>
                  </div>
                  <Progress value={networkStats.ping} />
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="h-[300px] animate-fade-in p-0 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-medium font-tajawal">حالة الأمان</h3>
              <p className="text-sm text-muted-foreground font-tajawal">مؤشرات حماية الشبكة</p>
            </div>
            <div className="p-4 flex flex-col h-[240px]">
              <div className="flex items-center mb-4 p-3 bg-green-50 rounded-lg">
                <Shield className="text-green-500 mr-3" size={20} />
                <div>
                  <p className="text-sm font-medium font-tajawal">جدار الحماية</p>
                  <p className="text-xs text-muted-foreground font-tajawal">يعمل بكامل طاقته</p>
                </div>
              </div>
              
              <div className="flex items-center mb-4 p-3 bg-green-50 rounded-lg">
                <Cpu className="text-green-500 mr-3" size={20} />
                <div>
                  <p className="text-sm font-medium font-tajawal">كشف التطفل</p>
                  <p className="text-xs text-muted-foreground font-tajawal">نشط - لا توجد تهديدات</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <Server className="text-green-500 mr-3" size={20} />
                <div>
                  <p className="text-sm font-medium font-tajawal">حالة VPN</p>
                  <p className="text-xs text-muted-foreground font-tajawal">متصل - آمن</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
