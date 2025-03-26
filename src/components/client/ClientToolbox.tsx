
import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Wifi, Database, Search, Shield, 
  BarChart2, Zap, Download, RefreshCw, 
  Thermometer, Server, Cpu, Save as SaveIcon
} from "lucide-react";

export const ClientToolbox = () => {
  const { t } = useTranslation();
  
  const commonToolClasses = 
    "flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-primary/5 transition-colors cursor-pointer";
  
  return (
    <Card className="border-octaBlue-200">
      <CardHeader className="bg-gradient-to-r from-octaBlue-50 to-octaBlue-100 rounded-t-lg">
        <CardTitle className="text-lg flex items-center">
          <Cpu className="mr-2 h-5 w-5 text-octaBlue-600" />
          {t('dashboard.clientTools', 'أدوات العميل')}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {t('dashboard.clientToolsDesc', 'مجموعة متنوعة من الأدوات لمساعدتك في إدارة وتحسين شبكتك ونظامك')}
          </p>
        </div>
        
        <Tabs defaultValue="network" className="space-y-4">
          <TabsList className="grid grid-cols-3 gap-2">
            <TabsTrigger value="network">
              <Wifi className="mr-1 h-4 w-4" />
              {t('network', 'الشبكة')}
            </TabsTrigger>
            <TabsTrigger value="system">
              <Cpu className="mr-1 h-4 w-4" />
              {t('system', 'النظام')}
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="mr-1 h-4 w-4" />
              {t('security', 'الأمان')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="network" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className={commonToolClasses}>
                <Wifi className="h-6 w-6 mb-2 text-blue-500" />
                <span className="text-sm font-medium">{t('dashboard.actions.scan', 'فحص الشبكة')}</span>
              </div>
              <div className={commonToolClasses}>
                <BarChart2 className="h-6 w-6 mb-2 text-purple-500" />
                <span className="text-sm font-medium">{t('dashboard.actions.optimize', 'تحسين الأداء')}</span>
              </div>
              <div className={commonToolClasses}>
                <Database className="h-6 w-6 mb-2 text-amber-500" />
                <span className="text-sm font-medium">{t('dashboard.actions.backup', 'نسخ احتياطي')}</span>
              </div>
              <div className={commonToolClasses}>
                <Thermometer className="h-6 w-6 mb-2 text-red-500" />
                <span className="text-sm font-medium">{t('temperature', 'قياس الحرارة')}</span>
              </div>
              <div className={commonToolClasses}>
                <Server className="h-6 w-6 mb-2 text-red-500" />
                <span className="text-sm font-medium">{t('serverStatus', 'حالة الخادم')}</span>
              </div>
              <div className={commonToolClasses}>
                <Search className="h-6 w-6 mb-2 text-green-500" />
                <span className="text-sm font-medium">{t('find', 'بحث عن مشاكل')}</span>
              </div>
              <div className={commonToolClasses}>
                <SaveIcon className="h-6 w-6 mb-2 text-blue-500" />
                <span className="text-sm font-medium">{t('saveSettings', 'حفظ الإعدادات')}</span>
              </div>
              <div className={commonToolClasses}>
                <RefreshCw className="h-6 w-6 mb-2 text-octaBlue-600" />
                <span className="text-sm font-medium">{t('reset', 'إعادة تعيين')}</span>
              </div>
            </div>
            
            <div className="pt-2">
              <Select defaultValue="scan">
                <SelectTrigger>
                  <SelectValue placeholder={t('dashboard.selectAction', 'اختر إجراء')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scan">{t('dashboard.actions.scan', 'فحص الشبكة')}</SelectItem>
                  <SelectItem value="optimize">{t('dashboard.actions.optimize', 'تحسين الأداء')}</SelectItem>
                  <SelectItem value="backup">{t('dashboard.actions.backup', 'نسخ احتياطي للإعدادات')}</SelectItem>
                  <SelectItem value="security">{t('dashboard.actions.security', 'فحص الأمان')}</SelectItem>
                  <SelectItem value="update">{t('dashboard.actions.update', 'تحديث النظام')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-end">
              <Button className="bg-octaBlue-600 hover:bg-octaBlue-700">
                {t('run', 'تشغيل')}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="system" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className={commonToolClasses}>
                <Cpu className="h-6 w-6 mb-2 text-blue-500" />
                <span className="text-sm font-medium">{t('cpuAnalysis', 'تحليل المعالج')}</span>
              </div>
              <div className={commonToolClasses}>
                <Thermometer className="h-6 w-6 mb-2 text-red-500" />
                <span className="text-sm font-medium">{t('tempMonitor', 'مراقبة الحرارة')}</span>
              </div>
              <div className={commonToolClasses}>
                <Zap className="h-6 w-6 mb-2 text-amber-500" />
                <span className="text-sm font-medium">{t('powerOptimization', 'تحسين الطاقة')}</span>
              </div>
              <div className={commonToolClasses}>
                <Database className="h-6 w-6 mb-2 text-green-500" />
                <span className="text-sm font-medium">{t('storageCleanup', 'تنظيف التخزين')}</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className={commonToolClasses}>
                <Shield className="h-6 w-6 mb-2 text-blue-500" />
                <span className="text-sm font-medium">{t('securityScan', 'فحص أمني')}</span>
              </div>
              <div className={commonToolClasses}>
                <Wifi className="h-6 w-6 mb-2 text-red-500" />
                <span className="text-sm font-medium">{t('wifiSecurity', 'أمان الواي فاي')}</span>
              </div>
              <div className={commonToolClasses}>
                <Database className="h-6 w-6 mb-2 text-purple-500" />
                <span className="text-sm font-medium">{t('dataEncryption', 'تشفير البيانات')}</span>
              </div>
              <div className={commonToolClasses}>
                <RefreshCw className="h-6 w-6 mb-2 text-green-500" />
                <span className="text-sm font-medium">{t('updateSecurity', 'تحديث الأمان')}</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
