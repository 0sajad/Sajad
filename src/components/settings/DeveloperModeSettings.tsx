
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TranslationManager } from '../dev/TranslationManager';
import { PerformancePanel } from '../dev/PerformancePanel';
import { useAppState } from '@/hooks/state/use-app-state';
import { useTranslation } from 'react-i18next';
import { BrainCircuit, Bug, Languages, Activity, Settings, Database, FileJson } from 'lucide-react';

export function DeveloperModeSettings() {
  const { t } = useTranslation();
  const { preferences, setPreference } = useAppState();
  
  if (!preferences.developerMode) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bug className="h-5 w-5 mr-2 text-amber-500" />
            {t('settings.developerMode', 'وضع المطور')}
          </CardTitle>
          <CardDescription>
            {t('settings.developerModeDescription', 'أدوات ووظائف إضافية للمطورين')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Label htmlFor="developer-mode-toggle">
              {t('settings.enableDeveloperMode', 'تفعيل وضع المطور')}
            </Label>
            <Switch
              id="developer-mode-toggle"
              checked={preferences.developerMode}
              onCheckedChange={() => setPreference('developerMode', true)}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {t('settings.developerModeInfo', 'تفعيل وضع المطور يتيح لك الوصول إلى أدوات متقدمة وخيارات إضافية للتطوير والتشخيص.')}
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <Bug className="h-5 w-5 mr-2 text-amber-500" />
            {t('settings.developerMode', 'وضع المطور')}
          </CardTitle>
          <Switch
            id="developer-mode-toggle"
            checked={preferences.developerMode}
            onCheckedChange={() => setPreference('developerMode', false)}
          />
        </div>
        <CardDescription>
          {t('settings.developerTools', 'أدوات ووظائف تطوير متقدمة')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="translations" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="translations">
              <Languages className="h-3.5 w-3.5 mr-1.5" />
              {t('dev.translations', 'الترجمات')}
            </TabsTrigger>
            <TabsTrigger value="performance">
              <Activity className="h-3.5 w-3.5 mr-1.5" />
              {t('dev.performance', 'الأداء')}
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-3.5 w-3.5 mr-1.5" />
              {t('dev.devSettings', 'إعدادات المطور')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="translations">
            <TranslationManager />
          </TabsContent>
          
          <TabsContent value="performance">
            <PerformancePanel />
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-between p-3 bg-background rounded-md border">
                <div className="flex items-center">
                  <FileJson className="h-5 w-5 mr-2 text-blue-500" />
                  <div>
                    <p className="font-medium">
                      {t('dev.debuggingTools', 'أدوات التصحيح')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t('dev.debuggingToolsDesc', 'تفعيل سجلات التصحيح المفصلة ومعلومات الأداء')}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={preferences.telemetry}
                  onCheckedChange={(checked) => setPreference('telemetry', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-background rounded-md border">
                <div className="flex items-center">
                  <Database className="h-5 w-5 mr-2 text-green-500" />
                  <div>
                    <p className="font-medium">
                      {t('dev.mockData', 'بيانات وهمية')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t('dev.mockDataDesc', 'استخدام بيانات اختبار بدلاً من البيانات الحقيقية')}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={false}
                  onCheckedChange={() => {}}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-background rounded-md border">
                <div className="flex items-center">
                  <BrainCircuit className="h-5 w-5 mr-2 text-purple-500" />
                  <div>
                    <p className="font-medium">
                      {t('dev.experimentalFeatures', 'ميزات تجريبية')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t('dev.experimentalFeaturesDesc', 'تفعيل الميزات قيد التطوير')}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={true}
                  onCheckedChange={() => {}}
                />
              </div>
            </div>
            
            <div className="flex justify-between mt-4">
              <Button variant="outline">
                {t('dev.exportDevState', 'تصدير حالة التطوير')}
              </Button>
              <Button variant="destructive">
                {t('dev.clearData', 'مسح جميع البيانات')}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
