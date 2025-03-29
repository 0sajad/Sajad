
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAppState } from '@/hooks/state/use-app-state';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

interface Feature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  toggle: () => void;
  available: boolean;
  requiresDevMode?: boolean;
}

interface FeatureContextType {
  features: Feature[];
  isFeatureEnabled: (featureId: string) => boolean;
  toggleFeature: (featureId: string) => void;
  isDevMode: boolean;
  toggleDevMode: () => void;
}

const FeatureContext = createContext<FeatureContextType | null>(null);

/**
 * مزود سياق الميزات
 * يدير حالة تفعيل ميزات التطبيق المختلفة
 */
export function FeatureProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const isDeveloperMode = useAppState(state => state.preferences.developerMode);
  const setPreference = useAppState(state => state.setPreference);
  const [isDevMode, setIsDevMode] = useState(isDeveloperMode);
  const [featureStates, setFeatureStates] = useState<Record<string, boolean>>({});
  
  // مزامنة وضع المطور مع تفضيلات التطبيق
  useEffect(() => {
    setIsDevMode(isDeveloperMode);
    
    // تحميل حالة الميزات من التخزين المحلي
    try {
      const savedFeatures = localStorage.getItem('featureStates');
      if (savedFeatures) {
        setFeatureStates(JSON.parse(savedFeatures));
      }
    } catch (error) {
      console.error('Error loading feature states:', error);
    }
  }, [isDeveloperMode]);
  
  // حفظ حالة الميزات عند تغييرها
  useEffect(() => {
    if (Object.keys(featureStates).length > 0) {
      localStorage.setItem('featureStates', JSON.stringify(featureStates));
    }
  }, [featureStates]);
  
  // تعريف قائمة الميزات
  const featureDefinitions: Omit<Feature, 'toggle'>[] = [
    {
      id: 'ai_assistant',
      name: t('features.aiAssistant', 'المساعد الذكي'),
      description: t('features.aiAssistantDesc', 'مساعد ذكاء اصطناعي متكامل للمساعدة في تحليل الشبكة'),
      enabled: getFeatureState('ai_assistant', true),
      available: true
    },
    {
      id: 'network_scanner',
      name: t('features.networkScanner', 'ماسح الشبكة'),
      description: t('features.networkScannerDesc', 'أداة متقدمة لمسح الشبكات واكتشاف الأجهزة'),
      enabled: getFeatureState('network_scanner', true),
      available: true
    },
    {
      id: 'security_analyzer',
      name: t('features.securityAnalyzer', 'محلل الأمان'),
      description: t('features.securityAnalyzerDesc', 'فحص وتحليل ثغرات الأمان في الشبكة'),
      enabled: getFeatureState('security_analyzer', true),
      available: true
    },
    {
      id: 'advanced_tools',
      name: t('features.advancedTools', 'أدوات متقدمة'),
      description: t('features.advancedToolsDesc', 'أدوات شبكة متقدمة للتحليل العميق'),
      enabled: getFeatureState('advanced_tools', false),
      available: true,
      requiresDevMode: true
    },
    {
      id: 'offline_mode',
      name: t('features.offlineMode', 'وضع عدم الاتصال'),
      description: t('features.offlineModeDesc', 'استخدام الأدوات والمحتوى دون اتصال بالإنترنت'),
      enabled: getFeatureState('offline_mode', true),
      available: true
    },
    {
      id: 'data_analytics',
      name: t('features.dataAnalytics', 'تحليل البيانات'),
      description: t('features.dataAnalyticsDesc', 'تحليل متقدم للبيانات ومخططات تفاعلية'),
      enabled: getFeatureState('data_analytics', false),
      available: true,
      requiresDevMode: true
    },
    {
      id: 'experimental',
      name: t('features.experimental', 'ميزات تجريبية'),
      description: t('features.experimentalDesc', 'ميزات قيد التطوير وقد تكون غير مستقرة'),
      enabled: getFeatureState('experimental', false),
      available: isDevMode,
      requiresDevMode: true
    }
  ];
  
  // الحصول على حالة ميزة معينة
  function getFeatureState(featureId: string, defaultValue: boolean): boolean {
    if (featureId in featureStates) {
      return featureStates[featureId];
    }
    return defaultValue;
  }
  
  // تبديل حالة ميزة معينة
  const toggleFeature = (featureId: string) => {
    const feature = featureDefinitions.find(f => f.id === featureId);
    
    if (!feature) {
      console.error(`Feature with ID ${featureId} not found`);
      return;
    }
    
    // التحقق من متطلبات وضع المطور
    if (feature.requiresDevMode && !isDevMode) {
      toast.error(t('features.devModeRequired', 'هذه الميزة تتطلب وضع المطور'));
      return;
    }
    
    const newEnabled = !getFeatureState(featureId, feature.enabled);
    setFeatureStates(prev => ({
      ...prev,
      [featureId]: newEnabled
    }));
    
    toast.success(
      newEnabled 
        ? t('features.featureEnabled', 'تم تفعيل الميزة') 
        : t('features.featureDisabled', 'تم تعطيل الميزة')
    );
  };
  
  // التحقق من تفعيل ميزة معينة
  const isFeatureEnabled = (featureId: string) => {
    const feature = featureDefinitions.find(f => f.id === featureId);
    if (!feature) {
      return false;
    }
    
    // إذا كانت الميزة تتطلب وضع المطور ولكنه غير مفعل
    if (feature.requiresDevMode && !isDevMode) {
      return false;
    }
    
    return getFeatureState(featureId, feature.enabled);
  };
  
  // تبديل وضع المطور
  const toggleDevMode = () => {
    const newMode = !isDevMode;
    setIsDevMode(newMode);
    setPreference('developerMode', newMode);
    
    toast.success(
      newMode 
        ? t('features.devModeEnabled', 'تم تفعيل وضع المطور') 
        : t('features.devModeDisabled', 'تم تعطيل وضع المطور')
    );
  };
  
  // دمج الميزات مع دوال التبديل
  const features: Feature[] = featureDefinitions.map(feature => ({
    ...feature,
    toggle: () => toggleFeature(feature.id)
  }));
  
  return (
    <FeatureContext.Provider 
      value={{ 
        features, 
        isFeatureEnabled, 
        toggleFeature, 
        isDevMode,
        toggleDevMode
      }}
    >
      {children}
    </FeatureContext.Provider>
  );
}

export function useFeatures() {
  const context = useContext(FeatureContext);
  if (!context) {
    throw new Error('useFeatures must be used within a FeatureProvider');
  }
  return context;
}
