
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useTranslation } from 'react-i18next';

export const NetworkQualityIndicator = () => {
  const { t } = useTranslation('dashboard');
  const networkQuality = 85; // Example value, this could be fetched from a hook or API

  const getQualityColor = (quality: number) => {
    if (quality >= 80) return "bg-green-500";
    if (quality >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{t('networkQuality')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Progress 
            value={networkQuality} 
            className="h-2"
            indicatorClassName={getQualityColor(networkQuality)}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span>{networkQuality}%</span>
            <span>100%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkQualityIndicator;
