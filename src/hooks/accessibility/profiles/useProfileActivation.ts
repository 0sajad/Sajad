
import { toast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';
import { Accessibility } from 'lucide-react';

/**
 * Hook for handling profile activation
 */
export function useProfileActivation(
  setHighContrast: (value: boolean) => void,
  setLargeText: (value: boolean) => void,
  setReducedMotion: (value: boolean) => void,
  setFocusMode: (value: boolean) => void,
  setColorBlindMode: (value: string | null) => void,
  setDyslexicFont: (value: boolean) => void,
  setReadingGuide: (value: boolean) => void,
  setSoundFeedback: (value: boolean) => void
) {
  const { t } = useTranslation();
  const ACTIVE_PROFILE_KEY = 'a11yActiveProfile';
  
  /**
   * Load and apply a profile by name
   */
  const loadProfile = (profileName: string, getProfilesFunc: () => Record<string, any>) => {
    try {
      const profiles = getProfilesFunc();
      const profile = profiles[profileName];
      
      if (!profile) {
        // إشعار بعدم وجود الملف الشخصي
        toast({
          title: t('accessibility.profileNotFound', 'الملف الشخصي غير موجود'),
          description: t('accessibility.profileNotFoundDescription', 'لم يتم العثور على الملف الشخصي "{name}"', { name: profileName }),
          variant: 'destructive'
        });
        return false;
      }
      
      // تطبيق إعدادات الملف الشخصي
      setHighContrast(profile.highContrast ?? false);
      setLargeText(profile.largeText ?? false);
      setReducedMotion(profile.reducedMotion ?? false);
      setFocusMode(profile.focusMode ?? false);
      setColorBlindMode(profile.colorBlindMode ?? null);
      setDyslexicFont(profile.dyslexicFont ?? false);
      setReadingGuide(profile.readingGuide ?? false);
      setSoundFeedback(profile.soundFeedback ?? false);
      
      // حفظ الملف الشخصي النشط
      localStorage.setItem(ACTIVE_PROFILE_KEY, profileName);
      
      // عرض الميزات المفعلة في الإشعار
      const enabledFeatures = getEnabledFeatures(profile);
      
      // إشعار بنجاح تحميل الملف الشخصي
      toast({
        title: t('accessibility.profileLoaded', 'تم تحميل الملف الشخصي'),
        description: enabledFeatures.length > 0 
          ? t('accessibility.enabledFeatures', 'الميزات المفعلة: {features}', { features: enabledFeatures.join('، ') })
          : t('accessibility.noFeaturesEnabled', 'لا توجد ميزات مفعلة في هذا الملف'),
        icon: <Accessibility className="h-4 w-4 text-primary" />
      });
      
      // إعلان للقارئات الشاشية
      announceProfileChange(profileName, enabledFeatures);
      
      return true;
    } catch (error) {
      console.error('Failed to load profile:', error);
      
      // إشعار بفشل تحميل الملف الشخصي
      toast({
        title: t('accessibility.profileLoadFailed', 'فشل تحميل الملف الشخصي'),
        description: t('accessibility.profileLoadFailedDescription', 'حدث خطأ أثناء تحميل الملف الشخصي'),
        variant: 'destructive'
      });
      
      return false;
    }
  };
  
  /**
   * Get the active profile name
   */
  const getActiveProfile = (): string | null => {
    return localStorage.getItem(ACTIVE_PROFILE_KEY);
  };
  
  /**
   * Get list of enabled features in a profile
   */
  const getEnabledFeatures = (profile: any): string[] => {
    const features = [];
    
    if (profile.highContrast) features.push(t('accessibility.highContrast', 'تباين عالي'));
    if (profile.largeText) features.push(t('accessibility.largeText', 'نص كبير'));
    if (profile.reducedMotion) features.push(t('accessibility.reducedMotion', 'تقليل الحركة'));
    if (profile.focusMode) features.push(t('accessibility.focusMode', 'وضع التركيز'));
    if (profile.colorBlindMode) features.push(t('accessibility.colorBlindMode', 'وضع عمى الألوان'));
    if (profile.dyslexicFont) features.push(t('accessibility.dyslexicFont', 'خط عسر القراءة'));
    if (profile.readingGuide) features.push(t('accessibility.readingGuide', 'دليل القراءة'));
    if (profile.soundFeedback) features.push(t('accessibility.soundFeedback', 'تعليقات صوتية'));
    
    return features;
  };
  
  /**
   * Announce profile change to screen readers
   */
  const announceProfileChange = (profileName: string, enabledFeatures: string[]) => {
    const message = enabledFeatures.length > 0 
      ? t('accessibility.profileAnnouncementWithFeatures', 'تم تنشيط الملف الشخصي {name} مع الميزات: {features}', { 
          name: profileName, 
          features: enabledFeatures.join('، ') 
        })
      : t('accessibility.profileAnnouncement', 'تم تنشيط الملف الشخصي {name}', { name: profileName });
    
    if (window.announce) {
      window.announce(message, 'polite');
    } else {
      // إنشاء عنصر إعلان مؤقت للقارئات الشاشية
      const announcer = document.createElement('div');
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.className = 'sr-only';
      announcer.textContent = message;
      
      document.body.appendChild(announcer);
      
      // إزالة العنصر بعد فترة كافية
      setTimeout(() => {
        if (document.body.contains(announcer)) {
          document.body.removeChild(announcer);
        }
      }, 3000);
    }
  };
  
  return {
    loadProfile,
    getActiveProfile
  };
}
