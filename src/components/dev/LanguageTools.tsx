
import React from "react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Globe, ArrowDownToLine, Plus, Trash } from "lucide-react";

export function LanguageTools() {
  const { t, i18n } = useTranslation();
  
  // قائمة اللغات المتاحة ودعمها الحالي
  const languages = [
    { code: "ar", name: "العربية", nativeName: "العربية", supported: true },
    { code: "ar-iq", name: "Iraqi Arabic", nativeName: "العراقية", supported: true },
    { code: "en", name: "English", nativeName: "English", supported: true },
    { code: "fr", name: "French", nativeName: "Français", supported: true },
    { code: "ja", name: "Japanese", nativeName: "日本語", supported: true },
    { code: "zh", name: "Chinese", nativeName: "中文", supported: true },
    { code: "es", name: "Spanish", nativeName: "Español", supported: false },
    { code: "de", name: "German", nativeName: "Deutsch", supported: false },
    { code: "it", name: "Italian", nativeName: "Italiano", supported: false },
    { code: "pt", name: "Portuguese", nativeName: "Português", supported: false },
    { code: "ru", name: "Russian", nativeName: "Русский", supported: false },
  ];
  
  const toggleLanguageSupport = (code: string) => {
    // هنا يمكن تنفيذ المنطق لتفعيل/تعطيل دعم اللغة
    console.log(`Toggle support for ${code}`);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg font-tajawal">
            {t('developer.language.supported.title', 'إدارة اللغات المدعومة')}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <ScrollArea className="h-72 pr-4">
            <div className="space-y-1">
              {languages.map((lang) => (
                <div
                  key={lang.code}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Checkbox
                      id={`lang-${lang.code}`}
                      checked={lang.supported}
                      onCheckedChange={() => toggleLanguageSupport(lang.code)}
                    />
                    <div className="grid gap-0.5">
                      <Label
                        htmlFor={`lang-${lang.code}`}
                        className="font-tajawal cursor-pointer"
                      >
                        {lang.nativeName} ({lang.name})
                      </Label>
                      <div className="text-xs text-muted-foreground">
                        {lang.code}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    {lang.supported && (
                      <Badge variant={lang.code === i18n.language ? "default" : "outline"} className="ml-2">
                        {lang.code === i18n.language 
                          ? t('developer.language.supported.active', 'نشط') 
                          : t('developer.language.supported.enabled', 'مفعل')}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <Separator className="my-4" />
          
          <div className="flex justify-between">
            <Button variant="outline" size="sm" className="text-blue-600">
              <Globe className="h-4 w-4 mr-2" />
              <span className="font-tajawal">
                {t('developer.language.supported.downloadLanguage', 'تحميل لغة جديدة')}
              </span>
            </Button>
            
            <Button variant="outline" size="sm" className="text-green-600">
              <Plus className="h-4 w-4 mr-2" />
              <span className="font-tajawal">
                {t('developer.language.supported.addCustom', 'إضافة لغة مخصصة')}
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg font-tajawal">
            {t('developer.language.strings.title', 'تعديل النصوص')}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            <div className="flex justify-between">
              <Label className="font-tajawal">
                {t('developer.language.strings.language', 'اللغة')}
              </Label>
              <Select
                value={i18n.language}
                onValueChange={(lng) => i18n.changeLanguage(lng)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t('developer.language.strings.select', 'اختر اللغة')} />
                </SelectTrigger>
                <SelectContent>
                  {languages
                    .filter(lang => lang.supported)
                    .map(lang => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.nativeName}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="font-tajawal">
                {t('developer.language.strings.namespaces', 'مجموعات النصوص')}
              </Label>
              <Select defaultValue="common">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('developer.language.strings.selectNamespace', 'اختر مجموعة')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="common">
                    {t('developer.language.strings.commonNS', 'النصوص العامة')}
                  </SelectItem>
                  <SelectItem value="settings">
                    {t('developer.language.strings.settingsNS', 'الإعدادات')}
                  </SelectItem>
                  <SelectItem value="license">
                    {t('developer.language.strings.licenseNS', 'التراخيص')}
                  </SelectItem>
                  <SelectItem value="aiFeatures">
                    {t('developer.language.strings.aiFeaturesNS', 'ميزات الذكاء الاصطناعي')}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="border rounded-md p-3 border-dashed">
              <p className="text-sm text-muted-foreground text-center font-tajawal">
                {t('developer.language.strings.editorHint', 'اختر مجموعة نصوص لتعديلها')}
              </p>
            </div>
            
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Button variant="outline" className="flex-1">
                <ArrowDownToLine className="h-4 w-4 mr-2" />
                <span className="font-tajawal">
                  {t('developer.language.strings.export', 'تصدير')}
                </span>
              </Button>
              <Button variant="outline" className="flex-1 text-red-600">
                <Trash className="h-4 w-4 mr-2" />
                <span className="font-tajawal">
                  {t('developer.language.strings.reset', 'إعادة تعيين')}
                </span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
