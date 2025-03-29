
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useTranslationValidator } from '@/hooks/useTranslationValidator';
import { Download, Search, Plus, RefreshCw, Languages, Check, X } from 'lucide-react';

export function TranslationManager() {
  const { t, i18n } = useTranslation();
  const { missingKeys, compareLanguageKeys, exportMissingKeys } = useTranslationValidator();
  const [activeTab, setActiveTab] = useState('missing-keys');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('ar');
  const [comparisonResult, setComparisonResult] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [allLanguages, setAllLanguages] = useState<string[]>([]);
  
  // استخراج قائمة اللغات المتاحة
  useEffect(() => {
    if (i18n.options.resources) {
      setAllLanguages(Object.keys(i18n.options.resources));
    }
  }, [i18n]);
  
  // مقارنة الترجمات بين لغتين
  const handleCompareLanguages = () => {
    const result = compareLanguageKeys(sourceLanguage, targetLanguage);
    setComparisonResult(result);
  };
  
  // تصدير المفاتيح المفقودة
  const handleExportMissingKeys = () => {
    exportMissingKeys();
  };
  
  // تصفية المفاتيح حسب عبارة البحث
  const filterKeys = (keys: string[] = []) => {
    if (!searchTerm) return keys;
    return keys.filter(key => key.toLowerCase().includes(searchTerm.toLowerCase()));
  };
  
  return (
    <Card className="shadow-md w-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <Languages className="mr-2 h-5 w-5 text-blue-500" />
            {t('dev.translationManager', 'مدير الترجمات')}
          </CardTitle>
        </div>
        <CardDescription>
          {t('dev.translationManagerDesc', 'اكتشاف وإدارة مفاتيح الترجمة المفقودة في التطبيق')}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="missing-keys">
              {t('dev.missingKeys', 'المفاتيح المفقودة')}
            </TabsTrigger>
            <TabsTrigger value="compare-languages">
              {t('dev.compareLanguages', 'مقارنة اللغات')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="missing-keys" className="space-y-4">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('dev.searchKeys', 'البحث في المفاتيح...')}
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {Object.entries(missingKeys).length > 0 ? (
              <div className="space-y-6">
                {Object.entries(missingKeys).map(([language, keys]) => (
                  <div key={language} className="space-y-2">
                    <div className="flex items-center">
                      <h3 className="text-sm font-medium flex items-center">
                        <Badge variant="outline" className="mr-2">
                          {language}
                        </Badge>
                        {t('dev.missingKeysCount', 'المفاتيح المفقودة')}: {keys.length}
                      </h3>
                    </div>
                    
                    {filterKeys(keys).length > 0 ? (
                      <div className="bg-muted/30 rounded-md p-2 max-h-60 overflow-auto">
                        <div className="space-y-1">
                          {filterKeys(keys).map((key) => (
                            <div key={key} className="text-xs font-mono p-1 border-b border-border/40 last:border-0">
                              {key}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {searchTerm 
                          ? t('dev.noKeysMatchSearch', 'لا توجد مفاتيح تطابق البحث') 
                          : t('dev.noMissingKeys', 'لا توجد مفاتيح مفقودة')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-6 bg-muted/20 rounded-md">
                <Languages className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="text-lg font-medium mb-1">
                  {t('dev.noMissingKeysDetected', 'لم يتم اكتشاف مفاتيح مفقودة')}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t('dev.interactWithApp', 'قم بالتفاعل مع التطبيق لاكتشاف المفاتيح المفقودة')}
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="compare-languages" className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="source-language" className="mb-1 block">
                  {t('dev.sourceLanguage', 'اللغة المصدر')}
                </Label>
                <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
                  <SelectTrigger id="source-language">
                    <SelectValue placeholder={t('dev.selectLanguage', 'اختر اللغة')} />
                  </SelectTrigger>
                  <SelectContent>
                    {allLanguages.map(lang => (
                      <SelectItem key={`source-${lang}`} value={lang}>{lang}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="target-language" className="mb-1 block">
                  {t('dev.targetLanguage', 'اللغة الهدف')}
                </Label>
                <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                  <SelectTrigger id="target-language">
                    <SelectValue placeholder={t('dev.selectLanguage', 'اختر اللغة')} />
                  </SelectTrigger>
                  <SelectContent>
                    {allLanguages.map(lang => (
                      <SelectItem key={`target-${lang}`} value={lang}>{lang}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button 
              onClick={handleCompareLanguages} 
              className="w-full"
              disabled={sourceLanguage === targetLanguage}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              {t('dev.compareTranslations', 'مقارنة الترجمات')}
            </Button>
            
            {comparisonResult.length > 0 ? (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">
                    {t('dev.missingInTarget', 'المفاتيح المفقودة في اللغة الهدف')}: {comparisonResult.length}
                  </h3>
                </div>
                
                <div className="bg-muted/30 rounded-md p-2 max-h-60 overflow-auto">
                  <div className="space-y-1">
                    {filterKeys(comparisonResult).map((key) => (
                      <div key={key} className="text-xs font-mono p-1 border-b border-border/40 last:border-0">
                        {key}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : comparisonResult.length === 0 && sourceLanguage !== targetLanguage ? (
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-md mt-4 border border-green-200 dark:border-green-900/30">
                <Check className="h-6 w-6 text-green-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-green-700 dark:text-green-300">
                  {t('dev.allKeysTranslated', 'جميع المفاتيح مترجمة في اللغة الهدف')}
                </p>
              </div>
            ) : null}
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" size="sm" disabled={Object.keys(missingKeys).length === 0}>
          <Plus className="mr-2 h-4 w-4" />
          {t('dev.addMissingTranslations', 'إضافة الترجمات المفقودة')}
        </Button>
        
        <Button variant="outline" size="sm" onClick={handleExportMissingKeys} disabled={Object.keys(missingKeys).length === 0}>
          <Download className="mr-2 h-4 w-4" />
          {t('dev.exportMissingKeys', 'تصدير المفاتيح المفقودة')}
        </Button>
      </CardFooter>
    </Card>
  );
}
