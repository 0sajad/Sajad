import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Loader2, Shield, ShieldAlert, ShieldCheck, ShieldX, ExternalLink } from "lucide-react";
import { ArabicTextEnhancer } from '@/components/text/ArabicTextEnhancer';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { useOfflineSupport } from '@/hooks/useOfflineSupport';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

interface SecurityCheckItem {
  id: string;
  name: string;
  status: 'success' | 'warning' | 'error' | 'info' | 'pending';
  message: string;
  details?: string;
  recommendation?: string;
}

/**
 * أداة فحص أمان الشبكة - تفحص إعدادات الأمان للمواقع والخدمات
 */
export function SecurityChecker() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [domain, setDomain] = useState('');
  const [results, setResults] = useState<SecurityCheckItem[]>([]);
  const { isOnline } = useOfflineSupport();
  
  // وظيفة محاكاة لفحص الأمان
  const handleSecurityCheck = async () => {
    if (!domain || !isOnline) {
      return;
    }
    
    setIsLoading(true);
    setProgress(0);
    setResults([]);
    
    try {
      // محاكاة فحوصات الأمان المختلفة
      const securityChecks: SecurityCheckItem[] = [
        {
          id: 'ssl',
          name: t('networkTools.security.ssl', 'شهادة SSL/TLS'),
          status: 'pending',
          message: t('networkTools.security.checking', 'جارِ الفحص...')
        },
        {
          id: 'headers',
          name: t('networkTools.security.headers', 'رؤوس HTTP الأمنية'),
          status: 'pending',
          message: t('networkTools.security.checking', 'جارِ الفحص...')
        },
        {
          id: 'hsts',
          name: t('networkTools.security.hsts', 'HSTS'),
          status: 'pending',
          message: t('networkTools.security.checking', 'جارِ الفحص...')
        },
        {
          id: 'csp',
          name: t('networkTools.security.csp', 'سياسة أمان المحتوى (CSP)'),
          status: 'pending',
          message: t('networkTools.security.checking', 'جارِ الفحص...')
        },
        {
          id: 'xss',
          name: t('networkTools.security.xss', 'حماية XSS'),
          status: 'pending',
          message: t('networkTools.security.checking', 'جارِ الفحص...')
        },
        {
          id: 'ciphers',
          name: t('networkTools.security.ciphers', 'شفرات SSL'),
          status: 'pending',
          message: t('networkTools.security.checking', 'جارِ الفحص...')
        },
        {
          id: 'mixed',
          name: t('networkTools.security.mixed', 'محتوى مختلط'),
          status: 'pending',
          message: t('networkTools.security.checking', 'جارِ الفحص...')
        }
      ];
      
      setResults(securityChecks);
      
      // محاكاة تحديث تدريجي للفحوصات
      for (let i = 0; i < securityChecks.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const check = securityChecks[i];
        const mockResults: Record<string, SecurityCheckItem> = {
          ssl: {
            ...check,
            status: Math.random() > 0.2 ? 'success' : 'error',
            message: Math.random() > 0.2 
              ? t('networkTools.security.validCert', 'شهادة SSL صالحة وموثوقة') 
              : t('networkTools.security.invalidCert', 'شهادة SSL غير صالحة أو منتهية'),
            details: Math.random() > 0.2 
              ? t('networkTools.security.issuedBy', 'مُصدرة بواسطة Let\'s Encrypt، تنتهي في 2024-06-15') 
              : t('networkTools.security.certIssues', 'مشاكل في الشهادة: منتهية الصلاحية أو الخوارزمية ضعيفة'),
            recommendation: Math.random() > 0.2 
              ? undefined 
              : t('networkTools.security.updateCert', 'قم بتحديث شهادة SSL واستخدم TLS 1.3')
          },
          headers: {
            ...check,
            status: Math.random() > 0.5 ? 'success' : 'warning',
            message: Math.random() > 0.5 
              ? t('networkTools.security.secureHeaders', 'رؤوس HTTP آمنة') 
              : t('networkTools.security.missingHeaders', 'بعض رؤوس الأمان مفقودة'),
            details: Math.random() > 0.5 
              ? t('networkTools.security.allHeadersPresent', 'جميع رؤوس الأمان الموصى بها موجودة') 
              : t('networkTools.security.missingHeaderDetails', 'رؤوس مفقودة: X-Content-Type-Options, X-Frame-Options'),
            recommendation: Math.random() > 0.5 
              ? undefined 
              : t('networkTools.security.addHeaders', 'أضف رؤوس الأمان المفقودة في إعدادات الخادم')
          },
          hsts: {
            ...check,
            status: Math.random() > 0.4 ? 'success' : 'warning',
            message: Math.random() > 0.4 
              ? t('networkTools.security.hstsEnabled', 'HSTS مفعل بشكل صحيح') 
              : t('networkTools.security.hstsDisabled', 'HSTS غير مفعل أو غير معد بشكل صحيح'),
            details: Math.random() > 0.4 
              ? t('networkTools.security.hstsDetails', 'max-age=31536000; includeSubDomains; preload') 
              : t('networkTools.security.hstsWarning', 'موقعك أكثر عرضة لهجمات الوسيط'),
            recommendation: Math.random() > 0.4 
              ? undefined 
              : t('networkTools.security.enableHsts', 'قم بتفعيل HSTS مع مدة صلاحية لا تقل عن سنة واحدة')
          },
          csp: {
            ...check,
            status: 'warning',
            message: t('networkTools.security.cspPartial', 'سياسة أمان المحتوى موجودة ولكن غير مكتملة'),
            details: t('networkTools.security.cspDetails', 'يجب تقييد مصادر البرامج النصية والوسائط الأخرى'),
            recommendation: t('networkTools.security.improveCsp', 'حسّن سياسة أمان المحتوى بإضافة قيود أكثر صرامة')
          },
          xss: {
            ...check,
            status: Math.random() > 0.7 ? 'success' : 'warning',
            message: Math.random() > 0.7 
              ? t('networkTools.security.xssProtected', 'الحماية من XSS مفعلة') 
              : t('networkTools.security.xssPartial', 'الحماية من XSS جزئية'),
            details: Math.random() > 0.7 
              ? t('networkTools.security.xssDetails', 'X-XSS-Protection: 1; mode=block') 
              : t('networkTools.security.xssWarning', 'تفعيل جزئي للحماية من XSS'),
            recommendation: Math.random() > 0.7 
              ? undefined 
              : t('networkTools.security.improveXss', 'قم بتحسين الحماية من XSS بإضافة mode=block')
          },
          ciphers: {
            ...check,
            status: Math.random() > 0.6 ? 'success' : 'error',
            message: Math.random() > 0.6 
              ? t('networkTools.security.strongCiphers', 'شفرات SSL قوية') 
              : t('networkTools.security.weakCiphers', 'تم اكتشاف شفرات SSL ضعيفة'),
            details: Math.random() > 0.6 
              ? t('networkTools.security.ciphersDetails', 'يستخدم الخادم شفرات SSL/TLS حديثة وقوية') 
              : t('networkTools.security.ciphersWarning', 'تم اكتشاف شفرات ضعيفة مثل RC4 أو TLS 1.0'),
            recommendation: Math.random() > 0.6 
              ? undefined 
              : t('networkTools.security.upgradeCiphers', 'قم بتحديث إعدادات SSL لاستخدام شفرات أقوى وإزالة الدعم للإصدارات القديمة')
          },
          mixed: {
            ...check,
            status: Math.random() > 0.8 ? 'success' : 'error',
            message: Math.random() > 0.8 
              ? t('networkTools.security.noMixedContent', 'لا يوجد محتوى مختلط') 
              : t('networkTools.security.mixedContent', 'تم اكتشاف محتوى مختلط'),
            details: Math.random() > 0.8 
              ? t('networkTools.security.mixedDetails', 'جميع الموارد تُحمل عبر HTTPS') 
              : t('networkTools.security.mixedWarning', 'صفحتك تحتوي على موارد HTTP غير آمنة مدمجة في صفحة HTTPS'),
            recommendation: Math.random() > 0.8 
              ? undefined 
              : t('networkTools.security.fixMixed', 'قم بتحديث جميع مصادر المحتوى لاستخدام HTTPS')
          }
        };
        
        securityChecks[i] = mockResults[check.id];
        setResults([...securityChecks]);
        setProgress(Math.floor(((i + 1) / securityChecks.length) * 100));
      }
    } catch (error) {
      console.error('Security check error:', error);
    } finally {
      setIsLoading(false);
      setProgress(100);
    }
  };
  
  // الحصول على تقييم أمان إجمالي
  const getOverallRating = () => {
    if (results.length === 0) return '';
    
    const finishedResults = results.filter(r => r.status !== 'pending');
    if (finishedResults.length === 0) return '';
    
    const errorCount = finishedResults.filter(r => r.status === 'error').length;
    const warningCount = finishedResults.filter(r => r.status === 'warning').length;
    const successCount = finishedResults.filter(r => r.status === 'success').length;
    
    if (errorCount > 0) {
      return t('networkTools.security.poor', 'ضعيف');
    } else if (warningCount > successCount) {
      return t('networkTools.security.moderate', 'متوسط');
    } else if (warningCount > 0) {
      return t('networkTools.security.good', 'جيد');
    } else {
      return t('networkTools.security.excellent', 'ممتاز');
    }
  };
  
  // إنشاء لون لتقييم الأمان
  const getRatingColor = () => {
    const rating = getOverallRating();
    
    if (rating === t('networkTools.security.excellent', 'ممتاز')) {
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    } else if (rating === t('networkTools.security.good', 'جيد')) {
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    } else if (rating === t('networkTools.security.moderate', 'متوسط')) {
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    } else if (rating === t('networkTools.security.poor', 'ضعيف')) {
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    }
    
    return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="w-full space-y-2">
          <Label htmlFor="domain-input">
            <ArabicTextEnhancer>{t('networkTools.security.domainToCheck', 'النطاق للفحص')}</ArabicTextEnhancer>
          </Label>
          <Input 
            id="domain-input"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="example.com"
            disabled={isLoading}
          />
        </div>
        
        <div className="sm:mt-8">
          <Button 
            onClick={handleSecurityCheck} 
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            variant="default"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <ArabicTextEnhancer>{t('networkTools.security.checking', 'جارِ الفحص...')}</ArabicTextEnhancer>
              </>
            ) : (
              <>
                <Shield className="mr-2 h-4 w-4" />
                <ArabicTextEnhancer>{t('networkTools.security.checkSecurity', 'فحص الأمان')}</ArabicTextEnhancer>
              </>
            )}
          </Button>
        </div>
      </div>
      
      {!isOnline && (
        <Alert variant="destructive">
          <AlertTitle>
            <ArabicTextEnhancer>{t('common.offlineMode', 'وضع عدم الاتصال')}</ArabicTextEnhancer>
          </AlertTitle>
          <AlertDescription>
            <ArabicTextEnhancer>
              {t('networkTools.security.offlineNotice', 'فحص أمان المواقع غير متاح في وضع عدم الاتصال')}
            </ArabicTextEnhancer>
          </AlertDescription>
        </Alert>
      )}
      
      {isLoading && (
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-1" />
              <span className="text-sm">
                <ArabicTextEnhancer>
                  {t('networkTools.security.analyzingSecurity', 'جارِ تحليل أمان')} {domain}
                </ArabicTextEnhancer>
              </span>
            </div>
            <span className="text-sm">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}
      
      {results.length > 0 && progress === 100 && (
        <>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="mr-2">
                {getOverallRating() === t('networkTools.security.excellent', 'ممتاز') && (
                  <ShieldCheck className="h-6 w-6 text-green-500" />
                )}
                {getOverallRating() === t('networkTools.security.good', 'جيد') && (
                  <Shield className="h-6 w-6 text-blue-500" />
                )}
                {getOverallRating() === t('networkTools.security.moderate', 'متوسط') && (
                  <ShieldAlert className="h-6 w-6 text-yellow-500" />
                )}
                {getOverallRating() === t('networkTools.security.poor', 'ضعيف') && (
                  <ShieldX className="h-6 w-6 text-red-500" />
                )}
              </div>
              <div>
                <div className="font-medium">
                  <ArabicTextEnhancer>{t('networkTools.security.overallRating', 'التقييم الإجمالي')}:</ArabicTextEnhancer>
                </div>
                <div className={`text-lg font-bold ${getRatingColor()} px-2 py-0.5 rounded inline-block mt-1`}>
                  <ArabicTextEnhancer>{getOverallRating()}</ArabicTextEnhancer>
                </div>
              </div>
            </div>
            
            <div>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => window.open(`https://observatory.mozilla.org/analyze/${domain}`, '_blank')}
              >
                <ArabicTextEnhancer>{t('networkTools.security.fullReport', 'تقرير كامل')}</ArabicTextEnhancer>
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-4">
              <div className="space-y-5">
                {results.map((check, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">
                        {check.name}
                      </div>
                      <Badge 
                        variant={
                          check.status === 'success' ? 'success' :
                          check.status === 'warning' ? 'warning' :
                          check.status === 'error' ? 'destructive' :
                          check.status === 'pending' ? 'outline' : 'secondary'
                        }
                        className="ml-2"
                      >
                        {check.status === 'success' && (
                          <ShieldCheck className="h-3 w-3 mr-1" />
                        )}
                        {check.status === 'warning' && (
                          <ShieldAlert className="h-3 w-3 mr-1" />
                        )}
                        {check.status === 'error' && (
                          <ShieldX className="h-3 w-3 mr-1" />
                        )}
                        {check.status === 'pending' && (
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        )}
                        <ArabicTextEnhancer>
                          {check.status === 'success' ? t('common.secure', 'آمن') :
                           check.status === 'warning' ? t('common.warning', 'تحذير') :
                           check.status === 'error' ? t('common.insecure', 'غير آمن') :
                           check.status === 'pending' ? t('common.checking', 'جارِ الفحص') :
                           t('common.info', 'معلومات')}
                        </ArabicTextEnhancer>
                      </Badge>
                    </div>
                    <div className="text-sm mt-2">
                      <ArabicTextEnhancer>{check.message}</ArabicTextEnhancer>
                    </div>
                    {check.details && (
                      <div className="text-xs text-muted-foreground mt-1">
                        <ArabicTextEnhancer>{check.details}</ArabicTextEnhancer>
                      </div>
                    )}
                    {check.recommendation && (
                      <div className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 p-2 rounded mt-2">
                        <div className="font-medium">
                          <ArabicTextEnhancer>{t('networkTools.security.recommendation', 'توصية')}:</ArabicTextEnhancer>
                        </div>
                        <ArabicTextEnhancer>{check.recommendation}</ArabicTextEnhancer>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
