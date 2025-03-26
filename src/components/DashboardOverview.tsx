
import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNetworkDashboard } from "@/hooks/useNetworkDashboard";
import { Laptop, Shield, Activity, AlertTriangle, CheckCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

export function DashboardOverview() {
  const { t } = useTranslation("dashboard");
  const { isLoading, deviceCount, activeAlerts, networkScore, securityStatus, recentEvents } = useNetworkDashboard();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('overview')}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Devices Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Laptop className="mr-2 h-4 w-4" />
              {t('devices')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="text-2xl font-bold">{deviceCount}</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              {t('connectedDevices')}
            </p>
          </CardContent>
        </Card>
        
        {/* Alerts Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertTriangle className="mr-2 h-4 w-4" />
              {t('alerts')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="flex items-center">
                <div className="text-2xl font-bold">{activeAlerts}</div>
                <Badge variant={activeAlerts > 0 ? "destructive" : "outline"} className="ml-2">
                  {activeAlerts > 0 ? t('active') : t('noAlerts')}
                </Badge>
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              {t('issuesRequiringAttention')}
            </p>
          </CardContent>
        </Card>
        
        {/* Network Score Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Activity className="mr-2 h-4 w-4" />
              {t('performance')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-full" />
            ) : (
              <>
                <div className="text-2xl font-bold mb-1">{networkScore}/100</div>
                <Progress value={networkScore} className="h-2" />
              </>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              {t('networkScore')}
            </p>
          </CardContent>
        </Card>
        
        {/* Security Status Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Shield className="mr-2 h-4 w-4" />
              {t('security')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="flex items-center">
                {securityStatus === 'secure' ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-green-600 font-medium">{t('securitySecure')}</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                    <span className="text-amber-600 font-medium">{t('securityWarning')}</span>
                  </>
                )}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              {t('securityStatus')}
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>{t('activity')}</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : (
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    {event.type === 'connection' && <Laptop className="h-4 w-4 mr-2 text-blue-500" />}
                    {event.type === 'security' && <Shield className="h-4 w-4 mr-2 text-red-500" />}
                    {event.type === 'performance' && <Activity className="h-4 w-4 mr-2 text-green-500" />}
                    <div>
                      <p className="text-sm font-medium">{event.device}</p>
                      <p className="text-xs text-muted-foreground">{t(`eventTypes.${event.type}`)}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{event.time}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
