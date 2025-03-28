
import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, RefreshCw, Bell, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useA11y } from "@/hooks/useA11y";

export function DashboardHeader() {
  const { t } = useTranslation(['dashboard']);
  const { announce } = useA11y();
  
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t('title')}</h1>
          <p className="text-muted-foreground">{t('welcome')}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-48">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-8 h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
            />
          </div>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => {
              announce(t('refreshing', 'Refreshing dashboard...'), 'info');
            }}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">{t('systemStatus')}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="default" className="bg-green-500">
                  {t('active')}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium">{t('quickActions')}</p>
            <Select defaultValue="scan">
              <SelectTrigger className="mt-1 h-8">
                <SelectValue placeholder={t('selectAction')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="scan">{t('actions.scan')}</SelectItem>
                <SelectItem value="optimize">{t('actions.optimize')}</SelectItem>
                <SelectItem value="backup">{t('actions.backup')}</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardContent className="p-4">
            <p className="text-sm font-medium">{t('latestUpdates')}</p>
            <p className="text-sm text-muted-foreground mt-1">{t('noUpdates')}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
