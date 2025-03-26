
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMissingTranslations } from "@/hooks/useMissingTranslations";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMode } from "@/context/ModeContext";

/**
 * مكون لتصحيح وتتبع مشاكل الترجمة أثناء التطوير
 */
export function TranslationDebugger() {
  const { t, i18n } = useTranslation();
  const { missingKeys, clearMissingKeys } = useMissingTranslations();
  const [visible, setVisible] = useState(false);
  const { isDeveloperMode } = useMode();
  
  // عرض المكون فقط في وضع المطور
  if (!isDeveloperMode) {
    return null;
  }
  
  return (
    <div className="fixed bottom-20 right-4 z-50 w-80">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setVisible(!visible)}
        className="mb-2 bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200"
      >
        {t('developer.translation.debugger', 'مصحح الترجمة')} 
        {missingKeys.length > 0 && (
          <Badge variant="destructive" className="ml-2">{missingKeys.length}</Badge>
        )}
      </Button>
      
      {visible && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t('developer.translation.title', 'أداة تصحيح الترجمة')}</CardTitle>
            <CardDescription className="text-xs">
              {t('developer.translation.description', 'تتبع مفاتيح الترجمة المفقودة')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{t('developer.translation.language', 'اللغة الحالية')}</span>
                <Badge>{i18n.language}</Badge>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{t('developer.translation.missingKeys', 'المفاتيح المفقودة')}</span>
                  <Button variant="ghost" size="sm" onClick={clearMissingKeys} className="h-6 text-xs">
                    {t('developer.translation.clear', 'مسح')}
                  </Button>
                </div>
                
                {missingKeys.length > 0 ? (
                  <div className="max-h-40 overflow-y-auto border rounded-md p-2 bg-gray-50">
                    {missingKeys.map((key, index) => (
                      <div key={index} className="text-xs text-red-600 mb-1 font-mono">{key}</div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground italic">
                    {t('developer.translation.noMissingKeys', 'لا توجد مفاتيح مفقودة')}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
