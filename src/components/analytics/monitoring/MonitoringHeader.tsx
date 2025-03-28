
import React from "react";
import { Activity, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MonitoringHeaderProps {
  onRefresh: () => void;
  isRefreshing: boolean;
}

export function MonitoringHeader({ onRefresh, isRefreshing }: MonitoringHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-octaBlue-800 font-tajawal flex items-center text-lg font-bold">
          <Activity className="mr-2 h-5 w-5 text-octaBlue-600" />
          مراقبة الشبكة في الوقت الفعلي
        </div>
        <p className="text-sm text-muted-foreground font-tajawal">
          قياس سرعة ومستوى أداء الشبكة بشكل مباشر
        </p>
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onRefresh} 
        disabled={isRefreshing}
        className="font-tajawal flex items-center gap-1"
      >
        <RefreshCw size={14} className={cn("mr-1", isRefreshing && "animate-spin")} />
        تحديث
      </Button>
    </div>
  );
}
