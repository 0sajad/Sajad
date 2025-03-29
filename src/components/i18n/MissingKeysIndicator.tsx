
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AlertCircle,
  ChevronDown,
  ChevronUp,
  X,
  Download,
  FileWarning
} from 'lucide-react';
import { getMissingTranslationDetector } from '@/utils/i18n/MissingTranslationDetector';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAppState } from '@/hooks/state/use-app-state';

/**
 * مؤشر يعرض عدد مفاتيح الترجمة المفقودة للمطورين
 */
export function MissingKeysIndicator() {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [missingKeys, setMissingKeys] = useState<Record<string, string[]>>({});
  const [totalMissing, setTotalMissing] = useState(0);
  const isDeveloperMode = useAppState(state => state.preferences.developerMode);

  // تحديث المفاتيح المفقودة كل ثانية لمراقبتها في الوقت الفعلي
  useEffect(() => {
    if (!isDeveloperMode) return;

    const updateMissingKeys = () => {
      const detector = getMissingTranslationDetector();
      if (detector) {
        const keys = detector.getAllMissingKeys();
        setMissingKeys(keys);
        
        // حساب إجمالي المفاتيح المفقودة
        const total = Object.values(keys).reduce(
          (sum, langKeys) => sum + langKeys.length, 
          0
        );
        setTotalMissing(total);
      }
    };

    // التحديث الأولي
    updateMissingKeys();

    // إعداد مؤقت للتحديث الدوري
    const intervalId = setInterval(updateMissingKeys, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isDeveloperMode]);

  // إغلاق المؤشر
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(false);
  };

  // تنزيل المفاتيح المفقودة
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const detector = getMissingTranslationDetector();
    if (detector) {
      detector.downloadMissingKeys();
    }
  };

  // إذا لم يكن وضع المطور مفعلاً أو لا توجد مفاتيح مفقودة
  if (!isDeveloperMode || totalMissing === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`bg-amber-100 dark:bg-amber-900 border border-amber-300 dark:border-amber-700 rounded-lg shadow-lg transition-all overflow-hidden ${
          expanded ? 'max-h-96 w-96' : 'w-auto'
        }`}
      >
        <div
          className="px-4 py-2 flex items-center justify-between cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-center gap-2">
            <FileWarning className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <span className="font-medium text-amber-800 dark:text-amber-300">
              {t('translation.missingKeys', 'Missing Translations')}
            </span>
            <Badge variant="outline" className="bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200">
              {totalMissing}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            {expanded ? (
              <ChevronDown className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            ) : (
              <ChevronUp className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-amber-600 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-800"
              onClick={handleClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {expanded && (
          <div className="p-4 border-t border-amber-200 dark:border-amber-800 max-h-80 overflow-y-auto">
            <div className="mb-4 flex justify-between items-center">
              <span className="text-sm text-amber-700 dark:text-amber-300">
                {t('translation.detectedMissingKeys', 'Detected {{count}} missing keys in {{languages}} languages', {
                  count: totalMissing,
                  languages: Object.keys(missingKeys).length
                })}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="h-8 bg-amber-50 dark:bg-amber-950 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300"
                onClick={handleDownload}
              >
                <Download className="h-3 w-3 mr-1" />
                {t('common.download', 'Download')}
              </Button>
            </div>

            {Object.entries(missingKeys).map(([language, keys]) => (
              <div key={language} className="mb-4">
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2 text-amber-800 dark:text-amber-200">
                  <AlertCircle className="h-3 w-3" />
                  {language}: {keys.length} {t('translation.keys', 'keys')}
                </h4>
                <div className="bg-amber-50 dark:bg-amber-950 rounded-md p-2 text-xs max-h-32 overflow-y-auto">
                  {keys.map(key => (
                    <div
                      key={key}
                      className="py-1 px-2 border-b border-amber-100 dark:border-amber-900 last:border-0 font-mono text-amber-700 dark:text-amber-300"
                    >
                      {key}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
