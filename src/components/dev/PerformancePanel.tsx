
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RefreshCw, Activity, AlertTriangle, CheckCircle2, BadgeInfo } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Alert, AlertDescription } from '@/components/ui/alert';

// أنواع لقياسات الأداء
type PerformanceTrend = 'increasing' | 'decreasing' | 'stable' | 'unknown';

interface ResourceUsage {
  current: number;
  trend: PerformanceTrend;
  limit?: number; // الحد الأقصى المتوقع (اختياري)
}

interface PerformanceMetrics {
  cpu: ResourceUsage;
  memory: ResourceUsage;
  fps: ResourceUsage;
  loadTime: ResourceUsage;
  domSize: ResourceUsage;
  requests: ResourceUsage;
}

// دالة مساعدة لتوليد بيانات تجريبية للأداء
const generateMockPerformanceData = (): PerformanceMetrics => {
  return {
    cpu: {
      current: Math.floor(Math.random() * 80) + 5,
      trend: Math.random() > 0.5 ? 'increasing' : 'decreasing',
      limit: 100
    },
    memory: {
      current: Math.floor(Math.random() * 500) + 100,
      trend: Math.random() > 0.5 ? 'stable' : 'increasing',
      limit: 1024
    },
    fps: {
      current: Math.floor(Math.random() * 30) + 30,
      trend: Math.random() > 0.7 ? 'decreasing' : 'stable',
      limit: 60
    },
    loadTime: {
      current: Math.floor(Math.random() * 800) + 200,
      trend: Math.random() > 0.6 ? 'decreasing' : 'increasing',
      limit: 3000
    },
    domSize: {
      current: Math.floor(Math.random() * 1000) + 500,
      trend: 'stable',
      limit: 2500
    },
    requests: {
      current: Math.floor(Math.random() * 15) + 5,
      trend: Math.random() > 0.5 ? 'stable' : 'increasing',
      limit: 50
    }
  };
};

/**
 * مكون لوحة تحكم الأداء - يعرض مقاييس أداء التطبيق في الوقت الحقيقي
 * يستخدم في وضع المطور فقط
 */
export function PerformancePanel() {
  const { t } = useTranslation();
  const [metrics, setMetrics] = useState<PerformanceMetrics>(generateMockPerformanceData());
  const [refreshing, setRefreshing] = useState(false);
  const refreshInterval = useRef<NodeJS.Timeout | null>(null);
  
  // تحديث البيانات على فترات منتظمة
  useEffect(() => {
    // تحديث أولي
    updateMetrics();
    
    // تحديث دوري كل 5 ثوانٍ
    refreshInterval.current = setInterval(updateMetrics, 5000);
    
    return () => {
      if (refreshInterval.current) {
        clearInterval(refreshInterval.current);
      }
    };
  }, []);
  
  // دالة لتحديث مقاييس الأداء
  const updateMetrics = () => {
    const newData = generateMockPerformanceData();
    setMetrics(newData);
  };
  
  // معالج لتحديث البيانات يدويًا
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      updateMetrics();
      setRefreshing(false);
    }, 500);
  };
  
  // دالة مساعدة للحصول على أيقونة الاتجاه
  const getTrendIcon = (trend: PerformanceTrend) => {
    switch (trend) {
      case 'increasing':
        return <Activity className="h-4 w-4 text-amber-500" />;
      case 'decreasing':
        return <Activity className="h-4 w-4 text-green-500" />;
      case 'stable':
        return <CheckCircle2 className="h-4 w-4 text-blue-500" />;
      default:
        return <BadgeInfo className="h-4 w-4 text-gray-500" />;
    }
  };
  
  // دالة مساعدة للحصول على نسبة التقدم
  const getProgressPercentage = (usage: ResourceUsage) => {
    if (usage.limit) {
      return (usage.current / usage.limit) * 100;
    }
    // إذا لم يكن هناك حد، استخدم قيمة افتراضية
    return (usage.current / 100) * 100;
  };
  
  // دالة مساعدة للحصول على تصنيف الاستخدام
  const getUsageCategory = (usage: ResourceUsage) => {
    if (!usage.limit) return 'normal';
    
    const percentage = (usage.current / usage.limit) * 100;
    if (percentage > 80) return 'critical';
    if (percentage > 60) return 'warning';
    return 'normal';
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">
          {t('dev.performancePanel', 'لوحة تحكم الأداء')}
        </CardTitle>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleRefresh} 
          disabled={refreshing}
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          <span className="sr-only">{t('common.refresh', 'تحديث')}</span>
        </Button>
      </CardHeader>
      
      <CardContent>
        {metrics.cpu.current > 70 && (
          <Alert variant="warning" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {t('dev.highCpuWarning', 'استخدام وحدة المعالجة المركزية مرتفع. قد يؤثر ذلك على أداء التطبيق.')}
            </AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1 text-sm">
              <span>{t('dev.cpuUsage', 'استخدام المعالج')}</span>
              <div className="flex items-center">
                <span>{metrics.cpu.current}%</span>
                <span className="ml-1">{getTrendIcon(metrics.cpu.trend)}</span>
              </div>
            </div>
            <Progress 
              value={getProgressPercentage(metrics.cpu)}
              className={`
                h-2 
                ${getUsageCategory(metrics.cpu) === 'critical' ? 'bg-red-100' : ''}
                ${getUsageCategory(metrics.cpu) === 'warning' ? 'bg-amber-100' : ''}
              `}
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1 text-sm">
              <span>{t('dev.memoryUsage', 'استخدام الذاكرة')}</span>
              <div className="flex items-center">
                <span>{metrics.memory.current} MB</span>
                <span className="ml-1">{getTrendIcon(metrics.memory.trend)}</span>
              </div>
            </div>
            <Progress 
              value={getProgressPercentage(metrics.memory)}
              className={`
                h-2 
                ${getUsageCategory(metrics.memory) === 'critical' ? 'bg-red-100' : ''}
                ${getUsageCategory(metrics.memory) === 'warning' ? 'bg-amber-100' : ''}
              `}
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1 text-sm">
              <span>{t('dev.fps', 'معدل الإطارات')}</span>
              <div className="flex items-center">
                <span>{metrics.fps.current} FPS</span>
                <span className="ml-1">{getTrendIcon(metrics.fps.trend)}</span>
              </div>
            </div>
            <Progress 
              value={getProgressPercentage(metrics.fps)}
              className={`
                h-2 
                ${getUsageCategory(metrics.fps) === 'critical' ? 'bg-red-100' : ''}
                ${getUsageCategory(metrics.fps) === 'warning' ? 'bg-amber-100' : ''}
              `}
            />
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-sm font-medium mb-2">{t('dev.detailedMetrics', 'مقاييس مفصلة')}</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">{t('dev.metric', 'المقياس')}</TableHead>
                <TableHead>{t('dev.value', 'القيمة')}</TableHead>
                <TableHead className="text-right">{t('dev.trend', 'الاتجاه')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{t('dev.pageLoadTime', 'وقت تحميل الصفحة')}</TableCell>
                <TableCell>{metrics.loadTime.current} ms</TableCell>
                <TableCell className="text-right">{getTrendIcon(metrics.loadTime.trend)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{t('dev.domElements', 'عناصر DOM')}</TableCell>
                <TableCell>{metrics.domSize.current}</TableCell>
                <TableCell className="text-right">{getTrendIcon(metrics.domSize.trend)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{t('dev.apiRequests', 'طلبات API')}</TableCell>
                <TableCell>{metrics.requests.current}</TableCell>
                <TableCell className="text-right">{getTrendIcon(metrics.requests.trend)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
