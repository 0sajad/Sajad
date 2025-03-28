
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Globe, ArrowDownToLine, Plus, Trash, Save, Brain, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function LanguageTools() {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [activeNamespace, setActiveNamespace] = useState("common");
  const [editMode, setEditMode] = useState(false);
  const [aiAssistMode, setAIAssistMode] = useState(false);
  const [aiPrompt, setAIPrompt] = useState("");
  const [translationKey, setTranslationKey] = useState("");
  const [translationValue, setTranslationValue] = useState("");
  
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

  const namespaces = [
    { value: "common", label: "Common" },
    { value: "dashboard", label: "Dashboard" },
    { value: "settings", label: "Settings" },
    { value: "ai", label: "AI Assistant" },
    { value: "networkTools", label: "Network Tools" },
    { value: "security", label: "Security" },
  ];
  
  const toggleLanguageSupport = (code: string) => {
    toast({
      title: "Language Support Updated",
      description: `Support for ${code} has been toggled.`,
    });
  };

  const addTranslation = () => {
    if (!translationKey || !translationValue) {
      toast({
        title: "Validation Error",
        description: "Please provide both key and value for the translation.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Translation Added",
      description: `Translation for "${translationKey}" has been added.`,
    });

    setTranslationKey("");
    setTranslationValue("");
  };

  const generateWithAI = () => {
    if (!aiPrompt) {
      toast({
        title: "AI Prompt Required",
        description: "Please provide instructions for the AI.",
        variant: "destructive",
      });
      return;
    }

    // Simulate AI generation
    setTimeout(() => {
      toast({
        title: "AI Translation Generated",
        description: "The AI has generated translations based on your prompt.",
      });
      
      setAIPrompt("");
      setAIAssistMode(false);
    }, 1500);
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
        <CardHeader className="bg-muted/50 flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-tajawal">
            {t('developer.language.strings.title', 'تعديل النصوص')}
          </CardTitle>
          
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className={aiAssistMode ? "bg-blue-100" : ""}
              onClick={() => setAIAssistMode(!aiAssistMode)}
            >
              <Brain className="h-4 w-4 mr-2" />
              <span className="font-tajawal">AI Assist</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className={editMode ? "bg-blue-100" : ""}
              onClick={() => setEditMode(!editMode)}
            >
              <Plus className="h-4 w-4 mr-2" />
              <span className="font-tajawal">Add Translation</span>
            </Button>
          </div>
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
              <Select 
                value={activeNamespace}
                onValueChange={setActiveNamespace}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('developer.language.strings.selectNamespace', 'اختر مجموعة')} />
                </SelectTrigger>
                <SelectContent>
                  {namespaces.map(ns => (
                    <SelectItem key={ns.value} value={ns.value}>
                      {ns.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {aiAssistMode ? (
              <div className="space-y-4 border rounded-md p-4">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Sparkles className="h-5 w-5 text-blue-500" />
                  <h4 className="font-medium">AI Translation Assistant</h4>
                </div>
                
                <Textarea
                  placeholder="Describe what translations you need (e.g., 'Generate translations for the dashboard page in all supported languages')"
                  className="min-h-[100px]"
                  value={aiPrompt}
                  onChange={(e) => setAIPrompt(e.target.value)}
                />
                
                <Button onClick={generateWithAI} className="w-full">
                  Generate with AI
                </Button>
              </div>
            ) : editMode ? (
              <div className="space-y-4 border rounded-md p-4">
                <div className="space-y-2">
                  <Label>Translation Key</Label>
                  <Input 
                    placeholder="Enter translation key (e.g., 'dashboard.title')"
                    value={translationKey}
                    onChange={(e) => setTranslationKey(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Translation Value</Label>
                  <Textarea 
                    placeholder="Enter translation text"
                    value={translationValue}
                    onChange={(e) => setTranslationValue(e.target.value)}
                  />
                </div>
                
                <Button onClick={addTranslation} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Add Translation
                </Button>
              </div>
            ) : (
              <div className="border rounded-md p-3 border-dashed">
                <p className="text-sm text-muted-foreground text-center font-tajawal">
                  {t('developer.language.strings.editorHint', 'اختر مجموعة نصوص لتعديلها وانقر على زر التعديل أو مساعدة الذكاء الاصطناعي')}
                </p>
              </div>
            )}
            
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
