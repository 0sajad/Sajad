
import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Server, Settings, Shield } from "lucide-react";

export const StatusCards = () => {
  const { t } = useTranslation();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <Card className="transform transition-all duration-300 hover:shadow-lg border-l-4 border-l-green-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Server className="mr-2 h-5 w-5 text-green-500" />
            {t('dashboard.systemStatus', 'System Status')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{t('dashboard.status', 'Status')}:</span>
            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
              {t('dashboard.active', 'Active')}
            </Badge>
          </div>
          <div className="mt-2 pt-2 border-t">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground">{t('dashboard.uptime', 'Uptime')}:</p>
                <p className="font-medium">99.9%</p>
              </div>
              <div>
                <p className="text-muted-foreground">{t('dashboard.lastCheck', 'Last Check')}:</p>
                <p className="font-medium">2 {t('dashboard.minutesAgo', 'minutes ago')}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="transform transition-all duration-300 hover:shadow-lg border-l-4 border-l-blue-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Settings className="mr-2 h-5 w-5 text-blue-500" />
            {t('dashboard.quickActions', 'Quick Actions')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t('dashboard.selectAction', 'Select action')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="scan">{t('dashboard.actions.scan', 'Scan Network')}</SelectItem>
              <SelectItem value="optimize">{t('dashboard.actions.optimize', 'Optimize Performance')}</SelectItem>
              <SelectItem value="backup">{t('dashboard.actions.backup', 'Backup Settings')}</SelectItem>
              <SelectItem value="security">{t('dashboard.actions.security', 'Security Check')}</SelectItem>
              <SelectItem value="debug">{t('dashboard.actions.debug', 'Debug Connection')}</SelectItem>
            </SelectContent>
          </Select>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="mt-2 w-full">
              {t('dashboard.execute', 'Execute')}
            </Button>
            <Button variant="ghost" size="sm" className="mt-2 w-full">
              {t('dashboard.schedule', 'Schedule')}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="transform transition-all duration-300 hover:shadow-lg border-l-4 border-l-purple-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Shield className="mr-2 h-5 w-5 text-purple-500" />
            {t('dashboard.latestUpdates', 'Latest Updates')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {t('dashboard.securityUpdate', 'Security update available')}
              </p>
            </div>
            <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-md">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm text-green-700 dark:text-green-300">
                {t('dashboard.performanceOptimized', 'Performance optimized')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
