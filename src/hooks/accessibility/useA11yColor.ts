
import { useState, useEffect } from 'react';

export type ColorBlindMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

export function useA11yColor() {
  const [colorBlindMode, setColorBlindMode] = useState<ColorBlindMode>('none');
  
  // تطبيق وضع عمى الألوان
  useEffect(() => {
    // إزالة أي فئات عمى الألوان الموجودة
    document.documentElement.classList.remove(
      'protanopia', 
      'deuteranopia', 
      'tritanopia', 
      'achromatopsia'
    );
    
    // إضافة الفئة الجديدة إذا لم تكن 'none'
    if (colorBlindMode !== 'none') {
      document.documentElement.classList.add(colorBlindMode);
    }
    
    // تخزين التفضيل في localStorage
    localStorage.setItem('a11y-colorBlindMode', colorBlindMode);
  }, [colorBlindMode]);
  
  // تحميل التفضيل من localStorage عند التركيب
  useEffect(() => {
    const storedColorBlindMode = localStorage.getItem('a11y-colorBlindMode') as ColorBlindMode | null;
    
    if (storedColorBlindMode && storedColorBlindMode !== 'none') {
      setColorBlindMode(storedColorBlindMode as ColorBlindMode);
    }
  }, []);
  
  return { colorBlindMode, setColorBlindMode };
}
