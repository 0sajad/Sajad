import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MissingTranslationDetector } from "@/utils/i18n/MissingTranslationDetector";
import { AlertCircle, FileText, Download, Check, RefreshCw, Search, Plus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export function TranslationManager() {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [missingKeys, setMissingKeys] = useState<Record<string, string[]>>({});
  const [scanning, setScanning] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("ar");
  
  // نموذج لبيانات المفاتيح الناقصة
  const scanForMissingKeys = () => {
    setScanning(true);
    
    // تنفيذ فحص المفاتيح الناقصة
    setTimeout(() => {
      // استخدام كاشف الترجمات المفقودة
      MissingTranslationDetector.init();
      
      // إجراء مسح وهمي للصفحة للعثور على النصوص غير المترجمة
      const results = MissingTranslationDetector.scanPageForUntranslated();
      
      // تحديث النتائج
      setMissingKeys({
        ar: ['common.welcome', 'settings.theme', 'dashboard.title'],
        en: ['settings.notifications', 'security.warnings'],
        fr: ['common.welcome', 'common.logout', 'settings.theme', 'dashboard.statistics'],
      });
      
      setScanning(false);
      
      toast({
        title: t('developer.translations.scanComplete', 'اكتمل الفحص'),
        description: t('developer.translations.foundItems', 'تم العثور على {{count}} عنصر مفقود', { count: 8 }),
      });
    }, 1500);
  };
  
  const exportMissingKeys = () => {
    // محاكاة تصدير المفاتيح المفقودة كملف JSON
    const json = JSON.stringify(missingKeys, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'missing-translations.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: t('developer.translations.exported', 'تم التصدير'),
      description: t('developer.translations.exportedDesc', 'تم تصدير المفاتيح المفقودة بنجاح'),
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg font-tajawal flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-500" />
            {t('developer.translations.missing.title', 'المفاتيح المفقودة')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground font-tajawal">
              {t('developer.translations.missing.description', 'فحص وإدارة مفاتيح الترجمة المفقودة في التطبيق')}
            </div>
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Button 
                variant="outline" 
                size="sm"
                onClick={scanForMissingKeys}
                disabled={scanning}
              >
                {scanning ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Search className="h-4 w-4 mr-2" />
                )}
                <span>{t('developer.translations.missing.scan', 'فحص')}</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={exportMissingKeys}
                disabled={Object.keys(missingKeys).length === 0}
              >
                <Download className="h-4 w-4 mr-2" />
                <span>{t('developer.translations.missing.export', 'تصدير')}</span>
              </Button>
            </div>
          </div>
          
          {Object.keys(missingKeys).length > 0 ? (
            <>
              <div className="mt-4">
                <Label className="font-tajawal mb-2 block">
                  {t('developer.translations.missing.language', 'اللغة')}
                </Label>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(missingKeys).map(lang => (
                    <Button
                      key={lang}
                      variant={selectedLanguage === lang ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedLanguage(lang)}
                    >
                      {lang} ({missingKeys[lang].length})
                    </Button>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="font-tajawal">{t('developer.translations.missing.keys', 'المفاتيح')}</Label>
                  <span className="text-xs text-muted-foreground">
                    {missingKeys[selectedLanguage]?.length || 0} {t('developer.translations.missing.items', 'عناصر')}
                  </span>
                </div>
                
                <ScrollArea className="h-52 rounded-md border p-2">
                  {missingKeys[selectedLanguage]?.map((key, index) => (
                    <div key={index} className="flex items-center justify-between py-1">
                      <code className="text-sm font-mono bg-muted px-1 py-0.5 rounded">
                        {key}
                      </code>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Plus className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </>
          ) : (
            <div className="bg-muted/40 rounded-md p-6 flex flex-col items-center justify-center">
              <AlertCircle className="h-10 w-10 text-muted-foreground/60 mb-2" />
              <p className="text-center text-muted-foreground font-tajawal">
                {scanning 
                  ? t('developer.translations.missing.scanning', 'جاري البحث عن المفاتيح المفقودة...') 
                  : t('developer.translations.missing.noScan', 'قم بفحص التطبيق للعثور على المفاتيح المفقودة')}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg font-tajawal">
            {t('developer.translations.entry.title', 'إضافة ترجمات جديدة')}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="font-tajawal">
                {t('developer.translations.entry.key', 'مفتاح الترجمة')}
              </Label>
              <Input 
                placeholder="common.buttons.save"
                className="font-mono text-sm"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-tajawal">عربي</Label>
                <Input placeholder="الترجمة بالعربية" dir="rtl" />
              </div>
              <div className="space-y-2">
                <Label className="font-tajawal">English</Label>
                <Input placeholder="English translation" />
              </div>
            </div>
            
            <Button className="w-full">
              <Check className="h-4 w-4 mr-2" />
              {t('developer.translations.entry.add', 'إضافة الترجمة')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
