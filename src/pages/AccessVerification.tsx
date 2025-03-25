
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Shield, Key, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

const AccessVerification = () => {
  const { t, i18n } = useTranslation('access');
  const [accessKey, setAccessKey] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  
  useEffect(() => {
    // التحقق من اتجاه اللغة
    const currentLang = i18n.language;
    setIsRTL(currentLang === "ar" || currentLang === "ar-iq");
  }, [i18n.language]);
  
  const handleAuthenticate = () => {
    setIsAuthenticating(true);
    
    // محاكاة عملية التحقق
    setTimeout(() => {
      setIsAuthenticating(false);
      
      if (accessKey.length > 6) {
        toast({
          title: t('authSuccess'),
          description: t('accessGranted'),
        });
      } else {
        toast({
          title: t('authFailed'),
          description: t('invalidKey'),
          variant: "destructive",
        });
      }
    }, 1500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && accessKey.length > 0) {
      handleAuthenticate();
    }
  };
  
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 relative">
        {/* رابط العودة */}
        <Link to="/" className="absolute top-4 left-4 rtl:left-auto rtl:right-4 text-gray-500 hover:text-gray-700 transition-colors">
          <ArrowLeft className={`h-5 w-5 ${isRTL ? 'transform rotate-180' : ''}`} />
        </Link>
        
        {/* Shield Icon */}
        <div className="flex justify-center mb-8">
          <Shield className="h-16 w-16 text-blue-500" />
        </div>
        
        {/* Brand Name */}
        <h1 className="text-3xl font-bold text-center mb-2">
          OCTA-GRAM
        </h1>
        
        {/* Verification Title */}
        <h2 className="text-xl text-gray-600 dark:text-gray-300 text-center mb-8">
          {t('verification')}
        </h2>
        
        {/* Access Key Input */}
        <div className="relative mb-6">
          <Input
            type="text"
            value={accessKey}
            onChange={(e) => setAccessKey(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('enterAccessKey')}
            className="pl-10 pr-4 py-6 text-lg rtl:pl-4 rtl:pr-10"
          />
          <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 rtl:left-auto rtl:right-3" />
        </div>
        
        {/* Authenticate Button */}
        <Button 
          className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700"
          onClick={handleAuthenticate}
          disabled={isAuthenticating || accessKey.length === 0}
        >
          {isAuthenticating ? (
            <span className="animate-pulse">{t('authenticating')}</span>
          ) : (
            t('authenticate')
          )}
        </Button>
        
        {/* Developer Mode Link */}
        <div className="mt-6 text-center">
          <Link to="/license" className="text-sm text-gray-500 hover:text-blue-500 transition-colors">
            {t('developerMode')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccessVerification;
