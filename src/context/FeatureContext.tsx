
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAppState } from '@/hooks/state/use-app-state';

// تعريف نوع للميزة
interface Feature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  toggle: () => void;
}

// تعريف سياق الميزات
interface FeatureContextType {
  isDevMode: boolean;
  features: Feature[];
  toggleFeature: (featureId: string) => void;
  toggleDevMode: () => void;
}

// إنشاء سياق الميزات
const FeatureContext = createContext<FeatureContextType | undefined>(undefined);

// مكون مزود الميزات
export function FeatureProvider({ children }: { children: ReactNode }) {
  // الوصول إلى حالة التطبيق
  const { preferences, setPreference } = useAppState(state => ({
    preferences: state.preferences,
    setPreference: state.setPreference
  }));
  
  // وضع المطور
  const isDevMode = preferences.developerMode || false;
  
  // حالة ميزات التطبيق
  const [features, setFeatures] = useState<Feature[]>([
    {
      id: 'advancedSecurity',
      name: 'الأمان المتقدم',
      description: 'ميزات أمان إضافية لتحسين حماية التطبيق',
      enabled: false,
      toggle: () => toggleFeature('advancedSecurity')
    },
    {
      id: 'aiAssistant',
      name: 'المساعد الذكي',
      description: 'مساعد ذكاء اصطناعي لمساعدة المستخدمين',
      enabled: false,
      toggle: () => toggleFeature('aiAssistant')
    },
    {
      id: 'networkAnalyzer',
      name: 'محلل الشبكة',
      description: 'أدوات متقدمة لتحليل أداء الشبكة',
      enabled: true,
      toggle: () => toggleFeature('networkAnalyzer')
    },
    {
      id: 'debugMode',
      name: 'وضع التصحيح',
      description: 'أدوات مطور إضافية للتصحيح',
      enabled: false,
      toggle: () => toggleFeature('debugMode')
    }
  ]);
  
  // تبديل حالة الميزة
  const toggleFeature = (featureId: string) => {
    setFeatures(prevFeatures => 
      prevFeatures.map(feature => 
        feature.id === featureId 
          ? { ...feature, enabled: !feature.enabled } 
          : feature
      )
    );
  };
  
  // تبديل وضع المطور
  const toggleDevMode = () => {
    setPreference('developerMode', !isDevMode);
  };
  
  // قيمة السياق
  const contextValue: FeatureContextType = {
    isDevMode,
    features,
    toggleFeature,
    toggleDevMode
  };

  return (
    <FeatureContext.Provider value={contextValue}>
      {children}
    </FeatureContext.Provider>
  );
}

// خطاف استخدام سياق الميزات
export const useFeatureContext = () => {
  const context = useContext(FeatureContext);
  if (context === undefined) {
    throw new Error('useFeatureContext must be used within a FeatureProvider');
  }
  return context;
};

// عنصر عام لعرض الميزات التجريبية فقط في وضع المطور
export function DeveloperFeature({ 
  children, 
  showInProd = false 
}: { 
  children: ReactNode;
  showInProd?: boolean;
}) {
  const { isDevMode } = useFeatureContext();
  
  const isProduction = process.env.NODE_ENV === 'production';
  
  // عرض في وضع المطور، أو في الإنتاج إذا كان مسموحًا به
  if (isDevMode || (isProduction && showInProd)) {
    return <>{children}</>;
  }
  
  return null;
}
