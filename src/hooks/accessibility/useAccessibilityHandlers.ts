
import { useState } from 'react';
import { useA11y } from '@/hooks/useA11y';
import { useProfileStorage } from '@/hooks/accessibility/profiles/useProfileStorage';
import { useProfileImportExport } from '@/hooks/accessibility/profiles/useProfileImportExport';
import { useProfileActivation } from '@/hooks/accessibility/profiles/useProfileActivation';
import { useImportProfileHandler } from '@/components/settings/accessibility/ImportProfileHandler';
import { useScreenReaderAnnouncements } from '@/components/ui/accessibility/screen-reader-announcements';
import { useTranslation } from 'react-i18next';
import { ColorBlindMode } from '@/hooks/accessibility/useA11yColor';

export function useAccessibilityHandlers() {
  const { t } = useTranslation();
  const { announce } = useScreenReaderAnnouncements();
  
  // دالات إمكانية الوصول
  const {
    highContrast, setHighContrast,
    largeText, setLargeText,
    reducedMotion, setReducedMotion,
    focusMode, setFocusMode,
    colorBlindMode, setColorBlindMode,
    dyslexicFont, setDyslexicFont,
    readingGuide, setReadingGuide,
    soundFeedback, setSoundFeedback
  } = useA11y();
  
  // إعدادات تحسين النص
  const [fontFamily, setFontFamily] = useState<string>("default");
  const [lineHeight, setLineHeight] = useState<number>(1.5);
  const [letterSpacing, setLetterSpacing] = useState<number>(0.5);
  const [kashidaEnabled, setKashidaEnabled] = useState<boolean>(false);
  
  // إعدادات الصوت
  const [notificationVolume, setNotificationVolume] = useState<number>(0.8);
  const [voiceName, setVoiceName] = useState<string>("");
  
  // دالات إدارة الملفات الشخصية
  const { 
    saveProfile, 
    getProfiles, 
    deleteProfile, 
    getBackups, 
    restoreFromBackup, 
    hasBackups 
  } = useProfileStorage();
  
  const { exportSettings, importSettings } = useProfileImportExport();
  const { showImportDialog, handleImportError } = useImportProfileHandler();
  
  // إنشاء دالة غلاف للتعامل مع تحويل نوع ColorBlindMode
  const setColorBlindModeWrapper = (value: string) => {
    // التحقق من صحة القيمة
    if (value === 'none' || value === 'protanopia' || value === 'deuteranopia' || value === 'tritanopia' || value === 'achromatopsia') {
      setColorBlindMode(value as ColorBlindMode);
    } else {
      console.warn(`قيمة ColorBlindMode غير صالحة: ${value}، استخدام 'none' بدلاً من ذلك`);
      setColorBlindMode('none');
    }
  };
  
  const { loadProfile } = useProfileActivation(
    setHighContrast,
    setLargeText,
    setReducedMotion,
    setFocusMode,
    setColorBlindModeWrapper,
    setDyslexicFont,
    setReadingGuide,
    setSoundFeedback
  );
  
  // معالجات الأحداث
  const handleSaveProfile = (name: string) => {
    const settings = {
      highContrast,
      largeText,
      reducedMotion,
      focusMode,
      colorBlindMode,
      dyslexicFont,
      readingGuide,
      soundFeedback,
      fontFamily,
      lineHeight,
      letterSpacing,
      kashidaEnabled
    };
    
    saveProfile(name, settings);
    announce(t('accessibility.profileSavedAnnouncement', 'تم حفظ الملف الشخصي {name}', { name }), 'success');
  };
  
  const handleActivateProfile = (name: string) => {
    loadProfile(name, getProfiles);
  };
  
  const handleDeleteProfile = (name: string) => {
    const success = deleteProfile(name);
    if (success) {
      announce(t('accessibility.profileDeletedAnnouncement', 'تم حذف الملف الشخصي {name}', { name }), 'info');
    }
  };
  
  const handleExportProfile = (name: string) => {
    const profiles = getProfiles();
    const settings = profiles[name];
    
    if (settings) {
      exportSettings(settings);
      announce(t('accessibility.profileExportedAnnouncement', 'تم تصدير الملف الشخصي {name}', { name }), 'info');
    }
  };
  
  const handleImportProfile = async () => {
    try {
      const file = await showImportDialog();
      if (file) {
        const settings = await importSettings(file);
        
        // تطبيق الإعدادات المستوردة
        setHighContrast(settings.highContrast);
        setLargeText(settings.largeText);
        setReducedMotion(settings.reducedMotion);
        setFocusMode(settings.focusMode);
        if (settings.colorBlindMode) {
          setColorBlindModeWrapper(settings.colorBlindMode);
        }
        setDyslexicFont(settings.dyslexicFont);
        setReadingGuide(settings.readingGuide || false);
        setSoundFeedback(settings.soundFeedback || false);
        
        announce(t('accessibility.settingsImportedAnnouncement', 'تم استيراد الإعدادات بنجاح'), 'success');
      }
    } catch (error) {
      handleImportError(error);
      announce(t('accessibility.importErrorAnnouncement', 'فشل استيراد الملف الشخصي'), 'error');
    }
  };
  
  const handleRestoreBackup = (backupIndex: number) => {
    const success = restoreFromBackup(backupIndex);
    if (success) {
      announce(t('accessibility.backupRestoredAnnouncement', 'تمت استعادة النسخة الاحتياطية بنجاح'), 'success');
    }
  };
  
  // وظيفة مساعدة للحصول على اسم الملف الشخصي النشط
  const getActiveProfile = () => {
    return localStorage.getItem('a11yActiveProfile');
  };

  return {
    // حالة ميزات إمكانية الوصول
    highContrast, setHighContrast,
    largeText, setLargeText,
    reducedMotion, setReducedMotion,
    focusMode, setFocusMode,
    colorBlindMode, setColorBlindMode,
    dyslexicFont, setDyslexicFont,
    readingGuide, setReadingGuide,
    soundFeedback, setSoundFeedback,
    
    // حالة تحسين النص
    fontFamily, setFontFamily,
    lineHeight, setLineHeight,
    letterSpacing, setLetterSpacing,
    kashidaEnabled, setKashidaEnabled,
    
    // حالة الصوت
    notificationVolume, setNotificationVolume,
    voiceName, setVoiceName,
    
    // معالجات
    handleSaveProfile,
    handleActivateProfile,
    handleDeleteProfile,
    handleExportProfile,
    handleImportProfile,
    handleRestoreBackup,
    
    // وظائف الملفات الشخصية
    getProfiles,
    getActiveProfile,
    getBackups,
    hasBackups,
    
    // وظائف متنوعة
    announce
  };
}
