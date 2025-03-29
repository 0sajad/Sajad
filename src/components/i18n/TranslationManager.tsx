
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { 
  getMissingTranslationDetector, 
  initMissingTranslationDetector 
} from '@/utils/i18n/MissingTranslationDetector';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Download, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAppState } from '@/hooks/state/use-app-state';

interface LanguageCompletionProps {
  sourceLanguage: string;
  targetLanguage: string;
  onRefresh: () => void;
}

/**
 * عرض اكتمال الترجمة بين لغتين
 */
const LanguageCompletion: React.FC<LanguageCompletionProps> = ({
  sourceLanguage,
  targetLanguage,
  onRefresh
}) => {
  const [comparison, setComparison] = useState<{
    missingInTarget: string[];
    missingInSource: string[];
    completionPercentage: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    compareLanguages();
  }, [sourceLanguage, targetLanguage]);

  const compareLanguages = () => {
    try {
      const detector = getMissingTranslationDetector();
      if (!detector) {
        setError('Translation detector not initialized');
        return;
      }

      const result = detector.compareLanguages(sourceLanguage, targetLanguage);
      setComparison(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setComparison(null);
    }
  };

  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!comparison) {
    return <div>Loading comparison...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground mb-2">
            Translation Completion: {comparison.completionPercentage}%
          </div>
          <Progress value={comparison.completionPercentage} className="w-full" />
        </div>
        <Button size="sm" variant="outline" onClick={onRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {comparison.missingInTarget.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-2">
            Missing in {targetLanguage} ({comparison.missingInTarget.length} keys):
          </h4>
          <div className="bg-muted rounded-md p-2 max-h-40 overflow-y-auto text-xs">
            {comparison.missingInTarget.map(key => (
              <div key={key} className="py-1 border-b border-border last:border-0">
                {key}
              </div>
            ))}
          </div>
        </div>
      )}

      {comparison.missingInSource.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-2">
            Keys in {targetLanguage} but not in {sourceLanguage} ({comparison.missingInSource.length} keys):
          </h4>
          <div className="bg-muted rounded-md p-2 max-h-40 overflow-y-auto text-xs">
            {comparison.missingInSource.map(key => (
              <div key={key} className="py-1 border-b border-border last:border-0">
                {key}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * مدير الترجمات ومراقبة المفاتيح المفقودة
 */
export function TranslationManager() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('missing');
  const [sourceLanguage, setSourceLanguage] = useState<string>('en');
  const [targetLanguage, setTargetLanguage] = useState<string>('ar');
  const [isDetectorEnabled, setIsDetectorEnabled] = useState<boolean>(false);
  const [missingKeys, setMissingKeys] = useState<Record<string, string[]>>({});
  const isDeveloperMode = useAppState(state => state.preferences.developerMode);

  useEffect(() => {
    // تهيئة كاشف المفاتيح المفقودة
    if (isDeveloperMode) {
      const detector = initMissingTranslationDetector(i18n);
      
      if (isDetectorEnabled) {
        detector.enable();
      } else {
        detector.disable();
      }
      
      // تحديث المفاتيح المفقودة عند تغيير اللغة
      updateMissingKeys();
    }
    
    return () => {
      // إيقاف الكاشف عند تفكيك المكون
      const detector = getMissingTranslationDetector();
      if (detector) {
        detector.disable();
      }
    };
  }, [i18n, isDetectorEnabled, isDeveloperMode]);

  // تحديث قائمة المفاتيح المفقودة
  const updateMissingKeys = () => {
    const detector = getMissingTranslationDetector();
    if (detector) {
      setMissingKeys(detector.getAllMissingKeys());
    }
  };

  // تنزيل المفاتيح المفقودة كملف JSON
  const downloadMissingKeys = () => {
    const detector = getMissingTranslationDetector();
    if (detector) {
      detector.downloadMissingKeys();
    }
  };

  // تبديل حالة الكاشف
  const toggleDetector = () => {
    const newState = !isDetectorEnabled;
    setIsDetectorEnabled(newState);
    
    const detector = getMissingTranslationDetector();
    if (detector) {
      if (newState) {
        detector.enable();
      } else {
        detector.disable();
      }
    }
  };

  // حساب إجمالي المفاتيح المفقودة
  const getTotalMissingKeys = (): number => {
    return Object.values(missingKeys).reduce((total, keys) => {
      return total + keys.length;
    }, 0);
  };

  // الحصول على قائمة اللغات المتاحة
  const getAvailableLanguages = (): string[] => {
    const resources = i18n.options.resources || {};
    return Object.keys(resources);
  };

  const languages = getAvailableLanguages();
  const totalMissingKeys = getTotalMissingKeys();

  if (!isDeveloperMode) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t('translation.manager', 'Translation Manager')}</CardTitle>
          <CardDescription>
            {t('translation.developerMode', 'This feature is only available in developer mode')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{t('common.restricted', 'Restricted Access')}</AlertTitle>
            <AlertDescription>
              {t('translation.enableDevMode', 'Enable developer mode in settings to access translation management tools')}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('translation.manager', 'Translation Manager')}</CardTitle>
        <CardDescription>
          {t('translation.description', 'Manage and monitor translation keys across languages')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="missing">
              {t('translation.missingKeys', 'Missing Keys')}
              {totalMissingKeys > 0 && (
                <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                  {totalMissingKeys}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="compare">{t('translation.compareLanguages', 'Compare Languages')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="missing" className="space-y-4">
            <div className="flex justify-between items-center">
              <Button 
                variant={isDetectorEnabled ? "default" : "outline"} 
                size="sm" 
                onClick={toggleDetector}
              >
                {isDetectorEnabled 
                  ? t('translation.detectorEnabled', 'Detector Enabled') 
                  : t('translation.enableDetector', 'Enable Detector')}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={downloadMissingKeys} 
                disabled={totalMissingKeys === 0}
              >
                <Download className="h-4 w-4 mr-2" />
                {t('translation.download', 'Download')}
              </Button>
            </div>
            
            {Object.keys(missingKeys).length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                {isDetectorEnabled 
                  ? t('translation.noMissingKeys', 'No missing keys detected yet. Try navigating the app.') 
                  : t('translation.enableToDetect', 'Enable the detector to start tracking missing keys.')}
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(missingKeys).map(([language, keys]) => (
                  <div key={language} className="border rounded-md p-4">
                    <h3 className="text-lg font-medium mb-2">
                      {language} ({keys.length} {t('translation.keys', 'keys')})
                    </h3>
                    <div className="bg-muted p-2 rounded-md max-h-60 overflow-y-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>{t('translation.key', 'Key')}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {keys.map(key => (
                            <TableRow key={key}>
                              <TableCell className="font-mono text-xs">{key}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="compare" className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {t('translation.sourceLanguage', 'Source Language')}:
                </label>
                <select 
                  value={sourceLanguage}
                  onChange={(e) => setSourceLanguage(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {t('translation.targetLanguage', 'Target Language')}:
                </label>
                <select 
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {sourceLanguage === targetLanguage ? (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{t('translation.sameLanguage', 'Same Language')}</AlertTitle>
                <AlertDescription>
                  {t('translation.selectDifferent', 'Please select different languages to compare')}
                </AlertDescription>
              </Alert>
            ) : (
              <LanguageCompletion 
                sourceLanguage={sourceLanguage}
                targetLanguage={targetLanguage}
                onRefresh={() => setActiveTab('compare')}
              />
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        {t('translation.stats', 'Translation Statistics: {{totalLanguages}} languages, {{totalMissingKeys}} missing keys detected', {
          totalLanguages: languages.length,
          totalMissingKeys: totalMissingKeys
        })}
      </CardFooter>
    </Card>
  );
}
