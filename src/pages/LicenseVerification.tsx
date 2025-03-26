
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
        <div className="max-w-md w-full mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 relative">
          {/* رابط العودة */}
          <Link 
            to="/" 
            className="absolute top-4 left-4 rtl:left-auto rtl:right-4 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label={t('returnToHome', 'Return to home')}
          >
            <ArrowLeft className={`h-5 w-5 ${isRTL ? 'transform rotate-180' : ''}`} />
          </Link>
          
          {/* شعار الدرع */}
          <div className="flex justify-center mb-6">
            <div className="bg-blue-500 p-4 rounded-full">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          
          {/* عنوان الصفحة */}
          <h1 className="text-2xl font-bold text-center mb-4">
            {t('verification')}
          </h1>
          
          {/* الوصف */}
          <p className="text-gray-600 dark:text-gray-300 text-center mb-6 text-sm">
            {t('enterKeyToActivate')}
          </p>
          
          {/* حقل إدخال مفتاح الترخيص */}
          <div className="mb-6">
            <div className="relative">
              <Input 
                type="text"
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('enterKeyHere')}
                className="pl-10 pr-4 rtl:pl-4 rtl:pr-10 h-12"
              />
              <Key className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500`} />
            </div>
            
            <div className="mt-2 text-sm text-gray-500">
              <p>{t('keyFormat')}</p>
            </div>
          </div>
          
          {/* منتقي نوع الترخيص */}
          <div className="mb-6">
            <LicenseSelector 
              value={licenseType} 
              onChange={(value) => setLicenseType(value as "client" | "developer")} 
            />
          </div>
          
          {/* معلومات إضافية */}
          <div className="mb-6 text-center text-gray-600 dark:text-gray-300 text-sm">
            <p className="mb-3">{t('requiredMessage')}</p>
            
            <div className="flex items-center justify-center text-blue-600">
              <Download className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
              <span>{t('developerPermissions')}</span>
            </div>
          </div>
          
          {/* زر التحقق */}
          <Button 
            className="w-full py-6 text-lg"
            onClick={handleVerify}
            disabled={isVerifying || licenseKey.length === 0}
          >
            {isVerifying ? (
              <span className="animate-pulse">{t('verifying')}</span>
            ) : (
              <>
                <LockKeyhole className="mr-2 rtl:ml-2 rtl:mr-0" />
                {t('verifyKey')}
              </>
            )}
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LicenseVerification;
