
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

export const SystemStatusPanel = () => {
  const { t } = useTranslation('dashboard');

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{t('systemStatus')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{t('status')}:</span>
            <span className="flex items-center text-sm font-medium text-green-600 dark:text-green-400">
              <span className="mr-1.5 h-2 w-2 rounded-full bg-green-600 dark:bg-green-400"></span>
              {t('active')}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemStatusPanel;
