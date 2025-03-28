
import React from "react";
import { AlertTriangle } from "lucide-react";

interface Anomaly {
  time: string;
  type: 'latency' | 'download' | 'upload';
  value: number;
}

interface NetworkAlertsProps {
  anomalies: Anomaly[];
}

export function NetworkAlerts({ anomalies }: NetworkAlertsProps) {
  if (!anomalies.length) return null;

  return (
    <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
      <h3 className="text-md font-medium mb-3 flex items-center font-tajawal">
        <AlertTriangle className="text-amber-500 mr-2 h-5 w-5" />
        تنبيهات الشبكة
      </h3>
      <div className="space-y-3 max-h-36 overflow-y-auto">
        {anomalies.map((anomaly, index) => (
          <div key={index} className="flex items-start space-x-2 rtl:space-x-reverse">
            <div className={`w-2 h-2 mt-1.5 rounded-full ${
              anomaly.type === 'latency' ? 'bg-amber-500' : 
              anomaly.type === 'download' ? 'bg-blue-500' : 'bg-green-500'
            }`} />
            <div>
              <p className="text-sm font-medium font-tajawal">
                {anomaly.type === 'latency' ? 'ارتفاع في زمن الإستجابة' : 
                 anomaly.type === 'download' ? 'انخفاض في سرعة التنزيل' : 
                 'انخفاض في سرعة الرفع'}
              </p>
              <p className="text-xs text-muted-foreground font-tajawal">
                {anomaly.time} - القيمة: {anomaly.value} 
                {anomaly.type === 'latency' ? ' ms' : ' Mbps'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
