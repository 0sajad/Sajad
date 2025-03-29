
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { ArabicTextEnhancer } from '../text/ArabicTextEnhancer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BrainCircuit, BarChart3, Share2, Search } from 'lucide-react';
import { AIAssistantMain } from '../ai/AIAssistantMain';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';

/**
 * قسم أدوات الذكاء الاصطناعي
 */
export function AIToolsSection() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("assistant");
  
  return (
    <Card className="shadow-md border-blue-100 dark:border-blue-900">
      <CardHeader className="pb-3">
        <CardTitle>
          <div className="flex items-center">
            <BrainCircuit className="h-5 w-5 mr-2 text-purple-500" />
            <ArabicTextEnhancer>
              {t('aiTools.title', 'أدوات الذكاء الاصطناعي')}
            </ArabicTextEnhancer>
          </div>
        </CardTitle>
        <CardDescription>
          <ArabicTextEnhancer>
            {t('aiTools.description', 'أدوات ذكاء اصطناعي لتحليل وتحسين الشبكة')}
          </ArabicTextEnhancer>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 gap-0.5">
            <TabsTrigger value="assistant" className="flex items-center">
              <BrainCircuit className="h-4 w-4 mr-2" />
              <ArabicTextEnhancer>{t('aiTools.assistant', 'المساعد الذكي')}</ArabicTextEnhancer>
            </TabsTrigger>
            <TabsTrigger value="analyzer" className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              <ArabicTextEnhancer>{t('aiTools.analyzer', 'تحليل الشبكة')}</ArabicTextEnhancer>
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center">
              <Search className="h-4 w-4 mr-2" />
              <ArabicTextEnhancer>{t('aiTools.search', 'البحث الذكي')}</ArabicTextEnhancer>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="assistant" className="space-y-4 min-h-[400px]">
            <AIAssistantMain />
          </TabsContent>
          
          <TabsContent value="analyzer" className="space-y-4">
            <div className="bg-muted/30 p-6 rounded-lg">
              <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="text-lg font-medium mt-4 text-center">
                <ArabicTextEnhancer>{t('aiTools.networkAnalyzer', 'محلل الشبكة الذكي')}</ArabicTextEnhancer>
              </h3>
              <p className="text-muted-foreground mt-2 text-center">
                <ArabicTextEnhancer>
                  {t('aiTools.networkAnalyzerDesc', 'هذه الأداة تستخدم الذكاء الاصطناعي لتحليل حركة الشبكة وتحديد المشاكل والحلول المحتملة.')}
                </ArabicTextEnhancer>
              </p>
              
              <Alert className="mt-6">
                <AlertDescription>
                  <ArabicTextEnhancer>
                    {t('aiTools.betaFeature', 'هذه الميزة في المرحلة التجريبية وقد لا تعمل بشكل كامل.')}
                  </ArabicTextEnhancer>
                </AlertDescription>
              </Alert>
              
              <div className="mt-6 flex justify-center">
                <Button disabled>
                  <Share2 className="h-4 w-4 mr-2" />
                  <ArabicTextEnhancer>{t('aiTools.startAnalysis', 'بدء التحليل')}</ArabicTextEnhancer>
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="search" className="space-y-4">
            <div className="bg-muted/30 p-6 rounded-lg text-center">
              <Search className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="text-lg font-medium mt-4">
                <ArabicTextEnhancer>{t('aiTools.comingSoon', 'قريبًا')}</ArabicTextEnhancer>
              </h3>
              <p className="text-muted-foreground mt-2">
                <ArabicTextEnhancer>
                  {t('aiTools.searchDesc', 'أداة البحث الذكي قيد التطوير وستكون متاحة قريبًا.')}
                </ArabicTextEnhancer>
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
