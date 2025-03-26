
import React from "react";
import { useMode } from "@/context/ModeContext";
import { DeveloperPanel } from "@/components/developer/DeveloperPanel";
import { Header } from "@/components/Header";
import { useTranslation } from "react-i18next";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";

const Dashboard = () => {
  const { t } = useTranslation();
  const { isDeveloperMode } = useMode();
  
  return (
    <TooltipProvider>
      <div className="container mx-auto p-6">
        <Header />
        
        {/* Show Developer Panel only in Developer Mode */}
        {isDeveloperMode && <DeveloperPanel />}
        
        <h1 className="text-2xl font-bold mb-6">{t('dashboard.title', 'Dashboard')}</h1>
        <p className="text-muted-foreground mb-8">{t('dashboard.welcome', 'Welcome to OCTA-GRAM Dashboard')}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{t('dashboard.systemStatus', 'System Status')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t('dashboard.status', 'Status')}:</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                  {t('dashboard.active', 'Active')}
                </Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{t('dashboard.quickActions', 'Quick Actions')}</CardTitle>
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
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{t('dashboard.latestUpdates', 'Latest Updates')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {t('dashboard.noUpdates', 'No new updates available')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Dashboard;
