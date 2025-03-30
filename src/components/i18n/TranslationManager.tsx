import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle2, Languages, Save } from 'lucide-react';
import { useMissingTranslations } from '@/hooks/useMissingTranslations';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

type Translation = {
  key: string;
  value: string;
};

export function TranslationManager() {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const { missingKeys, totalKeys, loadingStatus } = useMissingTranslations();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editedTranslations, setEditedTranslations] = useState<Record<string, string>>({});
  const [missingOnly, setMissingOnly] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
    { code: 'fr', name: 'Français' },
    { code: 'ja', name: '日本語' },
    { code: 'zh', name: '中文' },
  ];

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const resources = i18n.getResourceBundle(selectedLanguage, 'translation');
        if (resources) {
          const flattenedTranslations: Translation[] = flattenObject(resources);
          setTranslations(flattenedTranslations);
        }
      } catch (error) {
        console.error('Error loading translations:', error);
      }
    };

    loadTranslations();
  }, [selectedLanguage, i18n]);

  const flattenObject = (obj: any, prefix = ''): Translation[] => {
    return Object.keys(obj).reduce((acc: Translation[], key) => {
      const prefixedKey = prefix ? `${prefix}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        return [...acc, ...flattenObject(obj[key], prefixedKey)];
      }
      return [...acc, { key: prefixedKey, value: obj[key] }];
    }, []);
  };

  const filteredTranslations = translations.filter(translation => {
    const matchesSearch = translation.key.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (translation.value && translation.value.toString().toLowerCase().includes(searchTerm.toLowerCase()));
    if (missingOnly) {
      return matchesSearch && (!translation.value || translation.value === '');
    }
    return matchesSearch;
  });

  const handleTranslationChange = (key: string, value: string) => {
    setEditedTranslations(prev => ({ ...prev, [key]: value }));
  };

  const saveTranslations = () => {
    console.log('Saving translations:', editedTranslations);
    toast({
      title: t('settings.translationsUpdated'),
      description: t('settings.translationsUpdatedDesc', { count: Object.keys(editedTranslations).length }),
    });
    setEditedTranslations({});
  };

  const changeLanguage = (langCode: string) => {
    setSelectedLanguage(langCode);
    setEditedTranslations({});
  };

  const completionPercentage = totalKeys > 0 ? ((totalKeys - missingKeys.length) / totalKeys) * 100 : 100;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Languages className="h-5 w-5" />
            {t('settings.translationManager')}
          </CardTitle>
          <Badge variant={completionPercentage >= 90 ? "default" : "secondary"}>
            {completionPercentage.toFixed(0)}% {t('settings.complete')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={selectedLanguage} onValueChange={changeLanguage} className="w-full">
          <TabsList className="mb-4 w-full flex flex-wrap">
            {languages.map(lang => (
              <TabsTrigger key={lang.code} value={lang.code} className="flex-grow">
                {lang.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {languages.map(lang => (
            <TabsContent key={lang.code} value={lang.code} className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {missingKeys.length > 0 ? (
                    <AlertCircle className="h-5 w-5 text-amber-500" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  )}
                  <span>
                    {missingKeys.length > 0
                      ? t('settings.missingKeys', { count: missingKeys.length })
                      : t('settings.allTranslationsComplete')}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setMissingOnly(!missingOnly)}
                  className="text-xs"
                >
                  {missingOnly ? t('settings.showAll') : t('settings.showMissingOnly')}
                </Button>
              </div>
              
              <div className="mb-4">
                <Input
                  placeholder={t('settings.searchTranslations') || ''}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <ScrollArea className="h-[400px] w-full pr-4">
                <div className="space-y-4">
                  {filteredTranslations.map((translation) => (
                    <div key={translation.key} className="space-y-1">
                      <Label className="text-xs font-medium">{translation.key}</Label>
                      <Textarea
                        value={editedTranslations[translation.key] ?? translation.value ?? ''}
                        onChange={(e) => handleTranslationChange(translation.key, e.target.value)}
                        placeholder={t('settings.enterTranslation') || ''}
                        className={!translation.value ? "border-amber-300" : ""}
                        dir={lang.code === 'ar' ? 'rtl' : 'ltr'}
                      />
                    </div>
                  ))}
                  
                  {filteredTranslations.length === 0 && (
                    <div className="py-8 text-center text-muted-foreground">
                      {t('settings.noTranslationsFound')}
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              {Object.keys(editedTranslations).length > 0 && (
                <div className="flex justify-end">
                  <Button onClick={saveTranslations} className="flex items-center gap-1">
                    <Save className="h-4 w-4" />
                    {t('settings.saveTranslations')}
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}

export default TranslationManager;
