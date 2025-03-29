
import React from 'react';
import { useAppState } from './hooks/state/use-app-state';
import { DevelopmentTools } from './components/dev/DevelopmentTools';

/**
 * المغلف الرئيسي لأدوات التطوير في التطبيق
 * يعمل على عرض أدوات المطورين عندما يكون وضع المطور مفعلاً
 */
export function DevelopmentWrapper({ children }: { children: React.ReactNode }) {
  const isDeveloperMode = useAppState(state => state.preferences.developerMode);
  
  return (
    <>
      {children}
      
      {/* أدوات التطوير التي تظهر فقط في وضع المطور */}
      {isDeveloperMode && <DevelopmentTools />}
    </>
  );
}
