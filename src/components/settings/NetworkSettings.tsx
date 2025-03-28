
import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Wifi, Cog, WifiOff, RotateCw, Monitor } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export function NetworkSettings() {
  const { t } = useTranslation(['settingsPage']);
  const [autoScan, setAutoScan] = React.useState(true);
  const [autoConnect, setAutoConnect] = React.useState(true);
  const [scanInterval, setScanInterval] = React.useState(30);
  const [preferredNetwork, setPreferredNetwork] = React.useState("auto");
  const [wifiEnabled, setWifiEnabled] = React.useState(true);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wifi className="h-5 w-5" />
          {t('sections.network', 'Network Settings')}
        </CardTitle>
        <CardDescription>{t('networkSettingsDescription', 'Configure network connection settings')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="wifiEnabled" className="flex items-center gap-2">
              {wifiEnabled ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
              {t('network.wifi', 'WiFi')}
            </Label>
            <p className="text-sm text-muted-foreground">{t('network.wifiDesc', 'Enable or disable WiFi')}</p>
          </div>
          <Switch 
            id="wifiEnabled" 
            checked={wifiEnabled} 
            onCheckedChange={setWifiEnabled} 
          />
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="autoScan" className="flex items-center gap-2">
                <RotateCw className="h-4 w-4" />
                {t('network.autoScan', 'Auto Scan')}
              </Label>
              <p className="text-sm text-muted-foreground">{t('network.autoScanDesc', 'Automatically scan for new networks')}</p>
            </div>
            <Switch 
              id="autoScan" 
              checked={autoScan} 
              onCheckedChange={setAutoScan} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="autoConnect" className="flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                {t('network.autoConnect', 'Auto Connect')}
              </Label>
              <p className="text-sm text-muted-foreground">{t('network.autoConnectDesc', 'Automatically connect to known networks')}</p>
            </div>
            <Switch 
              id="autoConnect" 
              checked={autoConnect} 
              onCheckedChange={setAutoConnect} 
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>{t('network.scanInterval', 'Scan Interval')}</Label>
            <span className="text-sm text-muted-foreground">{scanInterval} {t('network.seconds', 'seconds')}</span>
          </div>
          <Slider
            value={[scanInterval]}
            min={5}
            max={60}
            step={5}
            onValueChange={(vals) => setScanInterval(vals[0])}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="preferredNetwork">{t('network.preferredNetwork', 'Preferred Network')}</Label>
          <Select 
            value={preferredNetwork} 
            onValueChange={setPreferredNetwork}
          >
            <SelectTrigger id="preferredNetwork">
              <SelectValue placeholder={t('network.selectNetwork', 'Select Network')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">{t('network.auto', 'Auto Select')}</SelectItem>
              <SelectItem value="5ghz">{t('network.5ghz', '5GHz')}</SelectItem>
              <SelectItem value="2.4ghz">{t('network.2.4ghz', '2.4GHz')}</SelectItem>
              <SelectItem value="ethernet">{t('network.ethernet', 'Ethernet')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" className="flex items-center gap-2">
            <Cog className="h-4 w-4" />
            {t('network.advancedSettings', 'Advanced Settings')}
          </Button>
          <Button className="flex items-center gap-2">
            <RotateCw className="h-4 w-4" />
            {t('network.scanNow', 'Scan Now')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
