
import { AppState } from './types';
import { toast } from 'sonner';

/**
 * وظائف مساعدة لإدارة حالة التطبيق
 */

// الحصول على إصدار مخزون من الحالة (لأغراض التصدير)
export function getSerializableState(state: AppState): any {
  return {
    preferences: state.preferences,
    highContrast: state.highContrast,
    largeText: state.largeText,
    reducedMotion: state.reducedMotion,
    focusMode: state.focusMode,
    dyslexicFont: state.dyslexicFont,
    readingGuide: state.readingGuide,
    colorBlindMode: state.colorBlindMode,
    soundFeedback: state.soundFeedback,
    keyboardNavigationVisible: state.keyboardNavigationVisible,
    networkStatus: state.networkStatus,
    dataLoading: state.dataLoading,
    userId: state.userId,
    userRole: state.userRole,
    userSettings: state.userSettings,
    isAuthenticated: state.isAuthenticated,
    deviceTier: state.deviceTier,
    cachedData: state.cachedData,
    // لا نقوم بتضمين المعلومات المؤقتة مثل modals، isLoading، إلخ.
  };
}

// استرداد الحالة من تخزين المتصفح
export function loadStateFromStorage(key: string): Partial<AppState> | null {
  try {
    const storedState = localStorage.getItem(key);
    if (!storedState) return null;
    
    return JSON.parse(storedState);
  } catch (error) {
    console.error('Error loading state from storage:', error);
    return null;
  }
}

// حفظ الحالة في تخزين المتصفح
export function saveStateToStorage(key: string, state: any): boolean {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
    return true;
  } catch (error) {
    console.error('Error saving state to storage:', error);
    return false;
  }
}

// تصدير الحالة الحالية إلى ملف
export function exportStateToFile(state: AppState): void {
  try {
    const exportableState = getSerializableState(state);
    const dataStr = JSON.stringify(exportableState, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `octa-network-settings-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success('تم تصدير الإعدادات بنجاح');
  } catch (error) {
    console.error('Error exporting state:', error);
    toast.error('فشل تصدير الإعدادات');
  }
}

// استيراد الحالة من ملف
export async function importStateFromFile(file: File, setter: (state: Partial<AppState>) => void): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          if (!event.target?.result) {
            toast.error('فشل قراءة الملف');
            resolve(false);
            return;
          }
          
          const importedState = JSON.parse(event.target.result as string);
          
          // التحقق من صحة المحتوى المستورد
          if (!importedState || typeof importedState !== 'object') {
            toast.error('ملف غير صالح');
            resolve(false);
            return;
          }
          
          // استدعاء الدالة المعالجة مع البيانات المستوردة
          setter(importedState);
          toast.success('تم استيراد الإعدادات بنجاح');
          resolve(true);
        } catch (parseError) {
          console.error('Error parsing imported state:', parseError);
          toast.error('فشل تحليل الملف المستورد');
          resolve(false);
        }
      };
      
      reader.onerror = () => {
        toast.error('فشل قراءة الملف');
        resolve(false);
      };
      
      reader.readAsText(file);
    } catch (error) {
      console.error('Error importing state:', error);
      toast.error('فشل استيراد الإعدادات');
      resolve(false);
    }
  });
}

// إعادة تعيين الحالة
export function resetState(
  state: AppState, 
  categories: ('preferences' | 'accessibility' | 'network' | 'all')[] = ['all']
): Partial<AppState> {
  const resetState: Partial<AppState> = {};
  
  if (categories.includes('all') || categories.includes('preferences')) {
    resetState.preferences = {
      theme: 'system',
      language: 'ar',
      notifications: true,
      telemetry: false,
      animations: true,
      fullWidthLayout: false,
      compactMode: false,
      soundEffects: false,
      highContrast: false,
      largeText: false,
      reducedMotion: false,
      focusMode: false,
      arabicNumerals: false,
      autoSave: true,
      notificationsEnabled: true,
      fontSize: 'normal',
      animationsEnabled: true,
      autoRefresh: true,
      refreshRate: 30,
      developerMode: false,
      analyticsEnabled: true,
      colorBlindMode: 'none',
      dyslexicFont: false,
      readingGuide: false,
      soundFeedback: false,
      syncSystemPreferences: true
    };
  }
  
  if (categories.includes('all') || categories.includes('accessibility')) {
    resetState.highContrast = false;
    resetState.largeText = false;
    resetState.reducedMotion = false;
    resetState.focusMode = false;
    resetState.dyslexicFont = false;
    resetState.readingGuide = false;
    resetState.colorBlindMode = 'none';
    resetState.soundFeedback = false;
    resetState.keyboardNavigationVisible = false;
  }
  
  if (categories.includes('all') || categories.includes('network')) {
    resetState.networkStatus = {
      isConnected: true,
      isOnline: true,
      lastCheck: null
    };
    resetState.dataLoading = {
      isLoading: false,
      lastUpdated: null,
      error: null
    };
  }
  
  return resetState;
}
