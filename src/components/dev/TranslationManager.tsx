
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { MissingTranslationDetector } from "@/utils/i18n/MissingTranslationDetector";
import { Download, RefreshCw, Trash2 } from "lucide-react";

export function TranslationManager() {
  const { t, i18n } = useTranslation();
  const [missingKeys, setMissingKeys] = useState<Record<string, string[]>>({});
  const [activeTab, setActiveTab] = useState("ar");
  
  // تحديث المفاتيح المفقودة
  useEffect(() => {
    const fetchMissingKeys = () => {
      const keys = MissingTranslationDetector.getMissingKeys();
      setMissingKeys(keys);
    };
    
    fetchMissingKeys();
    
    // تحديث كل 3 ثوان
    const interval = setInterval(fetchMissingKeys, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  // حساب إجمالي المفاتيح المفقودة لكل لغة
  const getTotalByLanguage = (lang: string): number => {
    return missingKeys[lang]?.length || 0;
  };
  
  // الحصول على إجمالي المفاتيح المفقودة
  const getTotalMissingKeys = (): number => {
    return Object.values(missingKeys).reduce((total, keys) => total + keys.length, 0);
  };
  
  // مسح المفاتيح المفقودة
  const handleClearMissingKeys = () => {
    MissingTranslationDetector.clearMissingKeys();
    setMissingKeys({});
  };
  
  // تصدير المفاتيح المفقودة
  const handleExport = () => {
    const data = MissingTranslationDetector.exportMissingKeys();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `missing-translations-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // اللغات المتاحة في التطبيق
  const languages = ['ar', 'ar-iq', 'en', 'fr', 'ja', 'zh'];
  
  return (
    <Card>
      <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{t('dev.translations.title', 'إدارة الترجمات')}</CardTitle>
            <CardDescription>
              {t('dev.translations.description', 'مراقبة وتتبع مفاتيح الترجمة المفقودة في التطبيق')}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleClearMissingKeys}>
              <Trash2 className="h-4 w-4 mr-2" />
              {t('dev.translations.clear', 'مسح الكل')}
            </Button>
            <Button variant="default" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              {t('dev.translations.export', 'تصدير')}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="bg-amber-50 border border-amber-200 text-amber-700 p-3 rounded-md mb-4 text-sm">
          {t('dev.translations.totalMissing', 'إجمالي مفاتيح الترجمة المفقودة: {{count}}', { count: getTotalMissingKeys() })}
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            {languages.map(lang => (
              <TabsTrigger key={lang} value={lang} disabled={!missingKeys[lang]?.length}>
                {lang} {missingKeys[lang]?.length ? `(${missingKeys[lang].length})` : ''}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {languages.map(lang => (
            <TabsContent key={lang} value={lang} className="p-0">
              {missingKeys[lang]?.length ? (
                <div className="border rounded-md overflow-hidden">
                  <div className="bg-muted p-2 text-xs font-medium border-b">
                    {t('dev.translations.missingKeys', 'المفاتيح المفقودة')} ({getTotalByLanguage(lang)})
                  </div>
                  <ul className="divide-y max-h-[300px] overflow-auto">
                    {missingKeys[lang]?.map((key, index) => (
                      <li key={index} className="p-2 text-sm hover:bg-muted/50">
                        <code className="bg-muted/40 px-1 py-0.5 rounded">{key}</code>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-muted-foreground">
                  <RefreshCw className="h-10 w-10 mb-2 opacity-20" />
                  <p>{t('dev.translations.noMissingKeys', 'لا توجد مفاتيح مفقودة لهذه اللغة')}</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
