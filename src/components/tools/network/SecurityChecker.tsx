
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Shield, ShieldAlert, ShieldCheck, Search, AlertTriangle, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Progress } from '@/components/ui/progress';

// Define valid security status types
type SecurityStatus = "warning" | "secure" | "vulnerable";

export function SecurityChecker() {
  const { t } = useTranslation();
  const [domain, setDomain] = useState('');
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [securityStatus, setSecurityStatus] = useState<SecurityStatus>("warning");
  
  // Simulated security issues for demonstration
  const [securityIssues] = useState([
    {
      type: "ssl",
      severity: "high",
      title: "SSL Certificate Issue",
      description: "Certificate expires in less than 7 days"
    },
    {
      type: "header",
      severity: "medium",
      title: "Missing Security Headers",
      description: "X-Content-Type-Options header not set"
    },
    {
      type: "vulnerability",
      severity: "low",
      title: "Potential Cross-Site Scripting",
      description: "Input validation could be improved in contact form"
    }
  ]);
  
  // Start scan function
  const handleStartScan = () => {
    if (!domain) return;
    
    setScanning(true);
    setScanComplete(false);
    setProgress(0);
    
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setScanning(false);
          setScanComplete(true);
          
          // Simulated result based on domain
          if (domain.includes('secure')) {
            setSecurityStatus("secure");
          } else if (domain.includes('vulnerable')) {
            setSecurityStatus("vulnerable");
          } else {
            setSecurityStatus("warning");
          }
          
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'border-red-200 bg-red-50 text-red-800';
      case 'medium':
        return 'border-amber-200 bg-amber-50 text-amber-800';
      case 'low':
        return 'border-blue-200 bg-blue-50 text-blue-800';
      default:
        return 'border-gray-200 bg-gray-50 text-gray-800';
    }
  };
  
  const getSecurityStatusInfo = () => {
    switch (securityStatus) {
      case "secure":
        return {
          color: "border-green-200 bg-green-50 text-green-800",
          title: t('security.secureTitle', 'آمن'),
          description: t('security.secureDescription', 'لم يتم العثور على مشكلات أمنية كبيرة'),
          icon: <ShieldCheck className="h-5 w-5 text-green-500" />
        };
      case "warning":
        return {
          color: "border-amber-200 bg-amber-50 text-amber-800",
          title: t('security.warningTitle', 'تحذيرات'),
          description: t('security.warningDescription', 'تم العثور على بعض المشكلات الأمنية المحتملة'),
          icon: <AlertTriangle className="h-5 w-5 text-amber-500" />
        };
      case "vulnerable":
        return {
          color: "border-red-200 bg-red-50 text-red-800",
          title: t('security.vulnerableTitle', 'ضعف أمني'),
          description: t('security.vulnerableDescription', 'تم العثور على مشكلات أمنية خطيرة'),
          icon: <ShieldAlert className="h-5 w-5 text-red-500" />
        };
      default:
        return {
          color: "border-gray-200 bg-gray-50 text-gray-800",
          title: t('security.unknownTitle', 'غير معروف'),
          description: t('security.unknownDescription', 'لم يتم تقييم الموقع بعد'),
          icon: <Shield className="h-5 w-5 text-gray-500" />
        };
    }
  };
  
  const statusInfo = getSecurityStatusInfo();
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Shield className="w-5 h-5 mr-2 text-blue-500" />
          {t('tools.securityChecker', 'فاحص الأمان')}
        </CardTitle>
        <CardDescription>
          {t('tools.securityCheckerDescription', 'تحقق من الثغرات الأمنية وشهادات SSL للمواقع')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2 rtl:space-x-reverse">
          <div className="flex-1">
            <Input
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              disabled={scanning}
              placeholder="example.com"
              className="w-full"
            />
          </div>
          <Button 
            onClick={handleStartScan} 
            disabled={!domain.trim() || scanning}
          >
            <Search className="h-4 w-4 mr-2" />
            {t('tools.scan', 'فحص')}
          </Button>
        </div>
        
        {scanning && (
          <div className="space-y-3 py-2">
            <div className="text-center text-sm">
              {t('tools.scanningDomain', 'جاري فحص الموقع...')} {domain}
            </div>
            <Progress value={progress} />
            <div className="grid grid-cols-4 text-xs text-center">
              <div className={progress >= 25 ? "text-blue-600 font-medium" : "text-muted-foreground"}>
                {t('tools.checkingSSL', 'شهادة SSL')}
              </div>
              <div className={progress >= 50 ? "text-blue-600 font-medium" : "text-muted-foreground"}>
                {t('tools.checkingHeaders', 'ترويسات الأمان')}
              </div>
              <div className={progress >= 75 ? "text-blue-600 font-medium" : "text-muted-foreground"}>
                {t('tools.checkingVulnerabilities', 'الثغرات')}
              </div>
              <div className={progress >= 100 ? "text-blue-600 font-medium" : "text-muted-foreground"}>
                {t('tools.generatingReport', 'إنشاء التقرير')}
              </div>
            </div>
          </div>
        )}
        
        {scanComplete && (
          <div className="space-y-4 pt-2">
            <Alert className={statusInfo.color}>
              <div className="flex items-start">
                {statusInfo.icon}
                <div className="ml-3">
                  <AlertTitle>{statusInfo.title}</AlertTitle>
                  <AlertDescription className="mt-1">
                    {statusInfo.description}
                  </AlertDescription>
                </div>
              </div>
            </Alert>
            
            {securityIssues.length > 0 && securityStatus !== "secure" && (
              <div className="space-y-3 mt-4">
                <h3 className="text-sm font-medium">
                  {t('security.foundIssues', 'المشاكل المكتشفة')}:
                </h3>
                {securityIssues.map((issue, index) => (
                  <div 
                    key={index} 
                    className={`border rounded-md p-3 ${getSeverityColor(issue.severity)}`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{issue.title}</h4>
                      <span className="text-xs px-2 py-1 rounded uppercase bg-white bg-opacity-50">
                        {issue.severity}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{issue.description}</p>
                  </div>
                ))}
              </div>
            )}
            
            {securityStatus === "secure" && (
              <div className="flex items-center justify-center p-8 border rounded-md border-green-200 bg-green-50 text-green-800">
                <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
                <div>
                  <h3 className="font-medium">
                    {t('security.noIssuesFound', 'لا توجد مشاكل')}
                  </h3>
                  <p className="text-sm">
                    {t('security.domainSecure', 'هذا الموقع آمن وفقًا للفحوصات الأساسية')}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2 text-xs text-muted-foreground border-t">
        {t('tools.securityNote', 'ملاحظة: هذا الفحص يوفر تقييمًا أساسيًا فقط وليس بديلاً عن تدقيق أمني شامل.')}
      </CardFooter>
    </Card>
  );
}
