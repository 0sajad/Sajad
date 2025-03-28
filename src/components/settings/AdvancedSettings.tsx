
import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { AdvancedFeatures } from "./AdvancedFeatures";

export function AdvancedSettings() {
  const { t } = useTranslation(['settingsPage']);
  const [optimizationLevel, setOptimizationLevel] = React.useState(50);
  const [debugMode, setDebugMode] = React.useState(false);
  const [backupFrequency, setBackupFrequency] = React.useState("weekly");
  const [apiEndpoint, setApiEndpoint] = React.useState("");
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('sections.advanced')}</CardTitle>
        <CardDescription>{t('advancedSettingsDescription', 'Configure advanced settings for power users')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="debugMode">{t('advanced.debugMode', 'Debug Mode')}</Label>
            <Switch 
              id="debugMode" 
              checked={debugMode} 
              onCheckedChange={setDebugMode} 
            />
          </div>
          
          <div className="space-y-2">
            <Label>{t('advanced.optimizationLevel', 'Optimization Level')}</Label>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Slider 
                value={[optimizationLevel]} 
                onValueChange={(vals) => setOptimizationLevel(vals[0])} 
                max={100} 
                step={1}
              />
              <span className="w-12 text-center">{optimizationLevel}%</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="backupFrequency">{t('advanced.backupFrequency', 'Backup Frequency')}</Label>
            <Select 
              value={backupFrequency} 
              onValueChange={setBackupFrequency}
            >
              <SelectTrigger id="backupFrequency">
                <SelectValue placeholder={t('advanced.selectFrequency', 'Select Frequency')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">{t('advanced.daily', 'Daily')}</SelectItem>
                <SelectItem value="weekly">{t('advanced.weekly', 'Weekly')}</SelectItem>
                <SelectItem value="monthly">{t('advanced.monthly', 'Monthly')}</SelectItem>
                <SelectItem value="never">{t('advanced.never', 'Never')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="apiEndpoint">{t('advanced.apiEndpoint', 'API Endpoint')}</Label>
            <Input 
              id="apiEndpoint" 
              value={apiEndpoint} 
              onChange={(e) => setApiEndpoint(e.target.value)} 
              placeholder="https://api.example.com/v1"
            />
          </div>
        </div>
        
        <Separator />
        
        <AdvancedFeatures />
        
        <div className="flex justify-end">
          <Button variant="outline">{t('advanced.resetToDefaults', 'Reset to Defaults')}</Button>
        </div>
      </CardContent>
    </Card>
  );
}
