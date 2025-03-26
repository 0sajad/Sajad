
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "react-i18next";
import { Activity, Zap, Wifi } from "lucide-react";

interface NetworkQualityGaugeProps {
  title?: string;
  description?: string;
  qualityScore?: number;
  latency?: number;
  packetLoss?: number;
  jitter?: number;
  className?: string;
}

export const NetworkQualityGauge: React.FC<NetworkQualityGaugeProps> = ({
  title = "مؤشر جودة الشبكة",
  description = "تحليل مفصل لحالة وأداء الشبكة الحالية",
  qualityScore: initialScore,
  latency: initialLatency,
  packetLoss: initialPacketLoss,
  jitter: initialJitter,
  className
}) => {
  const { t } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [qualityScore, setQualityScore] = useState(initialScore || 87);
  const [latency, setLatency] = useState(initialLatency || 24);
  const [packetLoss, setPacketLoss] = useState(initialPacketLoss || 0.5);
  const [jitter, setJitter] = useState(initialJitter || 1.2);
  
  // تهيئة القيم الافتراضية إذا لم تكن متوفرة
  useEffect(() => {
    // تأخير صغير لضمان بدء العرض بعد تحميل الصفحة
    const timer = setTimeout(() => {
      setIsLoaded(true);
      
      // تحديث القيم فقط إذا لم يتم تمريرها كـprops
      if (initialScore === undefined) {
        setQualityScore(Math.floor(Math.random() * 30) + 70); // قيمة عشوائية بين 70 و 100
      }
      
      if (initialLatency === undefined) {
        setLatency(Math.floor(Math.random() * 50) + 10); // قيمة عشوائية بين 10 و 60
      }
      
      if (initialPacketLoss === undefined) {
        setPacketLoss(Number((Math.random() * 2).toFixed(1))); // قيمة عشوائية بين 0 و 2
      }
      
      if (initialJitter === undefined) {
        setJitter(Number((Math.random() * 5).toFixed(1))); // قيمة عشوائية بين 0 و 5
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [initialScore, initialLatency, initialPacketLoss, initialJitter]);
  
  // تحديد حالة الجودة بناءً على النتيجة
  const getQualityStatus = (score: number) => {
    if (score >= 85) return { label: "ممتاز", color: "text-green-600" };
    if (score >= 70) return { label: "جيد", color: "text-blue-600" };
    if (score >= 50) return { label: "متوسط", color: "text-amber-600" };
    return { label: "ضعيف", color: "text-red-600" };
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
    <Card className={`border-octaBlue-200 shadow-md animate-fade-in ${className || ''}`}>
      <CardHeader className="bg-gradient-to-r from-octaBlue-50 to-octaBlue-100 rounded-t-lg">
        <CardTitle className="text-octaBlue-800 font-tajawal flex items-center">
          <Activity className="mr-2 h-5 w-5 text-octaBlue-600" />
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground font-tajawal">{description}</p>
      </CardHeader>
      
      <CardContent className="pt-6">
        {!isLoaded ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="relative inline-flex items-center justify-center w-40 h-40 rounded-full bg-gray-100 mb-3">
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
              
              <p className="text-lg font-medium font-tajawal">الجودة: <span className={quality.color}>{quality.label}</span></p>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm flex items-center font-tajawal">
                    <Zap className="mr-1 h-4 w-4 text-amber-500" />
                    زمن الإستجابة
                  </span>
                  <span className="text-sm font-medium">{latency} ms</span>
                </div>
                <Progress value={Math.min(100 - (latency * 2), 100)} className={latency <= 20 ? "bg-green-100" : latency <= 50 ? "bg-blue-100" : "bg-amber-100"} />
                <p className="text-xs text-muted-foreground mt-1 font-tajawal">
                  {latency <= 20 ? "ممتاز: مثالي للألعاب والبث المباشر" : 
                   latency <= 50 ? "جيد: مناسب لمعظم التطبيقات" : 
                   "متوسط: قد تواجه تأخيرًا في بعض التطبيقات"}
                </p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm flex items-center font-tajawal">
                    <Wifi className="mr-1 h-4 w-4 text-blue-500" />
                    فقد الحزم
                  </span>
                  <span className="text-sm font-medium">{packetLoss}%</span>
                </div>
                <Progress value={Math.max(100 - (packetLoss * 20), 0)} className={packetLoss <= 1 ? "bg-green-100" : packetLoss <= 2 ? "bg-blue-100" : "bg-red-100"} />
                <p className="text-xs text-muted-foreground mt-1 font-tajawal">
                  {packetLoss <= 1 ? "ممتاز: فقد حزم أقل من الحد الأدنى" : 
                   packetLoss <= 2 ? "مقبول: قد تلاحظ بعض التقطع أحيانًا" : 
                   "ضعيف: قد تواجه مشاكل في الاتصال"}
                </p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm flex items-center font-tajawal">
                    <Activity className="mr-1 h-4 w-4 text-purple-500" />
                    تذبذب الشبكة
                  </span>
                  <span className="text-sm font-medium">{jitter} ms</span>
                </div>
                <Progress value={Math.max(100 - (jitter * 20), 0)} className={jitter <= 2 ? "bg-green-100" : jitter <= 5 ? "bg-blue-100" : "bg-red-100"} />
                <p className="text-xs text-muted-foreground mt-1 font-tajawal">
                  {jitter <= 2 ? "ممتاز: شبكة مستقرة للغاية" : 
                   jitter <= 5 ? "جيد: مستوى تذبذب منخفض" : 
                   "ضعيف: شبكة غير مستقرة"}
                </p>
              </div>
            </div>
            
            <div className="mt-6 p-3 bg-blue-50 rounded-md">
              <p className="text-sm font-medium font-tajawal">ملخص التشخيص:</p>
              <p className="text-xs text-muted-foreground mt-1 font-tajawal">
                {qualityScore >= 85 ? 
                  "الشبكة في حالة ممتازة. نوصي بالحفاظ على الإعدادات الحالية." : 
                  qualityScore >= 70 ? 
                  "الشبكة في حالة جيدة. يمكن تحسين بعض الإعدادات لتحقيق أداء أفضل." :
                  "الشبكة تعاني من بعض المشاكل. نوصي بتشغيل أداة تحسين الشبكة."}
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
