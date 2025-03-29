
import React, { useEffect } from 'react';
import { MissingKeysIndicator } from './MissingKeysIndicator';
import { useAppState } from '@/hooks/state/use-app-state';

/**
 * مكون يجمع أدوات التطوير المختلفة التي يجب إظهارها في وضع المطور
 */
export function DevelopmentTools() {
  const isDeveloperMode = useAppState(state => state.preferences.developerMode);
  
  // إذا لم يكن في وضع المطور، لا تعرض أي أدوات
  if (!isDeveloperMode) {
    return null;
  }
  
  return (
    <>
      {/* مؤشر المفاتيح المفقودة - يظهر فقط عندما تكون هناك مفاتيح مفقودة */}
      <MissingKeysIndicator />
      
      {/* يمكن إضافة أدوات تطوير أخرى هنا لاحقاً */}
    </>
  );
}
