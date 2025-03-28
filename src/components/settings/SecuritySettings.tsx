
import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Shield, LockKeyhole, EyeOff, AlertTriangle, Key } from "lucide-react";

export function SecuritySettings() {
  const { t } = useTranslation(['settingsPage']);
  const [firewallEnabled, setFirewallEnabled] = React.useState(true);
  const [encryptData, setEncryptData] = React.useState(true);
  const [passwordProtection, setPasswordProtection] = React.useState(false);
  const [securityLevel, setSecurityLevel] = React.useState("standard");
  const [autoLockTimeout, setAutoLockTimeout] = React.useState("10");
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          {t('sections.security')}
        </CardTitle>
        <CardDescription>{t('securitySettingsDescription', 'Configure security settings to protect your network')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert variant="default" className="bg-amber-50 text-amber-900 dark:bg-amber-950 dark:text-amber-200 border-amber-200 dark:border-amber-800">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>{t('security.notice', 'Security Notice')}</AlertTitle>
          <AlertDescription>
            {t('security.noticeText', 'Keeping your security settings up to date helps protect your network from threats.')}
          </AlertDescription>
        </Alert>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="firewallEnabled" className="flex items-center gap-2">
                <LockKeyhole className="h-4 w-4" />
                {t('security.firewall', 'Network Firewall')}
              </Label>
              <p className="text-sm text-muted-foreground">{t('security.firewallDesc', 'Protection against unauthorized access')}</p>
            </div>
            <Switch 
              id="firewallEnabled" 
              checked={firewallEnabled} 
              onCheckedChange={setFirewallEnabled} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="encryptData" className="flex items-center gap-2">
                <EyeOff className="h-4 w-4" />
                {t('security.encryption', 'Data Encryption')}
              </Label>
              <p className="text-sm text-muted-foreground">{t('security.encryptionDesc', 'Encrypt data stored on this device')}</p>
            </div>
            <Switch 
              id="encryptData" 
              checked={encryptData} 
              onCheckedChange={setEncryptData} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="passwordProtection" className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                {t('security.password', 'Password Protection')}
              </Label>
              <p className="text-sm text-muted-foreground">{t('security.passwordDesc', 'Require password to change settings')}</p>
            </div>
            <Switch 
              id="passwordProtection" 
              checked={passwordProtection} 
              onCheckedChange={setPasswordProtection} 
            />
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="securityLevel">{t('security.level', 'Security Level')}</Label>
            <Select 
              value={securityLevel} 
              onValueChange={setSecurityLevel}
            >
              <SelectTrigger id="securityLevel">
                <SelectValue placeholder={t('security.selectLevel', 'Select Level')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">{t('security.basic', 'Basic')}</SelectItem>
                <SelectItem value="standard">{t('security.standard', 'Standard')}</SelectItem>
                <SelectItem value="strict">{t('security.strict', 'Strict')}</SelectItem>
                <SelectItem value="custom">{t('security.custom', 'Custom')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="autoLockTimeout">{t('security.autoLock', 'Auto-lock Timeout (minutes)')}</Label>
            <Input 
              id="autoLockTimeout" 
              type="number" 
              value={autoLockTimeout} 
              onChange={(e) => setAutoLockTimeout(e.target.value)}
              min="1"
              max="60"
            />
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline">{t('security.runScan', 'Run Security Scan')}</Button>
          <Button>{t('security.updateSecurity', 'Update Security')}</Button>
        </div>
      </CardContent>
    </Card>
  );
}
