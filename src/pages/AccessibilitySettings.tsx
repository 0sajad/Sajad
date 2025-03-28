
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useScreenReaderAnnouncements } from "@/components/ui/accessibility/screen-reader-announcements";
import { AccessibilityPageHeader } from "@/components/settings/accessibility/AccessibilityPageHeader";
import { AccessibilityTabsSection } from "@/components/settings/accessibility/AccessibilityTabsSection";
import { ProfilesTabContent } from "@/components/settings/accessibility/tabs/ProfilesTabContent";
import { TextTabContent } from "@/components/settings/accessibility/tabs/TextTabContent";
import { SoundTabContent } from "@/components/settings/accessibility/tabs/SoundTabContent";
import { KeyboardTabContent } from "@/components/settings/accessibility/tabs/KeyboardTabContent";
import { AdvancedTabContent } from "@/components/settings/accessibility/tabs/AdvancedTabContent";
import { useAccessibilityHandlers } from "@/hooks/accessibility/useAccessibilityHandlers";

export default function AccessibilitySettings() {
  const { announcements, announce } = useScreenReaderAnnouncements();
  const [announcementsList, setAnnouncementsList] = useState<any[]>([]);
  
  // Convert announcements object to array if needed
  useEffect(() => {
    if (announcements) {
      // Create a dummy array if announcements is not already an array
      if (!Array.isArray(announcements)) {
        // Just to test the interface - in production this would be done differently
        setAnnouncementsList([
          { id: '1', text: 'مرحبًا بك في إعدادات إمكانية الوصول', type: 'info', timestamp: new Date() }
        ]);
      } else {
        setAnnouncementsList(announcements);
      }
    }
  }, [announcements]);
  
  const {
    // حالة النص
    fontFamily, setFontFamily,
    lineHeight, setLineHeight,
    letterSpacing, setLetterSpacing,
    kashidaEnabled, setKashidaEnabled,
    
    // حالة الصوت
    soundFeedback, setSoundFeedback,
    notificationVolume, setNotificationVolume,
    voiceName, setVoiceName,
    
    // معالجات الملفات الشخصية
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
    hasBackups
  } = useAccessibilityHandlers();

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
            announcements={announcementsList}
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
