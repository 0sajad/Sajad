
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProfileManager } from "@/components/ui/accessibility/profile-manager";
import { ArabicTextEnhancer } from "@/components/ui/accessibility/arabic-text-enhancer";
import { SoundNotifications } from "@/components/ui/accessibility/sound-notifications";
import { 
  ScreenReaderAnnouncements,
  useScreenReaderAnnouncements 
} from "@/components/ui/accessibility/screen-reader-announcements";
import { KeyboardShortcutsList, defaultA11yShortcuts } from "@/components/ui/accessibility/keyboard-shortcuts-list";
import { useA11y } from "@/hooks/useA11y";
import { useProfileStorage } from "@/hooks/accessibility/profiles/useProfileStorage";
import { useProfileImportExport } from "@/hooks/accessibility/profiles/useProfileImportExport";
import { useProfileActivation } from "@/hooks/accessibility/profiles/useProfileActivation";
import { useTranslation } from "react-i18next";
import { toast } from "@/components/ui/use-toast";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  AccessibilityIcon, 
  Settings, 
  User, 
  Volume, 
  Keyboard, 
  Type 
} from "lucide-react";

export default function AccessibilitySettings() {
  const { t } = useTranslation();
  const { announce } = useScreenReaderAnnouncements();
  
  // الإعدادات الأساسية لإمكانية الوصول
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
  
  // إعدادات تحسين النص العربي
  const [fontFamily, setFontFamily] = useState<string>("default");
  const [lineHeight, setLineHeight] = useState<number>(1.5);
  const [letterSpacing, setLetterSpacing] = useState<number>(0.5);
  const [kashidaEnabled, setKashidaEnabled] = useState<boolean>(false);
  
  // إعدادات الصوت
  const [notificationVolume, setNotificationVolume] = useState<number>(0.8);
  const [voiceName, setVoiceName] = useState<string>("");
  
  // استخدام هوكات إدارة ملفات التعريف
  const { 
    saveProfile, 
    getProfiles, 
    deleteProfile, 
    getBackups, 
    restoreFromBackup, 
    hasBackups 
  } = useProfileStorage();
  
  const { exportSettings, importSettings, showImportDialog } = useProfileImportExport();
  
  const { loadProfile, getActiveProfile } = useProfileActivation(
    setHighContrast,
    setLargeText,
    setReducedMotion,
    setFocusMode,
    setColorBlindMode,
    setDyslexicFont,
    setReadingGuide,
    setSoundFeedback
  );
  
  // استخدام مكون إدارة إعلانات قارئ الشاشة
  const { announcements } = useScreenReaderAnnouncements();
  
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
        setColorBlindMode(settings.colorBlindMode);
        setDyslexicFont(settings.dyslexicFont);
        setReadingGuide(settings.readingGuide || false);
        setSoundFeedback(settings.soundFeedback || false);
        
        // تنبيه المستخدم
        announce(t('accessibility.settingsImportedAnnouncement', 'تم استيراد الإعدادات بنجاح'), 'success');
      }
    } catch (error) {
      console.error('Failed to import profile:', error);
      
      toast({
        title: t('error', 'خطأ'),
        description: t('accessibility.importError', 'حدث خطأ أثناء استيراد الملف الشخصي'),
        variant: 'destructive'
      });
      
      announce(t('accessibility.importErrorAnnouncement', 'فشل استيراد الملف الشخصي'), 'error');
    }
  };
  
  const handleRestoreBackup = (backupIndex: number) => {
    const success = restoreFromBackup(backupIndex);
    if (success) {
      announce(t('accessibility.backupRestoredAnnouncement', 'تمت استعادة النسخة الاحتياطية بنجاح'), 'success');
    }
  };

  return (
    <>
      <Header />
      
      <main id="main-content" tabIndex={-1} className="container py-8 space-y-8">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <AccessibilityIcon className="h-10 w-10 text-primary" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('accessibility.title', 'إعدادات إمكانية الوصول')}</h1>
            <p className="text-muted-foreground">
              {t('accessibility.description', 'تخصيص إعدادات إمكانية الوصول لتحسين تجربتك')}
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="profiles" className="w-full">
          <TabsList className="grid grid-cols-5 w-full md:w-auto">
            <TabsTrigger value="profiles">
              <User className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
              <span className="hidden sm:inline">{t('accessibility.profiles', 'الملفات الشخصية')}</span>
            </TabsTrigger>
            
            <TabsTrigger value="text">
              <Type className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
              <span className="hidden sm:inline">{t('accessibility.textSettings', 'إعدادات النص')}</span>
            </TabsTrigger>
            
            <TabsTrigger value="sound">
              <Volume className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
              <span className="hidden sm:inline">{t('accessibility.soundSettings', 'إعدادات الصوت')}</span>
            </TabsTrigger>
            
            <TabsTrigger value="keyboard">
              <Keyboard className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
              <span className="hidden sm:inline">{t('accessibility.keyboardSettings', 'اختصارات لوحة المفاتيح')}</span>
            </TabsTrigger>
            
            <TabsTrigger value="advanced">
              <Settings className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
              <span className="hidden sm:inline">{t('accessibility.advancedSettings', 'إعدادات متقدمة')}</span>
            </TabsTrigger>
          </TabsList>
          
          {/* محتوى الملفات الشخصية */}
          <TabsContent value="profiles" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileManager
                profiles={getProfiles()}
                activeProfile={getActiveProfile()}
                onActivate={handleActivateProfile}
                onSave={handleSaveProfile}
                onDelete={handleDeleteProfile}
                onExport={handleExportProfile}
                onImport={handleImportProfile}
                onRestore={handleRestoreBackup}
                backups={hasBackups() ? getBackups() : []}
              />
              
              <ScreenReaderAnnouncements announcements={announcements} />
            </div>
          </TabsContent>
          
          {/* محتوى إعدادات النص */}
          <TabsContent value="text" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ArabicTextEnhancer
                fontFamily={fontFamily}
                setFontFamily={setFontFamily}
                lineHeight={lineHeight}
                setLineHeight={setLineHeight}
                letterSpacing={letterSpacing}
                setLetterSpacing={setLetterSpacing}
                kashidaEnabled={kashidaEnabled}
                setKashidaEnabled={setKashidaEnabled}
              />
            </div>
          </TabsContent>
          
          {/* محتوى إعدادات الصوت */}
          <TabsContent value="sound" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SoundNotifications
                enabled={soundFeedback}
                setEnabled={setSoundFeedback}
                volume={notificationVolume}
                setVolume={setNotificationVolume}
                voice={voiceName}
                setVoice={setVoiceName}
              />
            </div>
          </TabsContent>
          
          {/* محتوى اختصارات لوحة المفاتيح */}
          <TabsContent value="keyboard" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <KeyboardShortcutsList shortcuts={defaultA11yShortcuts} />
            </div>
          </TabsContent>
          
          {/* محتوى الإعدادات المتقدمة */}
          <TabsContent value="advanced" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* هنا يمكن إضافة مكونات إعدادات متقدمة إضافية في المستقبل */}
              <p className="text-muted-foreground col-span-full">
                {t('accessibility.advancedSettingsDescription', 'ستظهر هنا المزيد من الإعدادات المتقدمة في الإصدارات القادمة.')}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </>
  );
}
