
import React from "react";
import { GlassCard } from "../ui/glass-card";
import { Progress } from "../ui/progress";
import { useTranslation } from "react-i18next";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";

interface NetworkPerformanceCardProps {
  download: number;
  upload: number;
  ping: number;
}

export const NetworkPerformanceCard: React.FC<NetworkPerformanceCardProps> = ({ download, upload, ping }) => {
  const { t } = useTranslation();
  const { isLowPerformanceDevice } = usePerformanceOptimization();
  
  // حساب قيم النسب المئوية للتقدم
  const downloadPercentage = Math.min(100, (download / 150) * 100);
  const uploadPercentage = Math.min(100, (upload / 50) * 100);
  
  // حساب قيمة مؤشر ping - أقل هو أفضل
  // نقوم بعكس النسبة لـ ping بحيث تكون القيمة المنخفضة هي الأفضل في شريط التقدم
  const pingPercentage = Math.max(0, 100 - (ping / 300) * 100);
  
  // تقييم أداء الشبكة
  const getPerformanceText = (value: number, type: 'download' | 'upload' | 'ping') => {
    if (type === 'ping') {
      if (value < 30) return t('networkTools.excellent', 'ممتاز');
      if (value < 80) return t('networkTools.good', 'جيد');
      if (value < 150) return t('networkTools.fair', 'متوسط');
      return t('networkTools.poor', 'ضعيف');
    } else if (type === 'download') {
      if (value > 100) return t('networkTools.excellent', 'ممتاز');
      if (value > 50) return t('networkTools.good', 'جيد');
      if (value > 20) return t('networkTools.fair', 'متوسط');
      return t('networkTools.poor', 'ضعيف');
    } else { // upload
      if (value > 30) return t('networkTools.excellent', 'ممتاز');
      if (value > 15) return t('networkTools.good', 'جيد');
      if (value > 5) return t('networkTools.fair', 'متوسط');
      return t('networkTools.poor', 'ضعيف');
    }
  };
  
  // وضع وصف لقارئات الشاشة
  const getAriaDescription = (value: number, type: 'download' | 'upload' | 'ping') => {
    const typeText = type === 'download' 
      ? t('networkTools.download', 'تنزيل') 
      : type === 'upload' 
      ? t('networkTools.upload', 'رفع') 
      : t('networkTools.ping', 'زمن الاستجابة');
    
    const performanceText = getPerformanceText(value, type);
    const valueText = type === 'ping' 
      ? `${value} ${t('networkTools.ms', 'مللي ثانية')}` 
      : `${value} ${t('networkTools.mbps', 'ميجابت/ثانية')}`;
    
    return `${typeText}: ${valueText}. ${t('networkTools.performance', 'الأداء')}: ${performanceText}`;
  };
  
  return (
    <GlassCard className="lg:col-span-2 h-[300px] animate-fade-in p-0 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-medium">{t('networkTools.title', 'أدوات الشبكة')}</h3>
        <p className="text-sm text-muted-foreground">{t('networkTools.internetSpeed', 'سرعة الإنترنت')}</p>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">{t('networkTools.download', 'تنزيل')}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm">{download.toFixed(1)} Mbps</span>
                <span className="text-xs text-green-600">
                  {getPerformanceText(download, 'download')}
                </span>
              </div>
            </div>
            <Progress 
              value={downloadPercentage} 
              aria-label={getAriaDescription(download, 'download')}
              className={isLowPerformanceDevice ? 'bg-gray-100' : 'bg-gradient-to-r from-blue-50 to-blue-100'}
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">{t('networkTools.upload', 'رفع')}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm">{upload.toFixed(1)} Mbps</span>
                <span className="text-xs text-green-600">
                  {getPerformanceText(upload, 'upload')}
                </span>
              </div>
            </div>
            <Progress 
              value={uploadPercentage} 
              aria-label={getAriaDescription(upload, 'upload')}
              className={isLowPerformanceDevice ? 'bg-gray-100' : 'bg-gradient-to-r from-purple-50 to-purple-100'}
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">{t('networkTools.ping', 'زمن الاستجابة')}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm">{ping.toFixed(0)} ms</span>
                <span className="text-xs text-green-600">
                  {getPerformanceText(ping, 'ping')}
                </span>
              </div>
            </div>
            <Progress 
              value={pingPercentage} 
              aria-label={getAriaDescription(ping, 'ping')}
              className={isLowPerformanceDevice ? 'bg-gray-100' : 'bg-gradient-to-r from-green-50 to-green-100'}
            />
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
