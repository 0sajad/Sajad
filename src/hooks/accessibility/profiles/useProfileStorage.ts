
import { A11ySettings } from '../../types/accessibility';
import { toast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';

/**
 * Hook for handling accessibility profile storage operations
 */
export function useProfileStorage() {
  const { t } = useTranslation();
  const STORAGE_KEY = 'a11yProfiles';
  const BACKUP_KEY = 'a11yProfilesBackup';
  const VERSION_KEY = 'a11yProfilesVersion';
  
  /**
   * Save an accessibility profile
   */
  const saveProfile = (profileName: string, settings: A11ySettings) => {
    const profiles = getProfiles();
    
    // أرشفة النسخة السابقة قبل التحديث
    if (profiles[profileName]) {
      createBackup(profiles);
    }
    
    // تحديث الملف الشخصي مع طابع زمني للإصدار
    profiles[profileName] = {
      ...settings,
      updatedAt: new Date().toISOString(),
      version: getCurrentVersion() + 1
    };
    
    // حفظ البيانات المحدثة
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
    incrementVersion();
    
    // عرض إشعار للمستخدم
    toast({
      title: t('accessibility.profileSaved', 'تم حفظ الملف الشخصي'),
      description: t('accessibility.profileSavedDescription', 'تم حفظ الملف الشخصي "{name}" بنجاح', { name: profileName }),
    });
    
    return profileName;
  };
  
  /**
   * Get all saved accessibility profiles
   */
  const getProfiles = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  };
  
  /**
   * Delete a profile by name
   */
  const deleteProfile = (profileName: string) => {
    const profiles = getProfiles();
    if (profiles[profileName]) {
      // إنشاء نسخة احتياطية قبل الحذف
      createBackup(profiles);
      
      delete profiles[profileName];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
      incrementVersion();
      
      // عرض إشعار للمستخدم
      toast({
        title: t('accessibility.profileDeleted', 'تم حذف الملف الشخصي'),
        description: t('accessibility.profileDeletedDescription', 'تم حذف الملف الشخصي "{name}" بنجاح', { name: profileName }),
      });
      
      return true;
    }
    return false;
  };
  
  /**
   * Create automatic backup of profiles
   */
  const createBackup = (profiles: Record<string, any>) => {
    try {
      const timestamp = new Date().toISOString();
      const currentBackups = JSON.parse(localStorage.getItem(BACKUP_KEY) || '[]');
      
      // الاحتفاظ بآخر 5 نسخ احتياطية فقط
      if (currentBackups.length >= 5) {
        currentBackups.pop(); // إزالة أقدم نسخة
      }
      
      // إضافة النسخة الاحتياطية الجديدة في بداية المصفوفة
      currentBackups.unshift({
        timestamp,
        version: getCurrentVersion(),
        data: JSON.parse(JSON.stringify(profiles))
      });
      
      localStorage.setItem(BACKUP_KEY, JSON.stringify(currentBackups));
      
      return true;
    } catch (error) {
      console.error('Failed to create backup:', error);
      return false;
    }
  };
  
  /**
   * Get all available backups
   */
  const getBackups = () => {
    return JSON.parse(localStorage.getItem(BACKUP_KEY) || '[]');
  };
  
  /**
   * Restore profiles from a backup
   */
  const restoreFromBackup = (backupIndex: number) => {
    try {
      const backups = getBackups();
      if (backupIndex >= 0 && backupIndex < backups.length) {
        const backup = backups[backupIndex];
        
        // حفظ النسخة الحالية قبل الاستعادة
        createBackup(getProfiles());
        
        // استعادة من النسخة الاحتياطية
        localStorage.setItem(STORAGE_KEY, JSON.stringify(backup.data));
        incrementVersion();
        
        // عرض إشعار للمستخدم
        const date = new Date(backup.timestamp).toLocaleString();
        toast({
          title: t('accessibility.backupRestored', 'تم استعادة النسخة الاحتياطية'),
          description: t('accessibility.backupRestoredDescription', 'تم استعادة النسخة الاحتياطية من {date}', { date }),
        });
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to restore from backup:', error);
      toast({
        title: t('accessibility.backupRestoreFailed', 'فشل استعادة النسخة الاحتياطية'),
        description: t('accessibility.backupRestoreFailedDescription', 'حدث خطأ أثناء استعادة النسخة الاحتياطية'),
        variant: 'destructive'
      });
      return false;
    }
  };
  
  /**
   * Get the current version of profiles
   */
  const getCurrentVersion = (): number => {
    const version = parseInt(localStorage.getItem(VERSION_KEY) || '0', 10);
    return isNaN(version) ? 0 : version;
  };
  
  /**
   * Increment the version counter
   */
  const incrementVersion = () => {
    const currentVersion = getCurrentVersion();
    localStorage.setItem(VERSION_KEY, (currentVersion + 1).toString());
  };
  
  /**
   * Check if automatic backups are available
   */
  const hasBackups = (): boolean => {
    const backups = getBackups();
    return backups.length > 0;
  };
  
  return {
    saveProfile,
    getProfiles,
    deleteProfile,
    createBackup,
    getBackups,
    restoreFromBackup,
    hasBackups,
    getCurrentVersion
  };
}
