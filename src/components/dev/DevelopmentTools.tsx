
import React, { useEffect } from 'react';
import { MissingKeysIndicator } from './MissingKeysIndicator';
import { useAppState } from '@/hooks/state/use-app-state';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

/**
 * مكون يجمع أدوات التطوير المختلفة التي يجب إظهارها في وضع المطور
 */
export function DevelopmentTools() {
  const { t } = useTranslation();
  const isDeveloperMode = useAppState(state => state.preferences?.developerMode);
  
  useEffect(() => {
    if (isDeveloperMode) {
      // إعلام المطور بأن وضع المطور نشط
      toast.info(
        t('developer.mode.active', 'وضع المطور نشط'),
        {
          description: t('developer.mode.description', 'يمكنك الوصول إلى أدوات التطوير المتقدمة الآن'),
          duration: 3000,
        }
      );
      
      // تسجيل معلومات المطور في وحدة التحكم
      console.info('[Dev Mode] أدوات التطوير نشطة');
      
      // إضافة فئة CSS للتحكم في أنماط وضع المطور
      document.body.classList.add('dev-mode-active');
    }
    
    return () => {
      // إزالة فئة CSS عند تفكيك المكون
      document.body.classList.remove('dev-mode-active');
    };
  }, [isDeveloperMode, t]);
  
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

export default DevelopmentTools;
