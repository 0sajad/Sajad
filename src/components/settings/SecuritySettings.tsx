
import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Key, EyeOff, Activity, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function SecuritySettings() {
  const { t } = useTranslation(['settingsPage']);
  const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(false);
  const [dataEncryption, setDataEncryption] = React.useState(true);
  const [passwordProtection, setPasswordProtection] = React.useState(false);
  const [securityLevel, setSecurityLevel] = React.useState(65);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          {t('sections.security', 'Security & Privacy')}
        </CardTitle>
        <CardDescription>{t('securityDescription', 'Configure security and privacy settings')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="twoFactorEnabled" className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                {t('security.twoFactor', 'Two-Factor Authentication')}
              </Label>
              <p className="text-sm text-muted-foreground">{t('security.twoFactorDesc', 'Add an extra layer of security')}</p>
            </div>
            <Switch 
              id="twoFactorEnabled" 
              checked={twoFactorEnabled} 
              onCheckedChange={setTwoFactorEnabled} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="dataEncryption" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                {t('security.dataEncryption', 'Data Encryption')}
              </Label>
              <p className="text-sm text-muted-foreground">{t('security.dataEncryptionDesc', 'Encrypt all stored data')}</p>
            </div>
            <Switch 
              id="dataEncryption" 
              checked={dataEncryption} 
              onCheckedChange={setDataEncryption} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="passwordProtection" className="flex items-center gap-2">
                <EyeOff className="h-4 w-4" />
                {t('security.passwordProtection', 'Password Protection')}
              </Label>
              <p className="text-sm text-muted-foreground">{t('security.passwordProtectionDesc', 'Require password on startup')}</p>
            </div>
            <Switch 
              id="passwordProtection" 
              checked={passwordProtection} 
              onCheckedChange={setPasswordProtection} 
            />
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              {t('security.securityLevel', 'Security Level')}
            </Label>
            <span className={`text-sm font-medium ${
              securityLevel > 70 ? 'text-green-500' : 
              securityLevel > 40 ? 'text-amber-500' : 
              'text-red-500'
            }`}>
              {securityLevel > 70 ? t('security.high', 'High') : 
               securityLevel > 40 ? t('security.medium', 'Medium') : 
               t('security.low', 'Low')}
            </span>
          </div>
          
          <Progress value={securityLevel} className={`h-2 ${
            securityLevel > 70 ? 'bg-green-100' : 
            securityLevel > 40 ? 'bg-amber-100' : 
            'bg-red-100'
          }`} />
          
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            {t('security.improveSecurity', 'Enable two-factor authentication to improve security')}
          </p>
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            {t('security.securityAudit', 'Run Security Audit')}
          </Button>
          <Button className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            {t('security.updateSecurity', 'Update Security')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
