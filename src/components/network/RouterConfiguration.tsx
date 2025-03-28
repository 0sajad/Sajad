
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, RefreshCw, Power, Shield, Settings, Wifi } from "lucide-react";
import { toast } from "sonner";
import { useMode } from "@/context/ModeContext";

export function RouterConfiguration() {
  const { t } = useTranslation();
  const { isDeveloperMode } = useMode();
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [ssid, setSsid] = useState("OCTA-Network");
  const [password, setPassword] = useState("********");
  const [channel, setChannel] = useState("6");
  const [band, setBand] = useState("5GHz");
  const [mode, setMode] = useState("802.11ac");
  const [ipAddress, setIpAddress] = useState("192.168.1.1");
  const [subnetMask, setSubnetMask] = useState("255.255.255.0");
  const [dhcpEnabled, setDhcpEnabled] = useState(true);
  const [firewallEnabled, setFirewallEnabled] = useState(true);
  
  const handleSave = () => {
    toast.success("Router configuration saved");
  };
  
  const handleReset = () => {
    toast.info("Router configuration reset to default");
  };
  
  const handleReboot = () => {
    toast.info("Router reboot initiated");
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-medium">Router Configuration</CardTitle>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button variant="destructive" size="sm" onClick={handleReboot}>
            <Power className="h-4 w-4 mr-2" />
            Reboot
          </Button>
          <Button variant="default" size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="wifi" className="space-y-4">
          <TabsList>
            <TabsTrigger value="wifi">
              <Wifi className="h-4 w-4 mr-2" />
              WiFi
            </TabsTrigger>
            <TabsTrigger value="network">
              <Settings className="h-4 w-4 mr-2" />
              Network
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="wifi" className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="wifi-enabled">WiFi Enabled</Label>
                <Switch 
                  id="wifi-enabled" 
                  checked={wifiEnabled} 
                  onCheckedChange={setWifiEnabled} 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="ssid">Network Name (SSID)</Label>
                <Input 
                  id="ssid" 
                  value={ssid} 
                  onChange={(e) => setSsid(e.target.value)} 
                  disabled={!wifiEnabled}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  disabled={!wifiEnabled}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="band">Frequency Band</Label>
                <Select 
                  value={band} 
                  onValueChange={setBand}
                  disabled={!wifiEnabled}
                >
                  <SelectTrigger id="band">
                    <SelectValue placeholder="Select band" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2.4GHz">2.4 GHz</SelectItem>
                    <SelectItem value="5GHz">5 GHz</SelectItem>
                    <SelectItem value="dual">Dual Band</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="channel">Channel</Label>
                <Select 
                  value={channel} 
                  onValueChange={setChannel}
                  disabled={!wifiEnabled}
                >
                  <SelectTrigger id="channel">
                    <SelectValue placeholder="Select channel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Channel 1</SelectItem>
                    <SelectItem value="6">Channel 6 (Recommended)</SelectItem>
                    <SelectItem value="11">Channel 11</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="mode">WiFi Mode</Label>
                <Select 
                  value={mode} 
                  onValueChange={setMode}
                  disabled={!wifiEnabled}
                >
                  <SelectTrigger id="mode">
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="802.11n">802.11n</SelectItem>
                    <SelectItem value="802.11ac">802.11ac</SelectItem>
                    <SelectItem value="802.11ax">802.11ax (WiFi 6)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="network" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="ipAddress">Router IP Address</Label>
                <Input 
                  id="ipAddress" 
                  value={ipAddress} 
                  onChange={(e) => setIpAddress(e.target.value)} 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="subnetMask">Subnet Mask</Label>
                <Input 
                  id="subnetMask" 
                  value={subnetMask} 
                  onChange={(e) => setSubnetMask(e.target.value)} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="dhcp-enabled">DHCP Enabled</Label>
                <Switch 
                  id="dhcp-enabled" 
                  checked={dhcpEnabled} 
                  onCheckedChange={setDhcpEnabled} 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="dhcpStart">DHCP Start Address</Label>
                <Input 
                  id="dhcpStart" 
                  value="192.168.1.100" 
                  disabled={!dhcpEnabled}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="dhcpEnd">DHCP End Address</Label>
                <Input 
                  id="dhcpEnd" 
                  value="192.168.1.254" 
                  disabled={!dhcpEnabled}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="firewall-enabled">Firewall Enabled</Label>
                <Switch 
                  id="firewall-enabled" 
                  checked={firewallEnabled} 
                  onCheckedChange={setFirewallEnabled} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="dmz-enabled">DMZ Enabled</Label>
                <Switch id="dmz-enabled" />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="vpn-enabled">VPN Server Enabled</Label>
                <Switch id="vpn-enabled" />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="parental-enabled">Parental Controls</Label>
                <Switch id="parental-enabled" />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="security-level">Security Level</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="security-level">
                    <SelectValue placeholder="Select security level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* عناصر التحكم في وضع المطور فقط */}
        {isDeveloperMode && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-sm font-medium mb-2">Developer Options</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">CLI Access</Button>
              <Button variant="outline" size="sm">API Settings</Button>
              <Button variant="outline" size="sm">Debug Mode</Button>
              <Button variant="outline" size="sm">Custom Firmware</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
