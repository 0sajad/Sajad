
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface TranslationMetrics {
  totalLookups: number;
  keysByLanguage: Record<string, Set<string>>;
  uniqueKeysCount: number;
  missingKeysCount: number;
  lastUsedKey: string | null;
  topUsedKeys: Array<{ key: string; count: number }>;
}

/**
 * خطاف لتتبع إحصاءات استخدام الترجمة لأغراض التطوير
 */
export function useTranslationMetrics() {
  const { t, i18n } = useTranslation();
  const [metrics, setMetrics] = useState<TranslationMetrics>({
    totalLookups: 0,
    keysByLanguage: {},
    uniqueKeysCount: 0,
    missingKeysCount: 0,
    lastUsedKey: null,
    topUsedKeys: []
  });
  
  // إنشاء نظام التتبع
  useEffect(() => {
    // نسخة أصلية من دالة الترجمة
    const originalT = i18n.t.bind(i18n);
    const keyUsageCounts: Record<string, number> = {};
    let lookupCount = 0;
    let missingCount = 0;
    const uniqueKeys = new Set<string>();
    const keysByLang: Record<string, Set<string>> = {};
    
    // استبدال دالة الترجمة بنسخة تتبعية
    (i18n as any).t = (key: string, ...args: any[]) => {
      // تتبع استخدام المفتاح
      if (key) {
        lookupCount++;
        uniqueKeys.add(key);
        
        // تتبع حسب اللغة
        const currentLang = i18n.language || 'unknown';
        if (!keysByLang[currentLang]) {
          keysByLang[currentLang] = new Set();
        }
        keysByLang[currentLang].add(key);
        
        // تتبع عدد مرات الاستخدام
        keyUsageCounts[key] = (keyUsageCounts[key] || 0) + 1;
        
        // تتبع المفاتيح المفقودة
        const exists = i18n.exists(key);
        if (!exists) {
          missingCount++;
        }
        
        // تحديث المقاييس
        const topKeys = Object.entries(keyUsageCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10)
          .map(([key, count]) => ({ key, count }));
        
        setMetrics({
          totalLookups: lookupCount,
          keysByLanguage: keysByLang,
          uniqueKeysCount: uniqueKeys.size,
          missingKeysCount: missingCount,
          lastUsedKey: key,
          topUsedKeys: topKeys
        });
      }
      
      // استدعاء دالة الترجمة الأصلية
      return originalT(key, ...(args as any));
    };
    
    // إعادة الدالة الأصلية عند التنظيف
    return () => {
      i18n.t = originalT;
    };
  }, [i18n]);
  
  return metrics;
}
