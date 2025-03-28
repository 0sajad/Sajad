
import React from "react";
import { ArrowDownToLine, ArrowUpFromLine, Zap } from "lucide-react";

interface NetworkStatsCardsProps {
  downloadSpeed: number;
  uploadSpeed: number;
  latency: number;
}

export function NetworkStatsCards({ downloadSpeed, uploadSpeed, latency }: NetworkStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="flex items-center">
          <ArrowDownToLine className="text-blue-500 mr-2 h-8 w-8" />
          <div>
            <p className="text-sm text-muted-foreground font-tajawal">سرعة التنزيل</p>
            <p className="text-2xl font-bold">{downloadSpeed} Mbps</p>
          </div>
        </div>
      </div>
      
      <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100">
        <div className="flex items-center">
          <ArrowUpFromLine className="text-green-500 mr-2 h-8 w-8" />
          <div>
            <p className="text-sm text-muted-foreground font-tajawal">سرعة الرفع</p>
            <p className="text-2xl font-bold">{uploadSpeed} Mbps</p>
          </div>
        </div>
      </div>
      
      <div className="p-4 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100">
        <div className="flex items-center">
          <Zap className="text-amber-500 mr-2 h-8 w-8" />
          <div>
            <p className="text-sm text-muted-foreground font-tajawal">زمن الإستجابة</p>
            <p className="text-2xl font-bold">{latency} ms</p>
          </div>
        </div>
      </div>
    </div>
  );
}
