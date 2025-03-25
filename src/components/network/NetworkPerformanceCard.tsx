
import React from "react";
import { GlassCard } from "../ui/glass-card";
import { Progress } from "../ui/progress";

interface NetworkPerformanceCardProps {
  download: number;
  upload: number;
  ping: number;
}

export const NetworkPerformanceCard: React.FC<NetworkPerformanceCardProps> = ({ download, upload, ping }) => {
  return (
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
              <span className="text-sm">{download.toFixed(1)} Mbps</span>
            </div>
            <Progress value={download} />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-tajawal">سرعة الرفع</span>
              <span className="text-sm">{upload.toFixed(1)} Mbps</span>
            </div>
            <Progress value={upload} />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-tajawal">زمن الاستجابة</span>
              <span className="text-sm">{ping.toFixed(0)} ms</span>
            </div>
            <Progress value={ping} />
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
