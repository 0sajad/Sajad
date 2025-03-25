
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Shield, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const AccessVerification = () => {
  const { t } = useTranslation();
  const [accessKey, setAccessKey] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  
  const handleAuthenticate = () => {
    setIsAuthenticating(true);
    
    // محاكاة عملية التحقق
    setTimeout(() => {
      setIsAuthenticating(false);
      
      if (accessKey.length > 6) {
        toast({
          title: t('access.authSuccess'),
          description: t('access.accessGranted'),
        });
      } else {
        toast({
          title: t('access.authFailed'),
          description: t('access.invalidKey'),
          variant: "destructive",
        });
      }
    }, 1500);
  };
  
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
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
          {t('access.verification')}
        </h2>
        
        {/* Access Key Input */}
        <div className="relative mb-6">
          <Input
            type="text"
            value={accessKey}
            onChange={(e) => setAccessKey(e.target.value)}
            placeholder={t('access.enterAccessKey')}
            className="pl-10 pr-4 py-6 text-lg"
          />
          <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
        </div>
        
        {/* Authenticate Button */}
        <Button 
          className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700"
          onClick={handleAuthenticate}
          disabled={isAuthenticating || accessKey.length === 0}
        >
          {isAuthenticating ? (
            <span className="animate-pulse">{t('access.authenticating')}</span>
          ) : (
            t('access.authenticate')
          )}
        </Button>
        
        {/* Developer Mode Link */}
        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-gray-500 hover:text-blue-500 transition-colors">
            {t('access.developerMode')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default AccessVerification;
