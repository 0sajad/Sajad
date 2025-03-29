
import React, { useEffect, useState } from 'react';
import { useTranslationValidator } from '@/hooks/useTranslationValidator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAppState } from '@/hooks/state/use-app-state';
import { FileJson, Languages } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslation } from 'react-i18next';
import { Progress } from '@/components/ui/progress';
import { MissingTranslationStats } from '@/utils/i18n/MissingTranslationDetector';

export function MissingKeysIndicator() {
  const { t } = useTranslation();
  const { missingKeys, stats, exportMissingKeys } = useTranslationValidator();
  const [totalMissingKeys, setTotalMissingKeys] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const isDeveloperMode = useAppState(state => state.preferences?.developerMode);
  
  // حساب إجمالي المفاتيح المفقودة
  useEffect(() => {
    if (!isDeveloperMode) return;
    
    setTotalMissingKeys(stats.totalCount);
    setLastUpdated(stats.lastUpdated);
  }, [missingKeys, stats, isDeveloperMode]);
  
  // إذا لم يكن في وضع المطور، أو لا توجد مفاتيح مفقودة، لا تعرض شيئاً
  if (!isDeveloperMode || totalMissingKeys === 0) {
    return null;
  }
  
  // الحصول على اللغة التي تحتوي على أكبر عدد من المفاتيح المفقودة
  const getMostMissingLanguage = (): {code: string, count: number} => {
    const entries = Object.entries(stats.languageCounts);
    if (entries.length === 0) return {code: '', count: 0};
    
    const sorted = entries.sort((a, b) => b[1] - a[1]);
    return {code: sorted[0][0], count: sorted[0][1]};
  };
  
  const mostMissingLang = getMostMissingLanguage();
  const formattedDate = lastUpdated ? 
    new Intl.DateTimeFormat(undefined, {
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    }).format(lastUpdated) : '';
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="fixed bottom-16 left-4 z-50 flex flex-col items-start gap-2">
            <Button
              variant="outline"
              size="sm"
              className="p-1 h-auto bg-amber-50 border-amber-200 hover:bg-amber-100 hover:border-amber-300 dark:bg-amber-900/20 dark:border-amber-900/30 dark:hover:bg-amber-900/30 dark:hover:border-amber-900/40 transition-all duration-300"
              onClick={exportMissingKeys}
            >
              <div className="flex items-center gap-1.5">
                <Languages className="h-3.5 w-3.5 text-amber-600 dark:text-amber-500" />
                <Badge variant="outline" className="h-5 px-1.5 text-[10px] font-normal bg-amber-100 border-amber-300 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-900/50">
                  {totalMissingKeys}
                </Badge>
                
                {lastUpdated && (
                  <span className="text-[8px] text-amber-600 dark:text-amber-400 opacity-70">
                    {formattedDate}
                  </span>
                )}
              </div>
            </Button>
            
            {mostMissingLang.code && (
              <div className="bg-amber-100/70 border border-amber-200 dark:bg-amber-900/30 dark:border-amber-800/30 rounded px-2 py-1 text-[9px] text-amber-800 dark:text-amber-300 flex items-center">
                <FileJson className="h-2.5 w-2.5 mr-1 text-amber-600 dark:text-amber-500" />
                <span>
                  {mostMissingLang.code}: {mostMissingLang.count}
                </span>
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="w-64 p-0 overflow-hidden">
          <div className="p-3">
            <p className="text-xs mb-1 font-medium">
              {t('dev.missingTranslationsFound', 'تم العثور على {{count}} من مفاتيح الترجمة المفقودة', { count: totalMissingKeys })}
            </p>
            <p className="text-xs text-muted-foreground">
              {t('dev.clickToExport', 'انقر لتصدير القائمة')}
            </p>
            
            {Object.entries(stats.languageCounts).length > 0 && (
              <div className="mt-2 space-y-1">
                {Object.entries(stats.languageCounts)
                  .sort(([, a], [, b]) => b - a)
                  .map(([lang, count]) => (
                    <div key={lang} className="text-[10px]">
                      <div className="flex justify-between mb-0.5">
                        <span>{lang}</span>
                        <span className="text-muted-foreground">{count}</span>
                      </div>
                      <Progress value={(count / totalMissingKeys) * 100} className="h-1" />
                    </div>
                  ))
                }
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
