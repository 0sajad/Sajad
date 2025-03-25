
import React from "react";
import { Shield, Cpu, Server } from "lucide-react";
import { GlassCard } from "../ui/glass-card";

export const SecurityStatusCard: React.FC = () => {
  return (
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
  );
};
