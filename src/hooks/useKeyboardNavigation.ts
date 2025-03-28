
import { useState, useEffect } from 'react';
import { useA11y } from './useA11y';

export function useKeyboardNavigation() {
  const [isNavigatingWithKeyboard, setIsNavigatingWithKeyboard] = useState(false);
  const { keyboardNavigationVisible, setKeyboardNavigationVisible } = useA11y();
  
  useEffect(() => {
    // تعقب ما إذا كان المستخدم يستخدم لوحة المفاتيح للتنقل
    const handleKeyDown = (e: KeyboardEvent) => {
      // تحديد ما إذا كان المفتاح هو للتنقل
      const isNavigationKey = [
        'Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
        'Enter', 'Space', 'Escape', 'Home', 'End', 'PageUp', 'PageDown'
      ].includes(e.key);
      
      if (isNavigationKey) {
        setIsNavigatingWithKeyboard(true);
      }
    };
    
    // إعادة الضبط عند استخدام الماوس
    const handleMouseDown = () => {
      setIsNavigatingWithKeyboard(false);
    };
    
    // إظهار قائمة التنقل بلوحة المفاتيح عند ضغط Shift + ?
    const handleShortcut = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === '?') {
        setKeyboardNavigationVisible(!keyboardNavigationVisible);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleShortcut);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleShortcut);
    };
  }, [keyboardNavigationVisible, setKeyboardNavigationVisible]);
  
  return { isNavigatingWithKeyboard };
}
