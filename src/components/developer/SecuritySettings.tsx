
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
              className="flex justify-between"
              onValueChange={setFirewallLevel}
            >
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="low" id="low" />
                <Label htmlFor="low" className="font-tajawal cursor-pointer">
                  {t('developer.security.firewall.low', 'منخفض')}
                </Label>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium" className="font-tajawal cursor-pointer">
                  {t('developer.security.firewall.medium', 'متوسط')}
                </Label>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="high" id="high" />
                <Label htmlFor="high" className="font-tajawal cursor-pointer">
                  {t('developer.security.firewall.high', 'مرتفع')}
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-tajawal">
                {t('developer.security.firewall.stealth', 'وضع التخفي')}
              </Label>
              <p className="text-sm text-muted-foreground font-tajawal">
                {t('developer.security.firewall.stealthDesc', 'إخفاء الجهاز على الشبكة')}
              </p>
            </div>
            <Switch
              checked={features.invisibleMode || false}
              onCheckedChange={(checked) => updateFeature('invisibleMode', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-tajawal">
                {t('developer.security.firewall.darkWeb', 'حماية الشبكة المظلمة')}
              </Label>
              <p className="text-sm text-muted-foreground font-tajawal">
                {t('developer.security.firewall.darkWebDesc', 'منع الاتصالات المشبوهة')}
              </p>
            </div>
            <Switch
              checked={features.darkWebProtection || false}
              onCheckedChange={(checked) => updateFeature('darkWebProtection', checked)}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg font-tajawal">
            {t('developer.security.scans.title', 'فحص الشبكة والتنبيهات')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label className="font-tajawal">
              {t('developer.security.scans.schedule', 'جدول الفحص الأمني')}
            </Label>
            <RadioGroup
              value={securityScan}
              className="space-y-1"
              onValueChange={setSecurityScan}
            >
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="realtime" id="realtime" />
                <Label htmlFor="realtime" className="font-tajawal cursor-pointer">
                  {t('developer.security.scans.realtime', 'في الوقت الحقيقي')}
                </Label>
                <Badge variant="outline" className="text-octaBlue-600 text-xs ml-2">
                  {t('developer.security.scans.intensive', 'مكثف')}
                </Badge>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="hourly" id="hourly" />
                <Label htmlFor="hourly" className="font-tajawal cursor-pointer">
                  {t('developer.security.scans.hourly', 'كل ساعة')}
                </Label>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="daily" id="daily" />
                <Label htmlFor="daily" className="font-tajawal cursor-pointer">
                  {t('developer.security.scans.daily', 'يوميًا')}
                </Label>
                <Badge variant="outline" className="text-green-600 text-xs ml-2">
                  {t('developer.security.scans.recommended', 'موصى به')}
                </Badge>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="weekly" id="weekly" />
                <Label htmlFor="weekly" className="font-tajawal cursor-pointer">
                  {t('developer.security.scans.weekly', 'أسبوعيًا')}
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-tajawal">
                {t('developer.security.scans.notifications', 'تنبيهات الأمان')}
              </Label>
              <p className="text-sm text-muted-foreground font-tajawal">
                {t('developer.security.scans.notificationsDesc', 'إرسال تنبيهات لتهديدات الأمان')}
              </p>
            </div>
            <Switch
              checked={securityNotifications}
              onCheckedChange={setSecurityNotifications}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-tajawal">
                {t('developer.security.scans.updates', 'تحديثات تلقائية')}
              </Label>
              <p className="text-sm text-muted-foreground font-tajawal">
                {t('developer.security.scans.updatesDesc', 'تثبيت تحديثات الأمان تلقائيًا')}
              </p>
            </div>
            <Switch
              checked={autoUpdates}
              onCheckedChange={setAutoUpdates}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-tajawal">
                {t('developer.security.scans.isolation', 'عزل الأجهزة المشبوهة')}
              </Label>
              <p className="text-sm text-muted-foreground font-tajawal">
                {t('developer.security.scans.isolationDesc', 'عزل الأجهزة المشبوهة تلقائيًا')}
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
