
import { useState, useEffect } from 'react';

/**
 * أنواع أوضاع عمى الألوان المدعومة
 */
export type ColorBlindMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

/**
 * خطاف (Hook) لإدارة أوضاع عمى الألوان ومشاكل رؤية الألوان
 * محسّن للتعامل مع مختلف أنواع عمى الألوان بطرق متعددة
 */
export function useA11yColor() {
  const [colorBlindMode, setColorBlindModeState] = useState<ColorBlindMode>('none');
  
  // وظيفة لتغيير وضع عمى الألوان مع تطبيق الفلاتر المناسبة
  const setColorBlindMode = (mode: ColorBlindMode) => {
    setColorBlindModeState(mode);
    
    // إزالة كل فئات عمى الألوان الموجودة
    document.documentElement.classList.remove(
      'protanopia', 'deuteranopia', 'tritanopia', 'achromatopsia'
    );
    
    // إزالة جميع أنماط الفلتر
    document.documentElement.style.filter = '';
    
    // تطبيق الفلتر المناسب
    if (mode !== 'none') {
      document.documentElement.classList.add(mode);
      
      // تطبيق فلتر CSS مناسب لنوع عمى الألوان
      // هذا يضمن دعمًا أفضل للمتصفحات القديمة
      switch (mode) {
        case 'protanopia':
          document.documentElement.style.filter = 'url(#protanopia-filter)';
          break;
        case 'deuteranopia':
          document.documentElement.style.filter = 'url(#deuteranopia-filter)';
          break;
        case 'tritanopia':
          document.documentElement.style.filter = 'url(#tritanopia-filter)';
          break;
        case 'achromatopsia':
          document.documentElement.style.filter = 'grayscale(100%)';
          break;
      }
    }
    
    // حفظ الإعداد في التخزين المحلي
    localStorage.setItem('a11y-colorBlindMode', mode);
  };
  
  // تحميل الإعداد المحفوظ عند بدء التطبيق
  useEffect(() => {
    const savedMode = localStorage.getItem('a11y-colorBlindMode') as ColorBlindMode | null;
    if (savedMode) {
      setColorBlindMode(savedMode);
    } else {
      // التحقق من وجود تفضيل على مستوى النظام (غير مدعوم حاليًا في معظم المتصفحات)
      // يمكن إضافة دعم في المستقبل عندما تدعم المتصفحات media query للألوان
    }
  }, []);
  
  // ضمان إضافة عناصر SVG للفلاتر إذا لم تكن موجودة
  useEffect(() => {
    if (!document.getElementById('a11y-color-filters')) {
      // إنشاء عنصر يحتوي على فلاتر SVG
      const filtersElement = document.createElement('div');
      filtersElement.id = 'a11y-color-filters';
      filtersElement.style.height = '0';
      filtersElement.style.width = '0';
      filtersElement.style.position = 'absolute';
      filtersElement.style.overflow = 'hidden';
      filtersElement.setAttribute('aria-hidden', 'true');
      
      // إضافة فلاتر SVG لمختلف أنواع عمى الألوان
      filtersElement.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" style="display:none">
          <filter id="protanopia-filter">
            <feColorMatrix in="SourceGraphic" type="matrix" values="
              0.567, 0.433, 0,     0, 0
              0.558, 0.442, 0,     0, 0
              0,     0.242, 0.758, 0, 0
              0,     0,     0,     1, 0
            "/>
          </filter>
          <filter id="deuteranopia-filter">
            <feColorMatrix in="SourceGraphic" type="matrix" values="
              0.625, 0.375, 0,   0, 0
              0.7,   0.3,   0,   0, 0
              0,     0.3,   0.7, 0, 0
              0,     0,     0,   1, 0
            "/>
          </filter>
          <filter id="tritanopia-filter">
            <feColorMatrix in="SourceGraphic" type="matrix" values="
              0.95, 0.05,  0,     0, 0
              0,    0.433, 0.567, 0, 0
              0,    0.475, 0.525, 0, 0
              0,    0,     0,     1, 0
            "/>
          </filter>
        </svg>
      `;
      
      document.body.appendChild(filtersElement);
    }
  }, []);
  
  return {
    colorBlindMode,
    setColorBlindMode
  };
}
