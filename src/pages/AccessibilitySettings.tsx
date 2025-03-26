
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useA11y } from "@/hooks/useA11y";
import { useProfileStorage } from "@/hooks/accessibility/profiles/useProfileStorage";
import { useProfileImportExport } from "@/hooks/accessibility/profiles/useProfileImportExport";
import { useProfileActivation } from "@/hooks/accessibility/profiles/useProfileActivation";
import { useScreenReaderAnnouncements } from "@/components/ui/accessibility/screen-reader-announcements";
import { useTranslation } from "react-i18next";
import { useImportProfileHandler } from "@/components/settings/accessibility/ImportProfileHandler";
import { AccessibilityPageHeader } from "@/components/settings/accessibility/AccessibilityPageHeader";
import { AccessibilityTabsSection } from "@/components/settings/accessibility/AccessibilityTabsSection";
import { ProfilesTabContent } from "@/components/settings/accessibility/tabs/ProfilesTabContent";
import { TextTabContent } from "@/components/settings/accessibility/tabs/TextTabContent";
import { SoundTabContent } from "@/components/settings/accessibility/tabs/SoundTabContent";
import { KeyboardTabContent } from "@/components/settings/accessibility/tabs/KeyboardTabContent";
import { AdvancedTabContent } from "@/components/settings/accessibility/tabs/AdvancedTabContent";

export default function AccessibilitySettings() {
  const { t } = useTranslation();
  const { announce, announcements } = useScreenReaderAnnouncements();
  
  // Accessibility settings hooks
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
  
  // Text enhancement settings
  const [fontFamily, setFontFamily] = useState<string>("default");
  const [lineHeight, setLineHeight] = useState<number>(1.5);
  const [letterSpacing, setLetterSpacing] = useState<number>(0.5);
  const [kashidaEnabled, setKashidaEnabled] = useState<boolean>(false);
  
  // Sound settings
  const [notificationVolume, setNotificationVolume] = useState<number>(0.8);
  const [voiceName, setVoiceName] = useState<string>("");
  
  // Profile management hooks
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
  
  const { loadProfile } = useProfileActivation(
    setHighContrast,
    setLargeText,
    setReducedMotion,
    setFocusMode,
    setColorBlindMode,
    setDyslexicFont,
    setReadingGuide,
    setSoundFeedback
  );
  
  // Event handlers
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
        
        // Apply imported settings
        setHighContrast(settings.highContrast);
        setLargeText(settings.largeText);
        setReducedMotion(settings.reducedMotion);
        setFocusMode(settings.focusMode);
        setColorBlindMode(settings.colorBlindMode);
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
  
  // Helper function to get active profile name
  const getActiveProfile = () => {
    return localStorage.getItem('a11yActiveProfile');
  };

  return (
    <>
      <Header />
      
      <main id="main-content" tabIndex={-1} className="container py-8 space-y-8">
        <AccessibilityPageHeader />
        
        <AccessibilityTabsSection defaultTab="profiles">
          <ProfilesTabContent 
            profiles={getProfiles()}
            activeProfile={getActiveProfile()}
            onActivate={handleActivateProfile}
            onSave={handleSaveProfile}
            onDelete={handleDeleteProfile}
            onExport={handleExportProfile}
            onImport={handleImportProfile}
            onRestore={handleRestoreBackup}
            backups={hasBackups() ? getBackups() : []}
            announcements={announcements}
          />
          
          <TextTabContent 
            fontFamily={fontFamily}
            setFontFamily={setFontFamily}
            lineHeight={lineHeight}
            setLineHeight={setLineHeight}
            letterSpacing={letterSpacing}
            setLetterSpacing={setLetterSpacing}
            kashidaEnabled={kashidaEnabled}
            setKashidaEnabled={setKashidaEnabled}
          />
          
          <SoundTabContent 
            enabled={soundFeedback}
            setEnabled={setSoundFeedback}
            volume={notificationVolume}
            setVolume={setNotificationVolume}
            voice={voiceName}
            setVoice={setVoiceName}
          />
          
          <KeyboardTabContent />
          
          <AdvancedTabContent />
        </AccessibilityTabsSection>
      </main>
      
      <Footer />
    </>
  );
}
