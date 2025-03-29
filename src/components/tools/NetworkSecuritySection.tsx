
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { SecurityChecker } from "./network/SecurityChecker";
import { ArabicTextEnhancer } from '../text/ArabicTextEnhancer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, ShieldAlert, ShieldCheck, Lock } from 'lucide-react';

/**
 * قسم أدوات أمان الشبكة
 */
export function NetworkSecuritySection() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("security-scan");
  
  return (
    <Card className="shadow-md border-blue-100 dark:border-blue-900">
      <CardHeader className="pb-3">
        <CardTitle>
          <div className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-blue-500" />
            <ArabicTextEnhancer>
              {t('securityTools.title', 'أدوات أمان الشبكة')}
            </ArabicTextEnhancer>
          </div>
        </CardTitle>
        <CardDescription>
          <ArabicTextEnhancer>
            {t('securityTools.description', 'أدوات لتحليل وتحسين الأمان عبر الشبكة')}
          </ArabicTextEnhancer>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 gap-0.5">
            <TabsTrigger value="security-scan" className="flex items-center">
              <ShieldCheck className="h-4 w-4 mr-2" />
              <ArabicTextEnhancer>{t('securityTools.securityScan', 'فحص الأمان')}</ArabicTextEnhancer>
            </TabsTrigger>
            <TabsTrigger value="vulnerability" className="flex items-center">
              <ShieldAlert className="h-4 w-4 mr-2" />
              <ArabicTextEnhancer>{t('securityTools.vulnerabilityScan', 'فحص الثغرات')}</ArabicTextEnhancer>
            </TabsTrigger>
            <TabsTrigger value="encryption" className="flex items-center">
              <Lock className="h-4 w-4 mr-2" />
              <ArabicTextEnhancer>{t('securityTools.encryption', 'التشفير')}</ArabicTextEnhancer>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="security-scan" className="space-y-4">
            <SecurityChecker />
          </TabsContent>
          
          <TabsContent value="vulnerability" className="space-y-4">
            <div className="bg-muted/30 p-6 rounded-lg text-center">
              <ShieldAlert className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="text-lg font-medium mt-4">
                <ArabicTextEnhancer>{t('securityTools.comingSoon', 'قريبًا')}</ArabicTextEnhancer>
              </h3>
              <p className="text-muted-foreground mt-2">
                <ArabicTextEnhancer>
                  {t('securityTools.vulnerabilityScanDesc', 'أداة فحص الثغرات قيد التطوير وستكون متاحة قريبًا.')}
                </ArabicTextEnhancer>
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="encryption" className="space-y-4">
            <div className="bg-muted/30 p-6 rounded-lg text-center">
              <Lock className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="text-lg font-medium mt-4">
                <ArabicTextEnhancer>{t('securityTools.comingSoon', 'قريبًا')}</ArabicTextEnhancer>
              </h3>
              <p className="text-muted-foreground mt-2">
                <ArabicTextEnhancer>
                  {t('securityTools.encryptionDesc', 'أدوات التشفير قيد التطوير وستكون متاحة قريبًا.')}
                </ArabicTextEnhancer>
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
