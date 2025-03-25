
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Key, User, Code, Shield, Download, LockKeyhole } from "lucide-react";
import { LicenseSelector } from "@/components/license/LicenseSelector";
import { toast } from "@/components/ui/use-toast";

const LicenseVerification = () => {
  const { t } = useTranslation();
  const [licenseKey, setLicenseKey] = useState("");
  const [licenseType, setLicenseType] = useState<"client" | "developer">("client");
  const [isVerifying, setIsVerifying] = useState(false);
  
  const handleVerify = () => {
    setIsVerifying(true);
    
    // محاكاة عملية التحقق
    setTimeout(() => {
      setIsVerifying(false);
      
      if (licenseKey.length > 8) {
        toast({
          title: t('license.verificationSuccess'),
          description: t('license.accessGranted'),
          variant: "default",
        });
      } else {
        toast({
          title: t('license.verificationFailed'),
          description: t('license.invalidKey'),
          variant: "destructive",
        });
      }
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          {/* شعار الدرع */}
          <div className="flex justify-center mb-6">
            <div className="bg-blue-500 p-8 rounded-full">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          
          {/* عنوان الصفحة */}
          <h1 className="text-3xl font-bold text-center mb-4">
            {t('license.verification')}
          </h1>
          
          {/* الوصف */}
          <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
            {t('license.enterKeyToActivate')}
          </p>
          
          {/* حقل إدخال مفتاح الترخيص */}
          <div className="mb-6">
            <div className="relative">
              <Input 
                type="text"
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                placeholder={t('license.enterKeyHere')}
                className="pl-10 pr-4"
              />
              <Key className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            </div>
            
            <div className="mt-2 text-sm text-blue-600 flex items-center">
              <span className="mr-1">⚡</span>
              {t('license.keyFormat')}: XXX-XXXX-XXXX-XXXX
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
          <div className="mb-8 text-center text-gray-600 dark:text-gray-300">
            <p className="mb-4">{t('license.requiredMessage')}</p>
            
            <div className="flex items-center justify-center text-blue-600">
              <Download className="w-4 h-4 mr-2" />
              <span>{t('license.developerPermissions')}</span>
            </div>
          </div>
          
          {/* زر التحقق */}
          <Button 
            className="w-full"
            onClick={handleVerify}
            disabled={isVerifying || licenseKey.length === 0}
          >
            {isVerifying ? (
              <span className="animate-pulse">{t('license.verifying')}</span>
            ) : (
              <>
                <LockKeyhole className="mr-2" />
                {t('license.verifyKey')}
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
