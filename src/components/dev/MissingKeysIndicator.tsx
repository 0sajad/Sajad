
import React, { useEffect, useState } from 'react';
import { useTranslationValidator } from '@/hooks/useTranslationValidator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAppState } from '@/hooks/state/use-app-state';
import { Languages } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslation } from 'react-i18next';

export function MissingKeysIndicator() {
  const { t } = useTranslation();
  const { missingKeys, exportMissingKeys } = useTranslationValidator();
  const [totalMissingKeys, setTotalMissingKeys] = useState(0);
  const isDeveloperMode = useAppState(state => state.preferences.developerMode);
  
  // حساب إجمالي المفاتيح المفقودة
  useEffect(() => {
    if (!isDeveloperMode) return;
    
    let count = 0;
    Object.values(missingKeys).forEach(keys => {
      count += keys.length;
    });
    setTotalMissingKeys(count);
  }, [missingKeys, isDeveloperMode]);
  
  // إذا لم يكن في وضع المطور، أو لا توجد مفاتيح مفقودة، لا تعرض شيئاً
  if (!isDeveloperMode || totalMissingKeys === 0) {
    return null;
  }
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="fixed bottom-16 left-4 z-50 p-1 h-auto bg-amber-50 border-amber-200 hover:bg-amber-100 hover:border-amber-300 dark:bg-amber-900/20 dark:border-amber-900/30 dark:hover:bg-amber-900/30 dark:hover:border-amber-900/40"
            onClick={exportMissingKeys}
          >
            <div className="flex items-center gap-1.5">
              <Languages className="h-3.5 w-3.5 text-amber-600 dark:text-amber-500" />
              <Badge variant="outline" className="h-5 px-1.5 text-[10px] font-normal bg-amber-100 border-amber-300 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-900/50">
                {totalMissingKeys}
              </Badge>
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p className="text-xs">
            {t('dev.missingTranslationsFound', 'تم العثور على {{count}} من مفاتيح الترجمة المفقودة', { count: totalMissingKeys })}
          </p>
          <p className="text-xs text-muted-foreground">
            {t('dev.clickToExport', 'انقر لتصدير القائمة')}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
