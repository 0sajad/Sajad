
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { ArabicTextEnhancer } from '../text/ArabicTextEnhancer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wrench, FileText, Upload, Download } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';

/**
 * قسم الأدوات المتنوعة
 */
export function UtilityToolsSection() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("converter");
  const [fileUploaded, setFileUploaded] = useState(false);
  
  // محاكاة عملية التحويل
  const handleConvert = () => {
    setTimeout(() => {
      setFileUploaded(true);
    }, 1500);
  };
  
  return (
    <Card className="shadow-md border-blue-100 dark:border-blue-900">
      <CardHeader className="pb-3">
        <CardTitle>
          <div className="flex items-center">
            <Wrench className="h-5 w-5 mr-2 text-green-500" />
            <ArabicTextEnhancer>
              {t('utilities.title', 'أدوات متنوعة')}
            </ArabicTextEnhancer>
          </div>
        </CardTitle>
        <CardDescription>
          <ArabicTextEnhancer>
            {t('utilities.description', 'مجموعة من الأدوات المساعدة المتنوعة')}
          </ArabicTextEnhancer>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 gap-0.5">
            <TabsTrigger value="converter" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              <ArabicTextEnhancer>{t('utilities.fileConverter', 'محول الملفات')}</ArabicTextEnhancer>
            </TabsTrigger>
            <TabsTrigger value="backup" className="flex items-center">
              <Download className="h-4 w-4 mr-2" />
              <ArabicTextEnhancer>{t('utilities.backup', 'النسخ الاحتياطي')}</ArabicTextEnhancer>
            </TabsTrigger>
            <TabsTrigger value="import" className="flex items-center">
              <Upload className="h-4 w-4 mr-2" />
              <ArabicTextEnhancer>{t('utilities.import', 'استيراد')}</ArabicTextEnhancer>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="converter" className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="source-format">
                  <ArabicTextEnhancer>{t('utilities.sourceFormat', 'صيغة المصدر')}</ArabicTextEnhancer>
                </Label>
                <select 
                  id="source-format"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="csv">CSV</option>
                  <option value="json">JSON</option>
                  <option value="xml">XML</option>
                  <option value="pcap">PCAP</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="target-format">
                  <ArabicTextEnhancer>{t('utilities.targetFormat', 'صيغة الهدف')}</ArabicTextEnhancer>
                </Label>
                <select 
                  id="target-format"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="json">JSON</option>
                  <option value="csv">CSV</option>
                  <option value="xml">XML</option>
                  <option value="pdf">PDF</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="file-input">
                  <ArabicTextEnhancer>{t('utilities.selectFile', 'اختر الملف')}</ArabicTextEnhancer>
                </Label>
                <Input id="file-input" type="file" />
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleConvert}>
                  <FileText className="h-4 w-4 mr-2" />
                  <ArabicTextEnhancer>{t('utilities.convertFile', 'تحويل الملف')}</ArabicTextEnhancer>
                </Button>
              </div>
              
              {fileUploaded && (
                <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                  <AlertDescription className="text-green-700 dark:text-green-300">
                    <ArabicTextEnhancer>
                      {t('utilities.fileConverted', 'تم تحويل الملف بنجاح. يمكنك تنزيله الآن.')}
                    </ArabicTextEnhancer>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="backup" className="space-y-4">
            <div className="bg-muted/30 p-6 rounded-lg space-y-4">
              <h3 className="text-lg font-medium">
                <ArabicTextEnhancer>{t('utilities.createBackup', 'إنشاء نسخة احتياطية')}</ArabicTextEnhancer>
              </h3>
              
              <p className="text-muted-foreground">
                <ArabicTextEnhancer>
                  {t('utilities.backupDesc', 'إنشاء نسخة احتياطية من إعدادات الشبكة والسجلات والبيانات الأخرى.')}
                </ArabicTextEnhancer>
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <label className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer">
                  <input type="checkbox" className="h-4 w-4 rounded" defaultChecked />
                  <span><ArabicTextEnhancer>{t('utilities.includeSettings', 'تضمين الإعدادات')}</ArabicTextEnhancer></span>
                </label>
                
                <label className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer">
                  <input type="checkbox" className="h-4 w-4 rounded" defaultChecked />
                  <span><ArabicTextEnhancer>{t('utilities.includeLogs', 'تضمين السجلات')}</ArabicTextEnhancer></span>
                </label>
                
                <label className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer">
                  <input type="checkbox" className="h-4 w-4 rounded" defaultChecked />
                  <span><ArabicTextEnhancer>{t('utilities.includeResults', 'تضمين النتائج')}</ArabicTextEnhancer></span>
                </label>
                
                <label className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer">
                  <input type="checkbox" className="h-4 w-4 rounded" />
                  <span><ArabicTextEnhancer>{t('utilities.encryptBackup', 'تشفير النسخة الاحتياطية')}</ArabicTextEnhancer></span>
                </label>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  <ArabicTextEnhancer>{t('utilities.createBackupButton', 'إنشاء نسخة احتياطية')}</ArabicTextEnhancer>
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="import" className="space-y-4">
            <div className="bg-muted/30 p-6 rounded-lg space-y-4">
              <h3 className="text-lg font-medium">
                <ArabicTextEnhancer>{t('utilities.importData', 'استيراد البيانات')}</ArabicTextEnhancer>
              </h3>
              
              <p className="text-muted-foreground">
                <ArabicTextEnhancer>
                  {t('utilities.importDesc', 'استيراد بيانات من ملف محفوظ أو نسخة احتياطية سابقة.')}
                </ArabicTextEnhancer>
              </p>
              
              <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                <div className="mt-4">
                  <ArabicTextEnhancer>
                    {t('utilities.dragAndDrop', 'اسحب الملفات وأفلتها هنا أو')}
                  </ArabicTextEnhancer>
                  <Input
                    type="file"
                    className="hidden"
                    id="import-file"
                  />
                  <label
                    htmlFor="import-file"
                    className="mx-1 text-primary hover:underline cursor-pointer"
                  >
                    <ArabicTextEnhancer>{t('utilities.browseFiles', 'تصفح الملفات')}</ArabicTextEnhancer>
                  </label>
                </div>
              </div>
              
              <Alert className="mt-4">
                <AlertDescription>
                  <ArabicTextEnhancer>
                    {t('utilities.importWarning', 'تحذير: استيراد البيانات قد يؤدي إلى استبدال الإعدادات والبيانات الحالية.')}
                  </ArabicTextEnhancer>
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
