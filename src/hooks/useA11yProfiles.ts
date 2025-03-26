
import { useState, useEffect } from 'react';
import { useA11y } from './useA11y';
import { useTranslation } from 'react-i18next';
import { toast } from '@/components/ui/use-toast';

interface A11yProfile {
  id: string;
  name: string;
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  focusMode: boolean;
  dyslexiaFont?: boolean;
  customCursor?: boolean;
  underlineLinks?: boolean;
  readingGuide?: boolean;
  textSpacing?: boolean;
}

export function useA11yProfiles() {
  const { t } = useTranslation();
  const {
    highContrast, setHighContrast,
    largeText, setLargeText,
    reducedMotion, setReducedMotion,
    focusMode, setFocusMode
  } = useA11y();
  
  const [profiles, setProfiles] = useState<A11yProfile[]>([]);
  const [activeProfile, setActiveProfile] = useState<string | null>(null);
  
  // تحميل الملفات الشخصية المحفوظة
  useEffect(() => {
    const savedProfiles = localStorage.getItem('a11y-profiles');
    if (savedProfiles) {
      try {
        const parsedProfiles = JSON.parse(savedProfiles);
        setProfiles(parsedProfiles);
      } catch (error) {
        console.error('Failed to parse saved accessibility profiles', error);
      }
    } else {
      // إنشاء ملف تعريف افتراضي إذا لم يكن هناك ملفات شخصية محفوظة
      const defaultProfile: A11yProfile = {
        id: 'default',
        name: t('accessibility.defaultProfileName', 'Default Profile'),
        highContrast: false,
        largeText: false,
        reducedMotion: false,
        focusMode: false
      };
      
      setProfiles([defaultProfile]);
      localStorage.setItem('a11y-profiles', JSON.stringify([defaultProfile]));
    }
    
    // تحقق من وجود ملف تعريف نشط
    const savedActiveProfile = localStorage.getItem('a11y-active-profile');
    if (savedActiveProfile) {
      setActiveProfile(savedActiveProfile);
    }
  }, [t]);
  
  // حفظ الملف الشخصي الحالي
  const saveCurrentSettings = (name: string) => {
    const id = Date.now().toString();
    const newProfile: A11yProfile = {
      id,
      name,
      highContrast,
      largeText,
      reducedMotion,
      focusMode
    };
    
    const updatedProfiles = [...profiles, newProfile];
    setProfiles(updatedProfiles);
    localStorage.setItem('a11y-profiles', JSON.stringify(updatedProfiles));
    
    // تعيين هذا الملف كملف نشط
    setActiveProfile(id);
    localStorage.setItem('a11y-active-profile', id);
    
    toast({
      title: t('accessibility.profileSaved', 'Profile saved successfully'),
      description: name
    });
    
    return id;
  };
  
  // تطبيق ملف تعريف محدد
  const applyProfile = (profileId: string) => {
    const profileToApply = profiles.find(profile => profile.id === profileId);
    
    if (profileToApply) {
      setHighContrast(profileToApply.highContrast);
      setLargeText(profileToApply.largeText);
      setReducedMotion(profileToApply.reducedMotion);
      setFocusMode(profileToApply.focusMode);
      
      setActiveProfile(profileId);
      localStorage.setItem('a11y-active-profile', profileId);
      
      toast({
        title: t('accessibility.profileLoaded', 'Profile loaded successfully'),
        description: profileToApply.name
      });
    }
  };
  
  // حذف ملف تعريف
  const deleteProfile = (profileId: string) => {
    if (profileId === 'default') {
      // لا يمكن حذف الملف الافتراضي
      return false;
    }
    
    const updatedProfiles = profiles.filter(profile => profile.id !== profileId);
    setProfiles(updatedProfiles);
    localStorage.setItem('a11y-profiles', JSON.stringify(updatedProfiles));
    
    // إذا كان الملف المحذوف هو الملف النشط، قم بتعيين الملف الافتراضي
    if (activeProfile === profileId) {
      setActiveProfile('default');
      localStorage.setItem('a11y-active-profile', 'default');
      
      // تطبيق الإعدادات الافتراضية
      const defaultProfile = updatedProfiles.find(profile => profile.id === 'default');
      if (defaultProfile) {
        setHighContrast(defaultProfile.highContrast);
        setLargeText(defaultProfile.largeText);
        setReducedMotion(defaultProfile.reducedMotion);
        setFocusMode(defaultProfile.focusMode);
      }
    }
    
    toast({
      title: t('accessibility.profileDeleted', 'Profile deleted successfully')
    });
    
    return true;
  };
  
  // تصدير ملف تعريف كملف JSON
  const exportProfile = (profileId: string) => {
    const profileToExport = profiles.find(profile => profile.id === profileId);
    
    if (profileToExport) {
      const dataStr = JSON.stringify(profileToExport, null, 2);
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
      
      const exportFileDefaultName = `a11y-profile-${profileToExport.name.toLowerCase().replace(/\s+/g, '-')}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast({
        title: t('accessibility.profileExported', 'Profile exported successfully')
      });
      
      return true;
    }
    
    return false;
  };
  
  // استيراد ملف تعريف من ملف JSON
  const importProfile = (jsonData: string) => {
    try {
      const importedProfile = JSON.parse(jsonData) as A11yProfile;
      
      // التحقق من صحة الملف المستورد
      if (!importedProfile.id || typeof importedProfile.highContrast !== 'boolean') {
        throw new Error('Invalid profile format');
      }
      
      // تعديل معرف الملف لتجنب التضارب
      importedProfile.id = Date.now().toString();
      
      // إضافة الملف المستورد إلى القائمة
      const updatedProfiles = [...profiles, importedProfile];
      setProfiles(updatedProfiles);
      localStorage.setItem('a11y-profiles', JSON.stringify(updatedProfiles));
      
      toast({
        title: t('accessibility.profileImported', 'Profile imported successfully'),
        description: importedProfile.name
      });
      
      return importedProfile.id;
    } catch (error) {
      console.error('Failed to import accessibility profile', error);
      
      toast({
        title: t('error', 'Error'),
        description: t('accessibility.invalidProfileFormat', 'Invalid profile format'),
        variant: 'destructive'
      });
      
      return null;
    }
  };
  
  // إعادة تعيين جميع الإعدادات إلى الوضع الافتراضي
  const resetToDefaults = () => {
    setHighContrast(false);
    setLargeText(false);
    setReducedMotion(false);
    setFocusMode(false);
    
    setActiveProfile('default');
    localStorage.setItem('a11y-active-profile', 'default');
    
    toast({
      title: t('accessibility.resetToDefaults', 'Reset to defaults'),
      description: t('accessibility.settingsReset', 'All accessibility settings have been reset')
    });
  };
  
  return {
    profiles,
    activeProfile,
    saveCurrentSettings,
    applyProfile,
    deleteProfile,
    exportProfile,
    importProfile,
    resetToDefaults
  };
}
