
import React from "react";
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t, i18n } = useTranslation();
  
  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    
    // تحديث اتجاه الصفحة بناءً على اللغة
    const isRTL = language === "ar" || language === "ar-iq";
    const dir = isRTL ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", language);
    localStorage.setItem("language", language);
  };

  return (
    <footer className="bg-white border-t border-gray-100 py-12 dark:bg-gray-900 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <span className="text-xl font-semibold bg-gradient-to-r from-octaBlue-600 to-octaBlue-800 bg-clip-text text-transparent">
              OCTA-GRAM
            </span>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm">
              {t('footer.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
            <div>
              <h4 className="font-medium mb-4">{t('footer.product')}</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('footer.features')}</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('footer.pricing')}</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('footer.faq')}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">{t('footer.resources')}</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('footer.documentation')}</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('footer.tutorials')}</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('footer.support')}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">{t('footer.languages')}</h4>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => handleLanguageChange('en')}
                    className={`text-sm ${i18n.language === 'en' ? 'text-foreground font-medium' : 'text-muted-foreground'} hover:text-foreground transition-colors`}
                  >
                    {t('footer.english')}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleLanguageChange('ar')}
                    className={`text-sm ${i18n.language === 'ar' ? 'text-foreground font-medium' : 'text-muted-foreground'} hover:text-foreground transition-colors`}
                  >
                    {t('footer.arabic')}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleLanguageChange('ar-iq')}
                    className={`text-sm ${i18n.language === 'ar-iq' ? 'text-foreground font-medium' : 'text-muted-foreground'} hover:text-foreground transition-colors`}
                  >
                    {t('footer.iraqi')}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleLanguageChange('ja')}
                    className={`text-sm ${i18n.language === 'ja' ? 'text-foreground font-medium' : 'text-muted-foreground'} hover:text-foreground transition-colors`}
                  >
                    {t('footer.japanese')}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleLanguageChange('zh')}
                    className={`text-sm ${i18n.language === 'zh' ? 'text-foreground font-medium' : 'text-muted-foreground'} hover:text-foreground transition-colors`}
                  >
                    {t('footer.chinese')}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleLanguageChange('fr')}
                    className={`text-sm ${i18n.language === 'fr' ? 'text-foreground font-medium' : 'text-muted-foreground'} hover:text-foreground transition-colors`}
                  >
                    {t('footer.french')}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            {t('footer.copyright')}
          </p>
          
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6 rtl:space-x-reverse">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('footer.terms')}</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('footer.privacy')}</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('footer.cookies')}</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
