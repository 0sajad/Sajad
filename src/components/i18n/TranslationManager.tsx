
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * مدير الترجمات - يقوم بتهيئة ومراقبة ترجمات التطبيق
 * يتم استخدامه داخل DevelopmentTools
 */
export function TranslationManager() {
  const { i18n } = useTranslation();
  const [translationStatus, setTranslationStatus] = useState({
    totalLanguages: 0,
    availableLanguages: [] as string[],
    currentLanguage: '',
    totalNamespaces: 0,
    loadedResources: 0,
    totalResources: 0
  });
  
  // تهيئة وتحديث إحصاءات الترجمات
  useEffect(() => {
    const updateTranslationStatus = () => {
      // الحصول على قائمة اللغات المتاحة
      const languages = i18n.languages || [];
      
      // الحصول على اللغة الحالية
      const currentLanguage = i18n.language || '';
      
      // الحصول على أسماء المساحات
      const namespaces = i18n.options.ns || [];
      
      // حساب إجمالي الموارد وعدد الموارد المحملة
      let loadedResources = 0;
      let totalResources = 0;
      
      languages.forEach(lang => {
        if (typeof namespaces === 'string') {
          // إذا كان هناك مساحة اسمية واحدة فقط
          totalResources += 1;
          if (i18n.hasResourceBundle(lang, namespaces)) {
            loadedResources += 1;
          }
        } else {
          // إذا كان هناك عدة مساحات اسمية
          namespaces.forEach(ns => {
            totalResources += 1;
            if (i18n.hasResourceBundle(lang, ns)) {
              loadedResources += 1;
            }
          });
        }
      });
      
      setTranslationStatus({
        totalLanguages: languages.length,
        availableLanguages: languages,
        currentLanguage,
        totalNamespaces: Array.isArray(namespaces) ? namespaces.length : 1,
        loadedResources,
        totalResources
      });
    };
    
    updateTranslationStatus();
    
    // تحديث الحالة عند تغيير اللغة
    const handleLanguageChanged = () => {
      updateTranslationStatus();
    };
    
    i18n.on('languageChanged', handleLanguageChanged);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);
  
  // لا يقدم هذا المكون أي واجهة مستخدم، فهو مكون منطقي فقط
  return null;
}

// تصدير المكون كمكون افتراضي لدعم React.lazy
export default TranslationManager;
