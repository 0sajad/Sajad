
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Shield, Key, ArrowLeft, User, Lock } from "lucide-react";
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
        // يمكن هنا التوجيه إلى الصفحة الرئيسية بعد التحقق الناجح
        // navigate("/");
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
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-octaBlue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/80 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-10 relative border border-white/20 dark:border-gray-700/30 transform hover:scale-[1.01] transition-all duration-300">
          {/* رابط العودة */}
          <Link 
            to="/" 
            className="absolute top-4 left-4 rtl:left-auto rtl:right-4 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="العودة إلى الصفحة الرئيسية"
          >
            <ArrowLeft className={`h-5 w-5 ${isRTL ? 'transform rotate-180' : ''}`} />
          </Link>
          
          {/* Shield Icon */}
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-octaBlue-500 to-purple-600 text-white p-5 rounded-full shadow-xl">
              <Shield className="h-16 w-16" />
            </div>
          </div>
          
          {/* Brand Name */}
          <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-octaBlue-600 to-purple-600 bg-clip-text text-transparent">
            OCTA-GRAM
          </h1>
          
          {/* Verification Title */}
          <h2 className="text-xl text-gray-600 dark:text-gray-300 text-center mb-8">
            {t('verification')}
          </h2>
          
          {/* Username Input */}
          <div className="relative mb-4">
            <div className="absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 h-9 w-9 flex items-center justify-center bg-octaBlue-100 dark:bg-gray-700 rounded-full">
              <User className="h-5 w-5 text-octaBlue-500 dark:text-octaBlue-300" />
            </div>
            <Input
              type="text"
              placeholder="اسم المستخدم"
              className={`${isRTL ? 'pr-14' : 'pl-14'} py-6 text-lg bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl`}
            />
          </div>
          
          {/* Access Key Input */}
          <div className="relative mb-6">
            <div className="absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 h-9 w-9 flex items-center justify-center bg-octaBlue-100 dark:bg-gray-700 rounded-full">
              <Lock className="h-5 w-5 text-octaBlue-500 dark:text-octaBlue-300" />
            </div>
            <Input
              type="password"
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('enterAccessKey')}
              className={`${isRTL ? 'pr-14' : 'pl-14'} py-6 text-lg bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl`}
            />
          </div>
          
          {/* Authenticate Button */}
          <Button 
            className="w-full py-6 text-lg bg-gradient-to-r from-octaBlue-500 to-purple-600 hover:from-octaBlue-600 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-octaBlue-500/30 transform hover:translate-y-[-2px] transition-all"
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
            <Link to="/license" className="text-sm text-gray-500 hover:text-octaBlue-500 transition-colors">
              {t('developerMode')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessVerification;
