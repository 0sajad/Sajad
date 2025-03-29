
import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslationMetrics } from "@/hooks/i18n/useTranslationMetrics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

/**
 * مدير الترجمات - يُستخدم في لوحة تحكم المطور لإدارة وتتبع الترجمات
 */
export function TranslationManager() {
  const { t, i18n } = useTranslation();
  const metrics = useTranslationMetrics();
  const [activeTab, setActiveTab] = useState("missing");
  const [filter, setFilter] = useState("");
  const [copiedMessage, setCopiedMessage] = useState("");
  
  // تحويل مجموعة المفاتيح المفقودة إلى مصفوفة
  const missingKeys = useMemo(() => {
    if (!metrics || !metrics.missingKeys) return [];
    return Array.from(metrics.missingKeys || []);
  }, [metrics]);

  // تحويل مجموعة جميع المفاتيح المستخدمة إلى مصفوفة
  const allKeys = useMemo(() => {
    const keys = new Set<string>();
    if (metrics && metrics.keysByLanguage) {
      Object.values(metrics.keysByLanguage).forEach(langKeys => {
        langKeys.forEach(key => keys.add(key));
      });
    }
    return Array.from(keys);
  }, [metrics]);
  
  // إنشاء قائمة بالمفاتيح الأكثر استخدامًا
  const mostUsedKeys = useMemo(() => {
    return (metrics?.topUsedKeys || []).slice(0, 20);
  }, [metrics]);
  
  // تصفية المفاتيح حسب فلتر البحث
  const filteredKeys = useMemo(() => {
    if (!filter) return activeTab === "missing" ? missingKeys : allKeys;
    
    const searchLower = filter.toLowerCase();
    const keys = activeTab === "missing" ? missingKeys : allKeys;
    
    return keys.filter(key => key.toLowerCase().includes(searchLower));
  }, [filter, activeTab, missingKeys, allKeys]);
  
  // نسخ مفاتيح مفقودة إلى الحافظة
  const copyMissingKeys = () => {
    const keysObject: Record<string, string> = {};
    missingKeys.forEach(key => {
      keysObject[key] = "";
    });
    
    const jsonContent = JSON.stringify(keysObject, null, 2);
    navigator.clipboard.writeText(jsonContent)
      .then(() => {
        setCopiedMessage("تم نسخ المفاتيح المفقودة");
        toast.success("تم نسخ المفاتيح المفقودة إلى الحافظة");
        setTimeout(() => setCopiedMessage(""), 3000);
      })
      .catch(err => {
        toast.error("فشل نسخ المفاتيح: " + err.message);
      });
  };
  
  // توليد مفتاح تعريف فريد للون الشارة
  const getBadgeColor = (key: string) => {
    if (key.includes("error")) return "destructive";
    if (key.includes("success")) return "success";
    if (key.includes("warning")) return "warning";
    if (key.includes("info")) return "info";
    if (key.includes("accessibility")) return "purple";
    return "secondary";
  };
  
  // جلب الترجمة الحالية للمفتاح إذا كانت متوفرة
  const getKeyTranslation = (key: string) => {
    try {
      return i18n.exists(key) ? t(key) : "";
    } catch (e) {
      return "";
    }
  };
  
  // استخراج namespace من المفتاح
  const getNamespace = (key: string) => {
    const parts = key.split('.');
    return parts.length > 1 ? parts[0] : 'common';
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>
            {t('developer.translationManager.title', 'مدير الترجمات')}
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline">
              {t('developer.translationManager.totalLookups', 'عدد البحث')}: {metrics?.totalLookups || 0}
            </Badge>
            <Badge variant="outline">
              {t('developer.translationManager.uniqueKeys', 'مفاتيح فريدة')}: {metrics?.uniqueKeysCount || 0}
            </Badge>
            <Badge variant="destructive">
              {t('developer.translationManager.missingKeys', 'مفاتيح مفقودة')}: {missingKeys.length || 0}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="missing">
                {t('developer.translationManager.missingKeys', 'المفاتيح المفقودة')}
              </TabsTrigger>
              <TabsTrigger value="all">
                {t('developer.translationManager.allKeys', 'جميع المفاتيح')}
              </TabsTrigger>
              <TabsTrigger value="mostUsed">
                {t('developer.translationManager.mostUsed', 'الأكثر استخدامًا')}
              </TabsTrigger>
            </TabsList>
            
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('developer.translationManager.search', 'بحث...')}
                className="pl-8"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
          </div>
          
          <TabsContent value="missing" className="mt-0">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium">
                {t('developer.translationManager.missingKeysDescription', 'المفاتيح المفقودة في الترجمة الحالية')}
              </h4>
              
              {missingKeys.length > 0 && (
                <Button variant="outline" size="sm" onClick={copyMissingKeys}>
                  {copiedMessage || t('developer.translationManager.copyToClipboard', 'نسخ إلى الحافظة')}
                </Button>
              )}
            </div>
            
            <ScrollArea className="h-[400px] border rounded-md">
              {filteredKeys.length > 0 ? (
                <div className="p-4 space-y-3">
                  {filteredKeys.map(key => (
                    <div key={key} className="flex flex-col gap-1 pb-2 border-b">
                      <div className="flex items-center gap-2">
                        <Badge variant={getBadgeColor(key)}>
                          {getNamespace(key)}
                        </Badge>
                        <code className="text-sm bg-muted px-1 py-0.5 rounded">
                          {key}
                        </code>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-[400px]">
                  <p className="text-muted-foreground">
                    {filter 
                      ? t('developer.translationManager.noMatchingKeys', 'لا توجد مفاتيح مطابقة') 
                      : t('developer.translationManager.noMissingKeys', 'لا توجد مفاتيح مفقودة! 🎉')}
                  </p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="all" className="mt-0">
            <ScrollArea className="h-[400px] border rounded-md">
              {filteredKeys.length > 0 ? (
                <div className="p-4 space-y-3">
                  {filteredKeys.map(key => (
                    <div key={key} className="flex flex-col gap-1 pb-2 border-b">
                      <div className="flex items-center gap-2">
                        <Badge variant={getBadgeColor(key)}>
                          {getNamespace(key)}
                        </Badge>
                        <code className="text-sm bg-muted px-1 py-0.5 rounded">
                          {key}
                        </code>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">Translated:</span> {getKeyTranslation(key) || <em>No translation</em>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-[400px]">
                  <p className="text-muted-foreground">
                    {filter 
                      ? t('developer.translationManager.noMatchingKeys', 'لا توجد مفاتيح مطابقة') 
                      : t('developer.translationManager.noKeysTracked', 'لم يتم تتبع أي مفاتيح بعد')}
                  </p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="mostUsed" className="mt-0">
            <ScrollArea className="h-[400px] border rounded-md">
              {mostUsedKeys.length > 0 ? (
                <div className="p-4 space-y-3">
                  {mostUsedKeys.map(({ key, count }) => (
                    <div key={key} className="flex flex-col gap-1 pb-2 border-b">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant={getBadgeColor(key)}>
                            {getNamespace(key)}
                          </Badge>
                          <code className="text-sm bg-muted px-1 py-0.5 rounded">
                            {key}
                          </code>
                        </div>
                        <Badge variant="outline">{count} {count === 1 ? 'use' : 'uses'}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">Translated:</span> {getKeyTranslation(key) || <em>No translation</em>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-[400px]">
                  <p className="text-muted-foreground">
                    {t('developer.translationManager.noKeysTracked', 'لم يتم تتبع أي مفاتيح بعد')}
                  </p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

export default TranslationManager;
