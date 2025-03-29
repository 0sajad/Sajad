
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { useMode } from "@/context/ModeContext";

export function SecuritySettings() {
  const { t } = useTranslation();
  const { features, updateFeature } = useMode();
  
  // إعدادات الأمان
  const [firewallLevel, setFirewallLevel] = useState("medium");
  const [autoUpdates, setAutoUpdates] = useState(true);
  const [securityScan, setSecurityScan] = useState("daily");
  const [securityNotifications, setSecurityNotifications] = useState(true);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg font-tajawal">
            {t('developer.security.firewall.title', 'إعدادات جدار الحماية')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label className="font-tajawal">
              {t('developer.security.firewall.level', 'مستوى الحماية')}
            </Label>
            <RadioGroup
              value={firewallLevel}
              onValueChange={setFirewallLevel}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="low" id="fw-low" />
                <Label htmlFor="fw-low" className="font-tajawal">
                  {t('developer.security.firewall.low', 'منخفض')}
                </Label>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="medium" id="fw-medium" />
                <Label htmlFor="fw-medium" className="font-tajawal">
                  {t('developer.security.firewall.medium', 'متوسط')}
                </Label>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="high" id="fw-high" />
                <Label htmlFor="fw-high" className="font-tajawal">
                  {t('developer.security.firewall.high', 'عالي')}
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-tajawal">
                {t('developer.security.firewall.allow', 'السماح بالاتصالات المجهولة')}
              </Label>
              <p className="text-sm text-muted-foreground font-tajawal">
                {t('developer.security.firewall.allowDesc', 'السماح بالاتصالات من مصادر غير معروفة')}
              </p>
            </div>
            <Switch
              checked={false}
              disabled={firewallLevel === "high"}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg font-tajawal">
            {t('developer.security.updates.title', 'التحديثات والفحص')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-tajawal">
                {t('developer.security.updates.auto', 'التحديثات التلقائية')}
              </Label>
              <p className="text-sm text-muted-foreground font-tajawal">
                {t('developer.security.updates.autoDesc', 'تحديث التطبيق تلقائيًا عند توفر تحديثات')}
              </p>
            </div>
            <Switch
              checked={autoUpdates}
              onCheckedChange={setAutoUpdates}
            />
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <Label className="font-tajawal">
              {t('developer.security.updates.scan', 'جدولة فحص الأمان')}
            </Label>
            <RadioGroup
              value={securityScan}
              onValueChange={setSecurityScan}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="daily" id="scan-daily" />
                <Label htmlFor="scan-daily" className="font-tajawal">
                  {t('developer.security.updates.scanDaily', 'يوميًا')}
                </Label>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="weekly" id="scan-weekly" />
                <Label htmlFor="scan-weekly" className="font-tajawal">
                  {t('developer.security.updates.scanWeekly', 'أسبوعيًا')}
                </Label>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="monthly" id="scan-monthly" />
                <Label htmlFor="scan-monthly" className="font-tajawal">
                  {t('developer.security.updates.scanMonthly', 'شهريًا')}
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-tajawal">
                {t('developer.security.updates.notifications', 'إشعارات الأمان')}
              </Label>
              <p className="text-sm text-muted-foreground font-tajawal">
                {t('developer.security.updates.notificationsDesc', 'تلقي إشعارات عند اكتشاف مشاكل أمنية')}
              </p>
            </div>
            <Switch
              checked={securityNotifications}
              onCheckedChange={setSecurityNotifications}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg font-tajawal">
            {t('developer.security.advanced.title', 'إعدادات أمان متقدمة')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-tajawal">
                {t('developer.security.advanced.darkWeb', 'حماية الويب المظلم')}
              </Label>
              <p className="text-sm text-muted-foreground font-tajawal">
                {t('developer.security.advanced.darkWebDesc', 'مراقبة ومنع الاتصالات المشبوهة')}
              </p>
            </div>
            <div className="flex items-center">
              <Badge className="mr-2 bg-amber-100 text-amber-800 border-amber-300">
                {t('developer.security.advanced.premium', 'متقدم')}
              </Badge>
              <Switch
                checked={features.darkWebProtection || false}
                onCheckedChange={(checked) => updateFeature('darkWebProtection', checked)}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-tajawal">
                {t('developer.security.advanced.isolation', 'عزل الشبكة')}
              </Label>
              <p className="text-sm text-muted-foreground font-tajawal">
                {t('developer.security.advanced.isolationDesc', 'عزل الأجهزة المشبوهة تلقائيًا')}
              </p>
            </div>
            <Switch
              checked={features.networkIsolation || false}
              onCheckedChange={(checked) => updateFeature('networkIsolation', checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
