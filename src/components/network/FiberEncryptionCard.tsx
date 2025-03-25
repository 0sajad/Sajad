
import React from "react";
import { Lock, ShieldCheck } from "lucide-react";
import { GlassCard } from "../ui/glass-card";
import { cn } from "@/lib/utils";

interface FiberEncryptionCardProps {
  encryptionEnabled: boolean;
  encryptionType: string;
}

export const FiberEncryptionCard: React.FC<FiberEncryptionCardProps> = ({ 
  encryptionEnabled, 
  encryptionType 
}) => {
  return (
    <GlassCard className="p-4 animate-fade-in">
      <div className="flex items-center">
        <div className={cn(
          "p-3 rounded-xl mr-4",
          encryptionEnabled ? "text-blue-500 bg-blue-50" : "text-gray-400 bg-gray-100"
        )}>
          {encryptionEnabled ? <ShieldCheck size={20} /> : <Lock size={20} />}
        </div>
        <div>
          <p className="text-sm text-muted-foreground font-tajawal">تشفير الألياف</p>
          <p className="text-xl font-semibold font-tajawal">
            {encryptionEnabled ? "مفعّل" : "غير مفعّل"}
          </p>
        </div>
      </div>
      {encryptionEnabled && (
        <div className="mt-2 text-xs">
          <p className="text-muted-foreground font-tajawal">نوع التشفير: {encryptionType}</p>
        </div>
      )}
    </GlassCard>
  );
};
