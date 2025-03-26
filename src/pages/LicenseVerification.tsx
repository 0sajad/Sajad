
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Key, Shield, Download, LockKeyhole, ArrowLeft } from "lucide-react";
import { LicenseSelector } from "@/components/license/LicenseSelector";
import { toast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

const LicenseVerification = () => {
  const { t, i18n } = useTranslation('license');
  const [licenseKey, setLicenseKey] = useState("");
  const [licenseType, setLicenseType] = useState<"client" | "developer">("client");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  
  useEffect(() => {
    // التحقق من اتجاه اللغة
    const currentLang = i18n.language;
    setIsRTL(currentLang === "ar" || currentLang === "ar-iq");
  }, [i18n.language]);
  
  const handleVerify = () => {
    setIsVerifying(true);
    
    // محاكاة عملية التحقق
    setTimeout(() => {
      setIsVerifying(false);
      
      if (licenseKey.length > 8) {
        toast({
          title: t('verificationSuccess'),
          description: t('accessGranted'),
          variant: "default",
        });

        // يمكن هنا التوجيه إلى الصفحة الرئيسية بعد التحقق الناجح
        // navigate("/");
      } else {
        toast({
          title: t('verificationFailed'),
          description: t('invalidKey'),
          variant: "destructive",
        });
      }
    }, 1500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && licenseKey.length > 0) {
      handleVerify();
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-6">
        <Card className="max-w-md w-full mx-auto shadow-lg">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-500 p-4 rounded-full">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">
              {t('verification')}
            </CardTitle>
            <CardDescription>
              {t('enterKeyToActivate')}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* حقل إدخال مفتاح الترخيص */}
            <div className="space-y-2">
              <div className="relative">
                <Input 
                  type="text"
                  value={licenseKey}
                  onChange={(e) => setLicenseKey(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t('enterKeyHere')}
                  className={`${isRTL ? 'pl-4 pr-10' : 'pl-10 pr-4'} h-12 text-base`}
                />
                <Key className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500`} />
              </div>
              
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>{t('keyFormat')}</p>
              </div>
            </div>
            
            {/* منتقي نوع الترخيص */}
            <LicenseSelector 
              value={licenseType} 
              onChange={(value) => setLicenseType(value as "client" | "developer")} 
            />
            
            {/* معلومات إضافية */}
            <div className="text-center text-gray-600 dark:text-gray-300 text-sm space-y-3">
              <p>{t('requiredMessage')}</p>
              
              <div className="flex items-center justify-center text-blue-600">
                <Download className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                <span>{t('developerPermissions')}</span>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-3">
            <Button 
              className="w-full py-5 text-lg"
              onClick={handleVerify}
              disabled={isVerifying || licenseKey.length === 0}
            >
              {isVerifying ? (
                <span className="animate-pulse">{t('verifying')}</span>
              ) : (
                <>
                  <LockKeyhole className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {t('verifyKey')}
                </>
              )}
            </Button>
            
            <Link 
              to="/" 
              className="text-gray-500 hover:text-gray-700 transition-colors text-sm text-center"
              aria-label={t('returnToHome')}
            >
              {t('returnToHome')}
            </Link>
          </CardFooter>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default LicenseVerification;
