
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
  
  // استخدام العناوين المترجمة إذا لم يتم توفيرها مباشرة
  const titleText = title || t('networkQuality.title', 'مؤشر جودة الشبكة');
  const descriptionText = description || t('networkQuality.description', 'تحليل مفصل لحالة وأداء الشبكة الحالية');
  
  // دعم اللغة العربية
  const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";
  
  // تحديد حالة الجودة بناءً على النتيجة
  const getQualityStatus = (score: number) => {
    if (score >= 85) return { 
      label: t('networkQuality.status.excellent', 'ممتاز'), 
      color: "text-green-600" 
    };
    if (score >= 70) return { 
      label: t('networkQuality.status.good', 'جيد'), 
      color: "text-blue-600" 
    };
    if (score >= 50) return { 
      label: t('networkQuality.status.fair', 'متوسط'), 
      color: "text-amber-600" 
    };
    return { 
      label: t('networkQuality.status.poor', 'ضعيف'), 
      color: "text-red-600" 
    };
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
    <Card className="border-octaBlue-200 shadow-md animate-fade-in">
      <CardHeader className={`bg-gradient-to-r from-octaBlue-50 to-octaBlue-100 rounded-t-lg ${isRTL ? 'rtl-text-right' : ''}`}>
        <CardTitle className="text-octaBlue-800 font-tajawal flex items-center">
          <Activity className={`h-5 w-5 text-octaBlue-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {titleText}
        </CardTitle>
        <p className="text-sm text-muted-foreground font-tajawal">{descriptionText}</p>
      </CardHeader>
      
      <CardContent className="pt-6">
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
          
          <p className="text-lg font-medium font-tajawal">
            {t('networkQuality.quality', 'الجودة')}: <span className={quality.color}>{quality.label}</span>
          </p>
        </div>
        
        <div className="space-y-6">
          <div>
            <div className={`flex justify-between items-center mb-1 ${isRTL ? 'rtl-reverse-flex' : ''}`}>
              <span className={`text-sm flex items-center font-tajawal ${isRTL ? 'rtl-reverse-flex' : ''}`}>
                <Zap className={`h-4 w-4 text-amber-500 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                {t('networkQuality.latency', 'زمن الإستجابة')}
              </span>
              <span className="text-sm font-medium">{latency} ms</span>
            </div>
            <Progress value={Math.min(100 - (latency * 2), 100)} className={latency <= 20 ? "bg-green-100" : latency <= 50 ? "bg-blue-100" : "bg-amber-100"} />
            <p className="text-xs text-muted-foreground mt-1 font-tajawal">
              {latency <= 20 ? 
                t('networkQuality.latencyDesc.excellent', 'ممتاز: مثالي للألعاب والبث المباشر') : 
                latency <= 50 ? 
                t('networkQuality.latencyDesc.good', 'جيد: مناسب لمعظم التطبيقات') : 
                t('networkQuality.latencyDesc.fair', 'متوسط: قد تواجه تأخيرًا في بعض التطبيقات')}
            </p>
          </div>
          
          <div>
            <div className={`flex justify-between items-center mb-1 ${isRTL ? 'rtl-reverse-flex' : ''}`}>
              <span className={`text-sm flex items-center font-tajawal ${isRTL ? 'rtl-reverse-flex' : ''}`}>
                <Wifi className={`h-4 w-4 text-blue-500 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                {t('networkQuality.packetLoss', 'فقد الحزم')}
              </span>
              <span className="text-sm font-medium">{packetLoss}%</span>
            </div>
            <Progress value={Math.max(100 - (packetLoss * 20), 0)} className={packetLoss <= 1 ? "bg-green-100" : packetLoss <= 2 ? "bg-blue-100" : "bg-red-100"} />
            <p className="text-xs text-muted-foreground mt-1 font-tajawal">
              {packetLoss <= 1 ? 
                t('networkQuality.packetLossDesc.excellent', 'ممتاز: فقد حزم أقل من الحد الأدنى') : 
                packetLoss <= 2 ? 
                t('networkQuality.packetLossDesc.fair', 'مقبول: قد تلاحظ بعض التقطع أحيانًا') : 
                t('networkQuality.packetLossDesc.poor', 'ضعيف: قد تواجه مشاكل في الاتصال')}
            </p>
          </div>
          
          <div>
            <div className={`flex justify-between items-center mb-1 ${isRTL ? 'rtl-reverse-flex' : ''}`}>
              <span className={`text-sm flex items-center font-tajawal ${isRTL ? 'rtl-reverse-flex' : ''}`}>
                <Activity className={`h-4 w-4 text-purple-500 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                {t('networkQuality.jitter', 'تذبذب الشبكة')}
              </span>
              <span className="text-sm font-medium">{jitter} ms</span>
            </div>
            <Progress value={Math.max(100 - (jitter * 20), 0)} className={jitter <= 2 ? "bg-green-100" : jitter <= 5 ? "bg-blue-100" : "bg-red-100"} />
            <p className="text-xs text-muted-foreground mt-1 font-tajawal">
              {jitter <= 2 ? 
                t('networkQuality.jitterDesc.excellent', 'ممتاز: شبكة مستقرة للغاية') : 
                jitter <= 5 ? 
                t('networkQuality.jitterDesc.good', 'جيد: مستوى تذبذب منخفض') : 
                t('networkQuality.jitterDesc.poor', 'ضعيف: شبكة غير مستقرة')}
            </p>
          </div>
        </div>
        
        <div className="mt-6 p-3 bg-blue-50 rounded-md">
          <p className="text-sm font-medium font-tajawal">{t('networkQuality.summary', 'ملخص التشخيص')}:</p>
          <p className="text-xs text-muted-foreground mt-1 font-tajawal">
            {qualityScore >= 85 ? 
              t('networkQuality.summaryDesc.excellent', 'الشبكة في حالة ممتازة. نوصي بالحفاظ على الإعدادات الحالية.') : 
              qualityScore >= 70 ? 
              t('networkQuality.summaryDesc.good', 'الشبكة في حالة جيدة. يمكن تحسين بعض الإعدادات لتحقيق أداء أفضل.') :
              t('networkQuality.summaryDesc.needsImprovement', 'الشبكة تعاني من بعض المشاكل. نوصي بتشغيل أداة تحسين الشبكة.')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
