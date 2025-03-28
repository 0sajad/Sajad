
import React, { ReactNode, useEffect } from 'react';
import { A11yProvider } from '@/hooks/accessibility/useA11yContext';
import { useAppState } from '@/hooks/state/use-app-state';
import { RTLWrapper } from '@/components/layout/RTLWrapper';

// استيراد أنماط إمكانية الوصول
import '@/styles/accessibility-optimized.css';

// مكون لعرض نص مخصص لقارئات الشاشة فقط
const ScreenReaderAnnouncement = ({ children }: { children: ReactNode }) => (
  <div className="sr-only" aria-live="polite" aria-atomic="true">
    {children}
  </div>
);

interface A11yWrapperProps {
  children: ReactNode;
}

/**
 * غلاف لدعم ميزات إمكانية الوصول في التطبيق
 * يجمع بين دعم RTL وإمكانية الوصول
 */
export function A11yWrapper({ children }: A11yWrapperProps) {
  const a11yState = useAppState(state => ({
    highContrast: state.highContrast,
    largeText: state.largeText,
    reducedMotion: state.reducedMotion,
    focusMode: state.focusMode,
    dyslexicFont: state.dyslexicFont,
    readingGuide: state.readingGuide,
    soundFeedback: state.soundFeedback,
    colorBlindMode: state.colorBlindMode
  }));
  
  // تطبيق فئات CSS المناسبة على الـ body عند تغير الحالة
  useEffect(() => {
    const classes = document.body.classList;
    
    // إضافة أو إزالة الفئات بناءً على الحالة
    a11yState.highContrast ? classes.add('high-contrast') : classes.remove('high-contrast');
    a11yState.largeText ? classes.add('large-text') : classes.remove('large-text');
    a11yState.reducedMotion ? classes.add('reduced-motion') : classes.remove('reduced-motion');
    a11yState.focusMode ? classes.add('focus-mode') : classes.remove('focus-mode');
    a11yState.dyslexicFont ? classes.add('dyslexic-font') : classes.remove('dyslexic-font');
    a11yState.readingGuide ? classes.add('reading-guide-active') : classes.remove('reading-guide-active');
    
    // التعامل مع وضع عمى الألوان
    classes.remove('protanopia', 'deuteranopia', 'tritanopia', 'achromatopsia');
    if (a11yState.colorBlindMode !== 'none') {
      classes.add(a11yState.colorBlindMode);
    }
    
    // تطبيق تقليل الحركة بناءً على تفضيلات المستخدم
    if (a11yState.reducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      classes.add('reduced-motion-app');
    } else {
      classes.remove('reduced-motion-app');
    }
  }, [a11yState]);
  
  return (
    <A11yProvider>
      <RTLWrapper>
        {/* مكون الإعلان لقارئات الشاشة */}
        <ScreenReaderAnnouncement>
          تم تحميل التطبيق، استخدم مفتاح Tab للتنقل بواسطة لوحة المفاتيح
        </ScreenReaderAnnouncement>
        
        {/* إضافة مكون دليل القراءة إذا كان مفعلاً */}
        {a11yState.readingGuide && (
          <div className="reading-guide-container" aria-hidden="true">
            <div className="reading-guide-bar" />
          </div>
        )}
        
        {/* محتوى التطبيق */}
        <div 
          className={`a11y-content ${a11yState.focusMode ? 'focus-mode-content' : ''}`}
          id="main-content"
        >
          {children}
        </div>
      </RTLWrapper>
    </A11yProvider>
  );
}
