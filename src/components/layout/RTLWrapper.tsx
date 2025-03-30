
import React, { ReactNode, useEffect } from 'react';
import { useRTLSupport } from '@/hooks/useRTLSupport';
import { ArabicTextProvider } from '../text/ArabicTextProvider';

// استيراد أنماط RTL المحسنة
import '@/styles/rtl.css';
import '@/styles/rtl-support.css';
import '@/styles/rtl-enhanced.css';

interface RTLWrapperProps {
  children: ReactNode;
  forceRTL?: boolean;
  enforceRTLLanguages?: string[];
}

/**
 * غلاف لدعم اللغات ذات الاتجاه من اليمين إلى اليسار (RTL)
 * يقوم بتطبيق الأنماط والإعدادات اللازمة لدعم RTL بشكل شامل
 */
export function RTLWrapper({
  children,
  forceRTL = false,
  enforceRTLLanguages = ['ar', 'ar-iq', 'he', 'ur', 'fa']
}: RTLWrapperProps) {
  const { isRTL } = useRTLSupport({
    enforceRTL: forceRTL,
    enforceSpecificLanguages: enforceRTLLanguages
  });

  // تطبيق خصائص RTL على body و html عند تغير isRTL
  useEffect(() => {
    if (isRTL) {
      document.documentElement.setAttribute('dir', 'rtl');
      document.body.classList.add('rtl-active');

      // إضافة فئة خاصة للنماذج والجداول عند استخدام RTL
      document.body.classList.add('rtl-forms');
      document.body.classList.add('rtl-tables');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.body.classList.remove('rtl-active');
      document.body.classList.remove('rtl-forms');
      document.body.classList.remove('rtl-tables');
    }

    // مساعدة مكتبات JavaScript التي تعتمد على معرفة الاتجاه
    if (typeof window !== 'undefined') {
      (window as any).isRTL = isRTL;
    }
  }, [isRTL]);

  return (
    <ArabicTextProvider>
      <div className={isRTL ? 'rtl-layout' : 'ltr-layout'}>
        {children}
      </div>
    </ArabicTextProvider>
  );
}
