
import React, { Suspense } from 'react';
import { useA11y } from "@/hooks/useA11y";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";

// استخدام التحميل البطيء للمكونات الإضافية
const ReadingGuide = React.lazy(() => import("@/components/ui/accessibility/reading-guide").then(m => ({ default: m.ReadingGuide })));
const KeyboardNavigationMenu = React.lazy(() => import("@/components/ui/accessibility/keyboard-navigation-menu").then(m => ({ default: m.KeyboardNavigationMenu })));

/**
 * مكون يجمع كل عناصر إمكانية الوصول المرئية التي تظهر فوق المحتوى
 */
export function AccessibilityOverlay() {
  const { 
    readingGuide, 
    keyboardNavigationVisible
  } = useA11y();
  
  const { isNavigatingWithKeyboard } = useKeyboardNavigation();
  
  return (
    <>
      {/* إضافة مؤشر التنقل بلوحة المفاتيح */}
      {isNavigatingWithKeyboard && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="focus-outline-indicator" aria-hidden="true"></div>
        </div>
      )}
      
      {/* إضافة مكون دليل القراءة إذا كان مفعلاً */}
      {readingGuide && (
        <Suspense fallback={null}>
          <ReadingGuide />
        </Suspense>
      )}
      
      {/* إضافة قائمة التنقل بلوحة المفاتيح إذا كانت مرئية */}
      {keyboardNavigationVisible && (
        <Suspense fallback={null}>
          <KeyboardNavigationMenu visible={keyboardNavigationVisible} />
        </Suspense>
      )}
    </>
  );
}

// أضف تصدير افتراضي للتوافق مع التحميل الكسول
export default AccessibilityOverlay;
