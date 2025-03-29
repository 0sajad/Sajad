
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useFeatures } from "@/context/FeatureContext";
import { useTranslation } from "react-i18next";
import { Code, Terminal, CheckIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArabicTextEnhancer } from "@/components/text/ArabicTextEnhancer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * مكون تبديل وضع المطور
 * يسمح بتفعيل وضع المطور من خلال واجهة مستخدم خاصة
 */
export function DevModeToggle() {
  const { t } = useTranslation();
  const { isDevMode, toggleDevMode } = useFeatures();
  const [devCode, setDevCode] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // هذا مجرد رمز توضيحي للتحقق - في التطبيق الحقيقي،
  // سيتم استخدام طرق أكثر أمانًا للمصادقة
  const developerCode = "dev-octanetwork";
  
  // التحقق من رمز المطور
  const verifyDevCode = () => {
    if (devCode === developerCode) {
      setIsAuthenticated(true);
      toggleDevMode();
      setTimeout(() => {
        setIsDialogOpen(false);
      }, 1000);
    } else {
      setIsAuthenticated(false);
    }
  };
  
  // إعادة تعيين عند إغلاق الحوار
  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setDevCode("");
      setIsAuthenticated(false);
    }
  };
  
  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button 
          variant={isDevMode ? "default" : "outline"} 
          size="sm"
          className={`h-9 ${isDevMode ? 'bg-amber-500 hover:bg-amber-600 text-white' : ''}`}
        >
          {isDevMode ? (
            <>
              <Terminal className="h-4 w-4 mr-2" />
              <ArabicTextEnhancer>{t('tools.devModeActive', 'وضع المطور مفعل')}</ArabicTextEnhancer>
            </>
          ) : (
            <>
              <Code className="h-4 w-4 mr-2" />
              <ArabicTextEnhancer>{t('tools.devMode', 'وضع المطور')}</ArabicTextEnhancer>
            </>
          )}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            <ArabicTextEnhancer>{t('tools.devModeAccess', 'الوصول إلى وضع المطور')}</ArabicTextEnhancer>
          </DialogTitle>
          <DialogDescription>
            <ArabicTextEnhancer>
              {isDevMode 
                ? t('tools.devModeActive', 'وضع المطور مفعل حاليًا. هل تريد تعطيله؟') 
                : t('tools.devModeDesc', 'أدخل رمز المطور للوصول إلى الميزات المتقدمة')}
            </ArabicTextEnhancer>
          </DialogDescription>
        </DialogHeader>
        
        {isDevMode ? (
          <div className="flex items-center justify-center my-4">
            <Button 
              onClick={() => {
                toggleDevMode();
                setIsDialogOpen(false);
              }}
              variant="destructive"
            >
              <ArabicTextEnhancer>{t('tools.disableDevMode', 'تعطيل وضع المطور')}</ArabicTextEnhancer>
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="dev-code">
                  <ArabicTextEnhancer>{t('tools.enterDevCode', 'أدخل رمز المطور')}</ArabicTextEnhancer>
                </Label>
                <Input
                  id="dev-code"
                  value={devCode}
                  onChange={(e) => setDevCode(e.target.value)}
                  placeholder="dev-******"
                  className={isAuthenticated ? 'border-green-500' : ''}
                />
                {isAuthenticated && (
                  <div className="text-green-500 text-sm flex items-center mt-1">
                    <CheckIcon className="h-4 w-4 mr-1" />
                    <ArabicTextEnhancer>{t('tools.codeVerified', 'تم التحقق')}</ArabicTextEnhancer>
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                <ArabicTextEnhancer>
                  {t('tools.devModeWarning', 'تحذير: وضع المطور يتيح الوصول إلى أدوات متقدمة وميزات تجريبية قد تؤثر على استقرار التطبيق.')}
                </ArabicTextEnhancer>
              </p>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={verifyDevCode}>
                <ArabicTextEnhancer>{t('tools.verifyAndEnable', 'التحقق وتفعيل')}</ArabicTextEnhancer>
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
