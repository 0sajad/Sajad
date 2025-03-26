
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export function NetworkControls() {
  const { t } = useTranslation();
  
  // إعدادات الشبكة
  const [dnsProvider, setDnsProvider] = useState("cloudflare");
  const [maxConnections, setMaxConnections] = useState(20);
  const [proxyEnabled, setProxyEnabled] = useState(false);
  const [proxyAddress, setProxyAddress] = useState("");
  const [proxyPort, setProxyPort] = useState("");
  const [trafficOptimization, setTrafficOptimization] = useState(true);
  const [bandwidthLimit, setBandwidthLimit] = useState(false);
  const [maxBandwidth, setMaxBandwidth] = useState(10);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg font-tajawal">
            {t('developer.network.dns.title', 'إعدادات DNS')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label className="font-tajawal">
              {t('developer.network.dns.provider', 'مزود DNS')}
            </Label>
            <Select
              value={dnsProvider}
              onValueChange={setDnsProvider}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('developer.network.dns.select', 'اختر مزود DNS')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cloudflare">Cloudflare (1.1.1.1)</SelectItem>
                <SelectItem value="google">Google (8.8.8.8)</SelectItem>
                <SelectItem value="opendns">OpenDNS</SelectItem>
                <SelectItem value="quad9">Quad9</SelectItem>
                <SelectItem value="custom">{t('developer.network.dns.custom', 'مخصص')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {dnsProvider === "custom" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-tajawal">
                  {t('developer.network.dns.primary', 'خادم DNS الرئيسي')}
                </Label>
                <Input placeholder="1.1.1.1" />
              </div>
              <div className="space-y-2">
                <Label className="font-tajawal">
                  {t('developer.network.dns.secondary', 'خادم DNS الاحتياطي')}
                </Label>
                <Input placeholder="1.0.0.1" />
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-tajawal">
                {t('developer.network.dns.optimization', 'تحسين أداء DNS')}
              </Label>
              <p className="text-sm text-muted-foreground font-tajawal">
                {t('developer.network.dns.optimizationDesc', 'اختيار أسرع خادم DNS تلقائيًا')}
              </p>
            </div>
            <Switch
              checked={true}
              disabled={dnsProvider === "custom"}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg font-tajawal">
            {t('developer.network.connection.title', 'إعدادات الاتصال')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="font-tajawal">
                {t('developer.network.connection.max', 'الحد الأقصى للاتصالات')}
              </Label>
              <Badge variant="outline">
                {maxConnections}
              </Badge>
            </div>
            <Input
              type="range"
              className="w-full cursor-pointer"
              min={5}
              max={50}
              step={5}
              value={maxConnections}
              onChange={(e) => setMaxConnections(Number(e.target.value))}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-tajawal">
                {t('developer.network.connection.proxy', 'استخدام بروكسي')}
              </Label>
              <p className="text-sm text-muted-foreground font-tajawal">
                {t('developer.network.connection.proxyDesc', 'توجيه حركة المرور عبر خادم وسيط')}
              </p>
            </div>
            <Switch
              checked={proxyEnabled}
              onCheckedChange={setProxyEnabled}
            />
          </div>
          
          {proxyEnabled && (
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <Label className="font-tajawal">
                  {t('developer.network.connection.proxyAddress', 'عنوان البروكسي')}
                </Label>
                <Input
                  placeholder="127.0.0.1"
                  value={proxyAddress}
                  onChange={(e) => setProxyAddress(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="font-tajawal">
                  {t('developer.network.connection.proxyPort', 'منفذ البروكسي')}
                </Label>
                <Input
                  placeholder="8080"
                  value={proxyPort}
                  onChange={(e) => setProxyPort(e.target.value)}
                />
              </div>
            </div>
          )}
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-tajawal">
                {t('developer.network.connection.optimization', 'تحسين حركة المرور')}
              </Label>
              <p className="text-sm text-muted-foreground font-tajawal">
                {t('developer.network.connection.optimizationDesc', 'إعطاء الأولوية لتطبيقات معينة')}
              </p>
            </div>
            <Switch
              checked={trafficOptimization}
              onCheckedChange={setTrafficOptimization}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-tajawal">
                {t('developer.network.connection.bandwidth', 'تحديد عرض النطاق')}
              </Label>
              <p className="text-sm text-muted-foreground font-tajawal">
                {t('developer.network.connection.bandwidthDesc', 'تحديد الحد الأقصى لاستخدام النطاق')}
              </p>
            </div>
            <Switch
              checked={bandwidthLimit}
              onCheckedChange={setBandwidthLimit}
            />
          </div>
          
          {bandwidthLimit && (
            <div className="space-y-2 pt-2">
              <div className="flex justify-between">
                <Label className="font-tajawal">
                  {t('developer.network.connection.bandwidthLimit', 'الحد الأقصى للنطاق')}
                </Label>
                <Badge variant="outline">
                  {maxBandwidth} Mbps
                </Badge>
              </div>
              <Input
                type="range"
                className="w-full cursor-pointer"
                min={1}
                max={100}
                step={1}
                value={maxBandwidth}
                onChange={(e) => setMaxBandwidth(Number(e.target.value))}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
