
import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { NetworkManagement } from "../network/NetworkManagement";
import { Wifi, Network, Zap, Activity, GitBranch, Router } from "lucide-react";

export function NetworkSettings() {
  const { t } = useTranslation(['settingsPage']);
  const [autoConnect, setAutoConnect] = React.useState(true);
  const [preferredNetwork, setPreferredNetwork] = React.useState("home");
  const [bandwidthLimit, setBandwidthLimit] = React.useState(70);
  const [proxyEnabled, setProxyEnabled] = React.useState(false);
  const [proxyAddress, setProxyAddress] = React.useState("");
  const [proxyPort, setProxyPort] = React.useState("");
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5" />
            {t('sections.network')}
          </CardTitle>
          <CardDescription>{t('networkSettingsDescription', 'Configure network connection settings')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="autoConnect" className="flex items-center gap-2">
                    <Wifi className="h-4 w-4" />
                    {t('network.autoConnect', 'Auto-connect')}
                  </Label>
                  <Switch 
                    id="autoConnect" 
                    checked={autoConnect} 
                    onCheckedChange={setAutoConnect} 
                  />
                </div>
                <p className="text-sm text-muted-foreground">{t('network.autoConnectDesc', 'Automatically connect to known networks')}</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="preferredNetwork" className="flex items-center gap-2">
                  <Router className="h-4 w-4" />
                  {t('network.preferredNetwork', 'Preferred Network')}
                </Label>
                <Select 
                  value={preferredNetwork} 
                  onValueChange={setPreferredNetwork}
                >
                  <SelectTrigger id="preferredNetwork">
                    <SelectValue placeholder={t('network.selectNetwork', 'Select Network')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">{t('network.home', 'Home Network')}</SelectItem>
                    <SelectItem value="work">{t('network.work', 'Work Network')}</SelectItem>
                    <SelectItem value="mobile">{t('network.mobile', 'Mobile Hotspot')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                {t('network.bandwidth', 'Bandwidth Limit')} ({bandwidthLimit}%)
              </Label>
              <Slider 
                value={[bandwidthLimit]} 
                onValueChange={(vals) => setBandwidthLimit(vals[0])} 
                max={100} 
                step={5}
              />
              <div className="grid grid-cols-3 text-xs text-muted-foreground">
                <div className="text-left">{t('network.low', 'Low')}</div>
                <div className="text-center">{t('network.medium', 'Medium')}</div>
                <div className="text-right">{t('network.high', 'High')}</div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="proxyEnabled" className="flex items-center gap-2">
                  <GitBranch className="h-4 w-4" />
                  {t('network.proxy', 'Network Proxy')}
                </Label>
                <p className="text-sm text-muted-foreground">{t('network.proxyDesc', 'Use a proxy server for your connection')}</p>
              </div>
              <Switch 
                id="proxyEnabled" 
                checked={proxyEnabled} 
                onCheckedChange={setProxyEnabled} 
              />
            </div>
            
            {proxyEnabled && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6 border-l-2 border-l-muted">
                <div className="space-y-2">
                  <Label htmlFor="proxyAddress">{t('network.proxyAddress', 'Proxy Address')}</Label>
                  <Input 
                    id="proxyAddress" 
                    value={proxyAddress} 
                    onChange={(e) => setProxyAddress(e.target.value)} 
                    placeholder="proxy.example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="proxyPort">{t('network.proxyPort', 'Proxy Port')}</Label>
                  <Input 
                    id="proxyPort" 
                    value={proxyPort} 
                    onChange={(e) => setProxyPort(e.target.value)} 
                    placeholder="8080"
                  />
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-between">
            <Button variant="outline">
              <Activity className="h-4 w-4 mr-2" />
              {t('network.testConnection', 'Test Connection')}
            </Button>
            <Button>{t('network.applySettings', 'Apply Settings')}</Button>
          </div>
        </CardContent>
      </Card>
      
      <NetworkManagement />
    </div>
  );
}
