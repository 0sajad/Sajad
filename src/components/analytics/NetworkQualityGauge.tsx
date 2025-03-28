
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
    <div className="h-full p-4">
      <div className="text-right mb-4">
        <h2 className="text-xl font-semibold text-blue-800 mb-1 flex items-center justify-end">
          <svg className="inline-block mr-2 text-blue-500" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.25 9.05C11.0259 7.54533 13.7416 7.54968 15.5125 9.0625C17.0265 10.3828 17.4349 12.4095 16.7455 14.1428" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.1169 15.0336C12.9127 15.6672 13.0517 16.376 13.4941 16.8509C13.9365 17.3258 14.6279 17.4949 15.2449 17.3116" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6.50006 6.5C9.26721 4.18333 13.5729 4.24075 16.2705 6.66644C18.6955 8.83239 19.1916 12.1722 17.5611 14.8616" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12.0531 19.0039C11.3967 19.0344 10.7422 18.8297 10.2101 18.4164C9.67798 18.0031 9.29922 17.4079 9.14213 16.739C8.98505 16.0702 9.05969 15.3701 9.35382 14.7516C9.64795 14.1331 10.1436 13.633 10.7588 13.3334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.5 3.5C7.8505 0.169249 14.5272 0.638349 18.2873 4.67051C21.6057 8.25144 21.7718 13.4428 18.8801 17.2071" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.0317 21.91C8.88573 21.5592 7.83017 20.9772 6.93322 20.2011C6.03626 19.425 5.32071 18.4701 4.83942 17.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          مؤشر جودة الشبكة
        </h2>
        <p className="text-sm text-gray-500">تحليل مفصل لحالة وأداء الشبكة الحالية</p>
      </div>
      
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="relative w-44 h-44 mb-3">
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
      
      <div className="space-y-4">
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
        
        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-2">ملخص التشخيص:</h3>
          <p className="text-xs text-gray-600">
            الشبكة في حالة ممتازة. نوصي بالحفاظ على الإعدادات الحالية.
          </p>
        </div>
      </div>
    </div>
  );
};
