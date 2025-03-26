
import { useEffect, useCallback } from 'react';
import { useA11y } from '@/hooks/useA11y';
import { useAccessibilityAnnouncer } from '@/hooks/useAccessibilityAnnouncer';
import { useTranslation } from 'react-i18next';

/**
 * هوك لإعداد اختصارات لوحة المفاتيح للميزات المختلفة
 */
export function useKeyboardShortcuts() {
  const { 
    highContrast, setHighContrast,
    largeText, setLargeText,
    reducedMotion, setReducedMotion,
    focusMode, setFocusMode,
    dyslexicFont, setDyslexicFont,
    readingGuide, setReadingGuide
  } = useA11y();
  
  const { announce } = useAccessibilityAnnouncer();
  const { t } = useTranslation();
  
  // إظهار نافذة اختصارات لوحة المفاتيح
  const showKeyboardShortcutsHelp = useCallback(() => {
    announce(t('accessibility.showingKeyboardShortcuts', 'عرض اختصارات لوحة المفاتيح'), 'info');
    
    // قد تريد هنا فتح مربع حوار أو عنصر متراكب يعرض كل الاختصارات
    const helpDialog = document.createElement('div');
    helpDialog.setAttribute('role', 'dialog');
    helpDialog.setAttribute('aria-modal', 'true');
    helpDialog.setAttribute('aria-labelledby', 'keyboardShortcutsTitle');
    helpDialog.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm';
    
    const dialogContent = document.createElement('div');
    dialogContent.className = 'bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto';
    dialogContent.innerHTML = `
      <h2 id="keyboardShortcutsTitle" class="text-xl font-bold mb-4">${t('accessibility.keyboardShortcuts', 'اختصارات لوحة المفاتيح')}</h2>
      <ul class="space-y-2">
        <li class="flex justify-between"><span>Alt+C</span><span>${t('accessibility.toggleHighContrast', 'تبديل وضع التباين العالي')}</span></li>
        <li class="flex justify-between"><span>Alt+T</span><span>${t('accessibility.toggleLargeText', 'تبديل النص الكبير')}</span></li>
        <li class="flex justify-between"><span>Alt+M</span><span>${t('accessibility.toggleReducedMotion', 'تبديل تقليل الحركة')}</span></li>
        <li class="flex justify-between"><span>Alt+F</span><span>${t('accessibility.toggleFocusMode', 'تبديل وضع التركيز')}</span></li>
        <li class="flex justify-between"><span>Alt+D</span><span>${t('accessibility.toggleDyslexicFont', 'تبديل خط عسر القراءة')}</span></li>
        <li class="flex justify-between"><span>Alt+R</span><span>${t('accessibility.toggleReadingGuide', 'تبديل دليل القراءة')}</span></li>
        <li class="flex justify-between"><span>Alt+?</span><span>${t('accessibility.showKeyboardShortcuts', 'عرض اختصارات لوحة المفاتيح')}</span></li>
      </ul>
      <button class="mt-4 px-4 py-2 bg-primary text-white rounded-md">${t('common.close', 'إغلاق')}</button>
    `;
    
    helpDialog.appendChild(dialogContent);
    document.body.appendChild(helpDialog);
    
    const closeButton = dialogContent.querySelector('button');
    if (closeButton) {
      closeButton.focus();
      closeButton.addEventListener('click', () => {
        document.body.removeChild(helpDialog);
      });
    }
    
    helpDialog.addEventListener('click', (e) => {
      if (e.target === helpDialog) {
        document.body.removeChild(helpDialog);
      }
    });
    
    document.addEventListener('keydown', function closeOnEscape(e) {
      if (e.key === 'Escape') {
        document.body.removeChild(helpDialog);
        document.removeEventListener('keydown', closeOnEscape);
      }
    });
  }, [announce, t]);
  
  // معالج اختصارات لوحة المفاتيح
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.altKey) {
      switch (e.key.toLowerCase()) {
        case 'c': // تبديل التباين العالي
          e.preventDefault();
          setHighContrast(!highContrast);
          announce(
            highContrast 
              ? t('accessibility.highContrastDisabled', 'تم تعطيل وضع التباين العالي') 
              : t('accessibility.highContrastEnabled', 'تم تفعيل وضع التباين العالي'),
            'info'
          );
          break;
          
        case 't': // تبديل النص الكبير
          e.preventDefault();
          setLargeText(!largeText);
          announce(
            largeText 
              ? t('accessibility.largeTextDisabled', 'تم تعطيل النص الكبير') 
              : t('accessibility.largeTextEnabled', 'تم تفعيل النص الكبير'),
            'info'
          );
          break;
          
        case 'm': // تبديل تقليل الحركة
          e.preventDefault();
          setReducedMotion(!reducedMotion);
          announce(
            reducedMotion 
              ? t('accessibility.reducedMotionDisabled', 'تم تعطيل تقليل الحركة') 
              : t('accessibility.reducedMotionEnabled', 'تم تفعيل تقليل الحركة'),
            'info'
          );
          break;
          
        case 'f': // تبديل وضع التركيز
          e.preventDefault();
          setFocusMode(!focusMode);
          announce(
            focusMode 
              ? t('accessibility.focusModeDisabled', 'تم تعطيل وضع التركيز') 
              : t('accessibility.focusModeEnabled', 'تم تفعيل وضع التركيز'),
            'info'
          );
          break;
          
        case 'd': // تبديل خط عسر القراءة
          e.preventDefault();
          setDyslexicFont(!dyslexicFont);
          announce(
            dyslexicFont 
              ? t('accessibility.dyslexicFontDisabled', 'تم تعطيل خط عسر القراءة') 
              : t('accessibility.dyslexicFontEnabled', 'تم تفعيل خط عسر القراءة'),
            'info'
          );
          break;
          
        case 'r': // تبديل دليل القراءة
          e.preventDefault();
          setReadingGuide(!readingGuide);
          announce(
            readingGuide 
              ? t('accessibility.readingGuideDisabled', 'تم تعطيل دليل القراءة') 
              : t('accessibility.readingGuideEnabled', 'تم تفعيل دليل القراءة'),
            'info'
          );
          break;
          
        case '?': // عرض اختصارات لوحة المفاتيح
        case '/':
          e.preventDefault();
          showKeyboardShortcutsHelp();
          break;
      }
    }
  }, [
    highContrast, setHighContrast,
    largeText, setLargeText,
    reducedMotion, setReducedMotion,
    focusMode, setFocusMode,
    dyslexicFont, setDyslexicFont,
    readingGuide, setReadingGuide,
    announce, t, showKeyboardShortcutsHelp
  ]);
  
  // تسجيل معالج الاختصارات
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  
  return null; // هذا الهوك ليس له قيمة إرجاع
}
