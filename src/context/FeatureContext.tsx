
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useAppState } from '@/hooks/state/use-app-state';

// تعريف واجهة الميزات المتاحة
interface Features {
  advancedSecurity: boolean;
  aiAssistant: boolean;
  zeroPower: boolean;
  holographicUI: boolean;
  networkIsolation: boolean;
  dnsOptimization: boolean;
  latencyHeatmap: boolean;
  trafficShaping: boolean;
  invisibleMode: boolean;
  networkCloning: boolean;
  multiNetwork: boolean;
  autoHealing: boolean;
  signalBooster: boolean;
  darkWebProtection: boolean;
  deviceHeat: boolean;
}

// نوع سياق وضع الميزات
interface ModeContextType {
  features: Features;
  isProMode: boolean;
  isDemoMode: boolean;
  toggleFeature: (feature: keyof Features) => void;
  enableAllFeatures: () => void;
  disableAllFeatures: () => void;
  upgradeToProMode: () => void;
}

// إنشاء سياق لوضع الميزات
const ModeContext = createContext<ModeContextType | undefined>(undefined);

// حالة الميزات الافتراضية (الإصدار المجاني)
const defaultFeatures: Features = {
  advancedSecurity: false,
  aiAssistant: false,
  zeroPower: true,
  holographicUI: false,
  networkIsolation: false,
  dnsOptimization: true,
  latencyHeatmap: false,
  trafficShaping: false,
  invisibleMode: false,
  networkCloning: false,
  multiNetwork: false,
  autoHealing: true,
  signalBooster: false,
  darkWebProtection: false,
  deviceHeat: true
};

// مزود سياق وضع الميزات
export const ModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [features, setFeatures] = useState<Features>(defaultFeatures);
  const [isProMode, setIsProMode] = useState<boolean>(false);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const { t } = useTranslation();
  const { preferences, setPreference } = useAppState();
  
  // التحقق مما إذا كان المستخدم في وضع المطور
  useEffect(() => {
    // استخدام developMode بدلاً من developerMode لأنه موجود في نوع AppPreferences
    const devMode = preferences.developerMode;
    
    // إذا كان في وضع المطور، فعّل وضع العرض التوضيحي
    if (devMode) {
      setIsDemoMode(true);
      
      // في وضع المطور، افتراضيًا نمكّن بعض الميزات الإضافية
      setFeatures(prev => ({
        ...prev,
        holographicUI: true,
        latencyHeatmap: true,
        aiAssistant: true,
        advancedSecurity: true
      }));
      
      toast.info(t('mode.developerModeEnabled', 'تم تفعيل وضع المطور'));
    }
  }, [preferences.developerMode, t]);
  
  // تبديل حالة ميزة معينة
  const toggleFeature = (feature: keyof Features) => {
    // التحقق مما إذا كانت الميزة متاحة فقط في الإصدار المدفوع
    const premiumFeatures: (keyof Features)[] = [
      'advancedSecurity', 
      'aiAssistant', 
      'holographicUI', 
      'networkIsolation',
      'trafficShaping',
      'darkWebProtection',
      'networkCloning'
    ];
    
    if (premiumFeatures.includes(feature) && !isProMode && !isDemoMode) {
      toast.error(t('mode.premiumFeatureError', 'هذه الميزة متوفرة فقط في الإصدار المدفوع'));
      return;
    }
    
    setFeatures(prev => {
      const newFeatures = { ...prev, [feature]: !prev[feature] };
      
      // عرض إشعار بتغيير حالة الميزة
      const status = newFeatures[feature] ? 
        t('mode.featureEnabled', 'تم تفعيل') : 
        t('mode.featureDisabled', 'تم تعطيل');
      
      toast.success(`${status} ${t(`features.${feature}`, feature)}`);
      
      return newFeatures;
    });
  };
  
  // تمكين جميع الميزات (مفيد في وضع العرض التوضيحي)
  const enableAllFeatures = () => {
    if (!isProMode && !isDemoMode) {
      toast.error(t('mode.enableAllError', 'يجب الترقية إلى الإصدار المدفوع لتفعيل جميع الميزات'));
      return;
    }
    
    const allEnabled = Object.keys(features).reduce((acc, key) => {
      acc[key as keyof Features] = true;
      return acc;
    }, {} as Features);
    
    setFeatures(allEnabled);
    toast.success(t('mode.allFeaturesEnabled', 'تم تفعيل جميع الميزات'));
  };
  
  // تعطيل جميع الميزات
  const disableAllFeatures = () => {
    const allDisabled = Object.keys(features).reduce((acc, key) => {
      acc[key as keyof Features] = false;
      return acc;
    }, {} as Features);
    
    setFeatures(allDisabled);
    toast.success(t('mode.allFeaturesDisabled', 'تم تعطيل جميع الميزات'));
  };
  
  // الترقية إلى الإصدار المدفوع
  const upgradeToProMode = () => {
    setIsProMode(true);
    toast.success(t('mode.upgradedToProMode', 'تمت الترقية إلى الإصدار المدفوع'));
    
    // فتح وضع المطور تلقائيًا مع الترقية إلى الإصدار المدفوع
    setPreference("developerMode", true);
  };
  
  return (
    <ModeContext.Provider 
      value={{
        features,
        isProMode,
        isDemoMode,
        toggleFeature,
        enableAllFeatures,
        disableAllFeatures,
        upgradeToProMode
      }}
    >
      {children}
    </ModeContext.Provider>
  );
};

// الخطاف لاستخدام سياق وضع الميزات
export const useMode = (): ModeContextType => {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
};
