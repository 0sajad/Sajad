
import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { useTranslationValidator } from "@/hooks/useTranslationValidator";
import { Download, RefreshCw, Trash2, FileJson, Search, Filter, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

export function TranslationManager() {
  const { t, i18n } = useTranslation();
  const { missingKeys, stats, exportMissingKeys, clearMissingKeys } = useTranslationValidator();
  const [activeTab, setActiveTab] = useState<string>("ar");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  
  // تحديد التبويب النشط عند تغير اللغة
  useEffect(() => {
    // استخدم اللغة الحالية كتبويب افتراضي إذا كانت تحتوي على مفاتيح مفقودة
    const currentLang = i18n.language;
    if (currentLang && stats.languageCounts[currentLang]) {
      setActiveTab(currentLang);
    }
  }, [i18n.language, stats.languageCounts]);
  
  // حساب إجمالي المفاتيح المفقودة لكل لغة
  const getTotalByLanguage = (lang: string): number => {
    return stats.languageCounts[lang] || 0;
  };
  
  // مسح المفاتيح المفقودة
  const handleClearMissingKeys = (language?: string) => {
    clearMissingKeys(language);
    setSelectedKeys([]);
  };
  
  // مسح المفاتيح المحددة
  const clearSelectedKeys = () => {
    // إضافة منطق مسح المفاتيح المحددة هنا
    setSelectedKeys([]);
  };
  
  // تصفية المفاتيح بناءً على البحث
  const filterKeys = useCallback((keys: string[]): string[] => {
    if (!searchQuery) return keys;
    
    return keys.filter(key => 
      key.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);
  
  // فرز المفاتيح
  const sortKeys = useCallback((keys: string[]): string[] => {
    return [...keys].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.localeCompare(b);
      } else {
        return b.localeCompare(a);
      }
    });
  }, [sortOrder]);
  
  // معالجة تحديد المفاتيح
  const toggleKeySelection = (key: string) => {
    setSelectedKeys(prev => 
      prev.includes(key)
        ? prev.filter(k => k !== key)
        : [...prev, key]
    );
  };
  
  // التحقق مما إذا كانت جميع المفاتيح محددة
  const areAllKeysSelected = (keys: string[]): boolean => {
    if (keys.length === 0) return false;
    return keys.every(key => selectedKeys.includes(key));
  };
  
  // تحديد أو إلغاء تحديد جميع المفاتيح
  const toggleAllKeys = (keys: string[]) => {
    if (areAllKeysSelected(keys)) {
      setSelectedKeys(prev => prev.filter(key => !keys.includes(key)));
    } else {
      setSelectedKeys(prev => {
        const newKeys = [...prev];
        keys.forEach(key => {
          if (!newKeys.includes(key)) {
            newKeys.push(key);
          }
        });
        return newKeys;
      });
    }
  };
  
  // تصفية وفرز المفاتيح للعرض
  const getFilteredAndSortedKeys = (language: string): string[] => {
    const keys = missingKeys[language] || [];
    const filtered = filterKeys(keys);
    return sortKeys(filtered);
  };
  
  // اللغات المتاحة في التطبيق
  const availableLanguages = Object.keys(stats.languageCounts).sort();
  
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-3.5 w-3.5 mr-2" />
                  {t('dev.translations.clear', 'مسح')}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t('dev.translations.clearOptions', 'خيارات المسح')}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleClearMissingKeys()}>
                  {t('dev.translations.clearAll', 'مسح جميع اللغات')}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleClearMissingKeys(activeTab)}
                  disabled={!activeTab || getTotalByLanguage(activeTab) === 0}
                >
                  {t('dev.translations.clearCurrentLanguage', 'مسح اللغة الحالية فقط')}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={clearSelectedKeys}
                  disabled={selectedKeys.length === 0}
                >
                  {t('dev.translations.clearSelected', 'مسح المفاتيح المحددة ({{count}})', { count: selectedKeys.length })}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="default" size="sm" onClick={exportMissingKeys}>
              <Download className="h-3.5 w-3.5 mr-2" />
              {t('dev.translations.export', 'تصدير')}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex justify-between items-center bg-amber-50 border border-amber-200 text-amber-700 p-3 rounded-md mb-4 text-sm">
          <div>
            {t('dev.translations.totalMissing', 'إجمالي مفاتيح الترجمة المفقودة: {{count}}', { count: stats.totalCount })}
          </div>
          <div className="text-xs text-amber-600">
            {stats.lastUpdated && (
              <span>
                {t('dev.translations.lastUpdated', 'آخر تحديث')}: {new Date(stats.lastUpdated).toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2 items-center">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder={t('dev.translations.search', 'بحث في المفاتيح...')} 
                className="pl-8 w-[200px] h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={sortOrder} onValueChange={(v) => setSortOrder(v as "asc" | "desc")}>
              <SelectTrigger className="w-[100px] h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">{t('common.sortAsc', 'تصاعدي')}</SelectItem>
                <SelectItem value="desc">{t('common.sortDesc', 'تنازلي')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2">
            {selectedKeys.length > 0 && (
              <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                {t('dev.translations.selected', 'محدد')}: {selectedKeys.length}
              </Badge>
            )}
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 flex flex-wrap">
            {availableLanguages.map(lang => (
              <TabsTrigger key={lang} value={lang} disabled={!missingKeys[lang]?.length}>
                {lang} {missingKeys[lang]?.length ? `(${missingKeys[lang].length})` : ''}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {availableLanguages.map(lang => {
            const filteredKeys = getFilteredAndSortedKeys(lang);
            const allSelected = areAllKeysSelected(filteredKeys);
            
            return (
              <TabsContent key={lang} value={lang} className="p-0">
                {filteredKeys.length > 0 ? (
                  <div className="border rounded-md overflow-hidden">
                    <div className="bg-muted p-2 flex justify-between items-center border-b">
                      <div className="text-xs font-medium">
                        {t('dev.translations.missingKeys', 'المفاتيح المفقودة')} ({filteredKeys.length})
                        {searchQuery && (
                          <span className="ms-2 text-muted-foreground">
                            {t('dev.translations.filtered', 'تمت التصفية من {{total}}', { total: missingKeys[lang]?.length || 0 })}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 px-2 text-xs"
                          onClick={() => toggleAllKeys(filteredKeys)}
                        >
                          {allSelected ? (
                            <>{t('common.deselectAll', 'إلغاء تحديد الكل')}</>
                          ) : (
                            <>{t('common.selectAll', 'تحديد الكل')}</>
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <ScrollArea className="max-h-[300px]">
                      <ul className="divide-y">
                        {filteredKeys.map((key, index) => (
                          <li 
                            key={index} 
                            className={`p-2 text-sm hover:bg-muted/50 flex justify-between items-center ${
                              selectedKeys.includes(key) ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                            }`}
                            onClick={() => toggleKeySelection(key)}
                          >
                            <code className="bg-muted/40 px-1 py-0.5 rounded flex-1 cursor-pointer">{key}</code>
                            <div className="flex items-center">
                              {selectedKeys.includes(key) && (
                                <Check className="h-4 w-4 text-blue-500 ml-2" />
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </ScrollArea>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-muted-foreground">
                    <RefreshCw className="h-10 w-10 mb-2 opacity-20" />
                    <p>
                      {searchQuery
                        ? t('dev.translations.noMatchingKeys', 'لا توجد مفاتيح مطابقة لبحثك')
                        : t('dev.translations.noMissingKeys', 'لا توجد مفاتيح مفقودة لهذه اللغة')
                      }
                    </p>
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
      
      {stats.totalCount > 0 && (
        <CardFooter className="flex flex-col border-t pt-4">
          <div className="w-full space-y-2">
            <div className="text-xs font-medium mb-1">
              {t('dev.translations.distributionByLanguage', 'توزيع المفاتيح المفقودة حسب اللغة')}
            </div>
            {Object.entries(stats.languageCounts)
              .sort(([, a], [, b]) => b - a)
              .map(([lang, count]) => (
                <div key={lang} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>{lang}</span>
                    <span>{count} ({Math.round((count / stats.totalCount) * 100)}%)</span>
                  </div>
                  <Progress value={(count / stats.totalCount) * 100} className="h-1" />
                </div>
              ))
            }
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
