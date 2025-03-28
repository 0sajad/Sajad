
import React from "react";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "react-i18next";
import { Activity, Zap, Wifi } from "lucide-react";

interface NetworkQualityGaugeProps {
  title?: string;
  description?: string;
  qualityScore: number;
  latency: number;
  packetLoss: number;
  jitter: number;
}

export const NetworkQualityGauge: React.FC<NetworkQualityGaugeProps> = ({
  title,
  description,
  qualityScore = 87,
  latency = 24,
  packetLoss = 0.5,
  jitter = 1.2
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  
  // تحديد حالة الجودة بناءً على النتيجة
  const getQualityStatus = (score: number) => {
    if (score >= 85) return { label: isRTL ? "ممتاز" : "Excellent", color: "text-green-600" };
    if (score >= 70) return { label: isRTL ? "جيد" : "Good", color: "text-blue-600" };
    if (score >= 50) return { label: isRTL ? "متوسط" : "Average", color: "text-amber-600" };
    return { label: isRTL ? "ضعيف" : "Poor", color: "text-red-600" };
  };
  
  const quality = getQualityStatus(qualityScore);
  
  return (
    <div className="h-full">
      <div className="text-right mb-4">
        <h2 className="text-xl font-bold text-blue-800 dark:text-blue-400 mb-1">{isRTL ? "مؤشر جودة الشبكة" : "Network Quality Gauge"}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{isRTL ? "تحليل مفصل لحالة وأداء الشبكة الحالية" : "Detailed analysis of current network quality"}</p>
      </div>
      
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="relative w-48 h-48 mb-3">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="8"
              className="dark:stroke-gray-700"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#22c55e"
              strokeWidth="8"
              strokeDasharray={`${qualityScore * 2.83} 283`}
              strokeLinecap="round"
              className="transition-all duration-700"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl font-bold dark:text-white">{qualityScore}</span>
          </div>
        </div>
        
        <p className="text-lg font-medium text-center dark:text-white">{isRTL ? "الجودة" : "Quality"}: <span className={quality.color}>{quality.label}</span></p>
      </div>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium dark:text-gray-300">{isRTL ? "زمن الإستجابة" : "Response Time"}</span>
            <span className="text-sm font-medium flex items-center dark:text-gray-300">
              <Zap className="mx-1 h-4 w-4 text-amber-500" />
              {latency} ms
            </span>
          </div>
          <Progress value={Math.min(100 - (latency * 2), 100)} className="h-2 bg-gray-200 dark:bg-gray-700" />
          <p className="text-xs text-muted-foreground mt-1 dark:text-gray-400">
            {isRTL ? "مناسب لمعظم التطبيقات" : "Suitable for most applications"}
          </p>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium dark:text-gray-300">{isRTL ? "فقد الحزم" : "Packet Loss"}</span>
            <span className="text-sm font-medium flex items-center dark:text-gray-300">
              <Wifi className="mx-1 h-4 w-4 text-blue-500" />
              {packetLoss}%
            </span>
          </div>
          <Progress value={Math.max(100 - (packetLoss * 20), 0)} className="h-2 bg-gray-200 dark:bg-gray-700" />
          <p className="text-xs text-muted-foreground mt-1 dark:text-gray-400">
            {isRTL ? "معدل فقد الحزم أقل من المعدل العادي" : "Packet loss rate is below average"}
          </p>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium dark:text-gray-300">{isRTL ? "تذبذب الشبكة" : "Network Jitter"}</span>
            <span className="text-sm font-medium flex items-center dark:text-gray-300">
              <Activity className="mx-1 h-4 w-4 text-purple-500" />
              {jitter} ms
            </span>
          </div>
          <Progress value={Math.max(100 - (jitter * 20), 0)} className="h-2 bg-gray-200 dark:bg-gray-700" />
          <p className="text-xs text-muted-foreground mt-1 dark:text-gray-400">
            {isRTL ? "معدل تذبذب مستقر ممتاز" : "Excellent stable jitter level"}
          </p>
        </div>
      </div>
    </div>
  );
};
