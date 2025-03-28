
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  
  // حساب لون شريط التقدم بناءً على الجودة
  const getProgressColor = (score: number) => {
    if (score >= 85) return "bg-green-500";
    if (score >= 70) return "bg-blue-500";
    if (score >= 50) return "bg-amber-500";
    return "bg-red-500";
  };
  
  return (
    <div className="h-full">
      <div className="text-center mb-6">
        <div className="relative inline-flex items-center justify-center w-40 h-40 mb-3">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold">{qualityScore}</span>
          </div>
          
          {/* حلقة تقدم دائرية */}
          <svg className="absolute inset-0 transform -rotate-90" width="160" height="160" viewBox="0 0 160 160">
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="12"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke={qualityScore >= 85 ? "#22c55e" : qualityScore >= 70 ? "#3b82f6" : qualityScore >= 50 ? "#f59e0b" : "#ef4444"}
              strokeWidth="12"
              strokeDasharray={`${qualityScore * 4.4} 440`}
            />
          </svg>
        </div>
        
        <p className="text-lg font-medium">{isRTL ? "الجودة" : "Quality"}: <span className={quality.color}>{quality.label}</span></p>
      </div>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm flex items-center">
              <Zap className="mr-1 h-4 w-4 text-amber-500" />
              {isRTL ? "زمن الإستجابة" : "Response Time"}
            </span>
            <span className="text-sm font-medium">{latency} ms</span>
          </div>
          <Progress value={Math.min(100 - (latency * 2), 100)} className="h-2" indicatorClassName={latency <= 20 ? "bg-green-500" : latency <= 50 ? "bg-blue-500" : "bg-amber-500"} />
          <p className="text-xs text-muted-foreground mt-1">
            {latency <= 20 ? (isRTL ? "ممتاز: مثالي للألعاب والبث المباشر" : "Excellent: Ideal for gaming and streaming") : 
             latency <= 50 ? (isRTL ? "جيد: مناسب لمعظم التطبيقات" : "Good: Suitable for most applications") : 
             (isRTL ? "متوسط: قد تواجه تأخيرًا في بعض التطبيقات" : "Average: May experience delays in some applications")}
          </p>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm flex items-center">
              <Wifi className="mr-1 h-4 w-4 text-blue-500" />
              {isRTL ? "فقد الحزم" : "Packet Loss"}
            </span>
            <span className="text-sm font-medium">{packetLoss}%</span>
          </div>
          <Progress value={Math.max(100 - (packetLoss * 20), 0)} className="h-2" indicatorClassName={packetLoss <= 1 ? "bg-green-500" : packetLoss <= 2 ? "bg-blue-500" : "bg-red-500"} />
          <p className="text-xs text-muted-foreground mt-1">
            {packetLoss <= 1 ? (isRTL ? "ممتاز: فقد حزم أقل من الحد الأدنى" : "Excellent: Minimal packet loss") : 
             packetLoss <= 2 ? (isRTL ? "مقبول: قد تلاحظ بعض التقطع أحيانًا" : "Acceptable: May notice occasional stuttering") : 
             (isRTL ? "ضعيف: قد تواجه مشاكل في الاتصال" : "Poor: May experience connection issues")}
          </p>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm flex items-center">
              <Activity className="mr-1 h-4 w-4 text-purple-500" />
              {isRTL ? "تذبذب الشبكة" : "Network Jitter"}
            </span>
            <span className="text-sm font-medium">{jitter} ms</span>
          </div>
          <Progress value={Math.max(100 - (jitter * 20), 0)} className="h-2" indicatorClassName={jitter <= 2 ? "bg-green-500" : jitter <= 5 ? "bg-blue-500" : "bg-red-500"} />
          <p className="text-xs text-muted-foreground mt-1">
            {jitter <= 2 ? (isRTL ? "ممتاز: شبكة مستقرة للغاية" : "Excellent: Very stable network") : 
             jitter <= 5 ? (isRTL ? "جيد: مستوى تذبذب منخفض" : "Good: Low jitter level") : 
             (isRTL ? "ضعيف: شبكة غير مستقرة" : "Poor: Unstable network")}
          </p>
        </div>
      </div>
      
      <div className="mt-6 p-3 bg-blue-50 rounded-md">
        <p className="text-sm font-medium">{isRTL ? "ملخص التشخيص" : "Diagnostic Summary"}:</p>
        <p className="text-xs text-muted-foreground mt-1">
          {qualityScore >= 85 ? 
            (isRTL ? "الشبكة في حالة ممتازة. نوصي بالحفاظ على الإعدادات الحالية." : "Network is in excellent condition. We recommend maintaining current settings.") : 
            qualityScore >= 70 ? 
            (isRTL ? "الشبكة في حالة جيدة. يمكن تحسين بعض الإعدادات لتحقيق أداء أفضل." : "Network is in good condition. Some settings can be optimized for better performance.") :
            (isRTL ? "الشبكة تعاني من بعض المشاكل. نوصي بتشغيل أداة تحسين الشبكة." : "Network is experiencing some issues. We recommend running the network optimization tool.")}
        </p>
      </div>
    </div>
  );
};
