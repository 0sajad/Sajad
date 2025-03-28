
import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Zap, Trash, Database, RefreshCw, DownloadCloud, Server } from "lucide-react";
import { FeatureList } from "@/components/settings/features/FeatureList";

export function AdvancedSettings() {
  const { t } = useTranslation(['settingsPage']);
  const [developmentMode, setDevelopmentMode] = React.useState(false);
  const [loggingLevel, setLoggingLevel] = React.useState("info");
  const [autoUpdate, setAutoUpdate] = React.useState(true);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            {t('sections.advanced', 'Advanced Settings')}
          </CardTitle>
          <CardDescription>{t('advancedDescription', 'Configure advanced system settings and features')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="developmentMode" className="flex items-center gap-2">
                  <Server className="h-4 w-4" />
                  {t('advanced.developmentMode', 'Development Mode')}
                </Label>
                <p className="text-sm text-muted-foreground">{t('advanced.developmentModeDesc', 'Enable advanced debugging tools')}</p>
              </div>
              <Switch 
                id="developmentMode" 
                checked={developmentMode} 
                onCheckedChange={setDevelopmentMode} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoUpdate" className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  {t('advanced.autoUpdate', 'Automatic Updates')}
                </Label>
                <p className="text-sm text-muted-foreground">{t('advanced.autoUpdateDesc', 'Automatically download and install updates')}</p>
              </div>
              <Switch 
                id="autoUpdate" 
                checked={autoUpdate} 
                onCheckedChange={setAutoUpdate} 
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <Label htmlFor="loggingLevel">{t('advanced.loggingLevel', 'Logging Level')}</Label>
            <Select 
              value={loggingLevel} 
              onValueChange={setLoggingLevel}
            >
              <SelectTrigger id="loggingLevel">
                <SelectValue placeholder={t('advanced.selectLevel', 'Select Level')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="debug">{t('advanced.debug', 'Debug')}</SelectItem>
                <SelectItem value="info">{t('advanced.info', 'Info')}</SelectItem>
                <SelectItem value="warning">{t('advanced.warning', 'Warning')}</SelectItem>
                <SelectItem value="error">{t('advanced.error', 'Error')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-between">
            <Button variant="outline" className="flex items-center gap-2" type="button">
              <Trash className="h-4 w-4" />
              {t('advanced.clearCache', 'Clear Cache')}
            </Button>
            <Button className="flex items-center gap-2" type="button">
              <DownloadCloud className="h-4 w-4" />
              {t('advanced.exportData', 'Export Data')}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            {t('advanced.experimentalFeatures', 'Experimental Features')}
          </CardTitle>
          <CardDescription>
            {t('advanced.experimentalDesc', 'Enable or disable experimental features')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FeatureList />
        </CardContent>
      </Card>
    </div>
  );
}
