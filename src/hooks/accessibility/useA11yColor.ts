
// تعريف أنواع وضع عمى الألوان
export type ColorBlindMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

/**
 * خطاف لإدارة تعديلات الألوان لعمى الألوان
 */
export function useA11yColor(mode: ColorBlindMode = 'none') {
  // تطبيق فلتر CSS مناسب بناءً على وضع عمى الألوان
  const applyColorFilter = () => {
    const root = document.documentElement;
    
    // إزالة جميع فئات الفلتر الحالية
    root.classList.remove('protanopia', 'deuteranopia', 'tritanopia', 'achromatopsia');
    
    // تطبيق الفلتر المناسب إذا لم يكن الوضع 'none'
    if (mode !== 'none') {
      root.classList.add(mode);
    }
  };
  
  // الحصول على وصف لنوع عمى الألوان بناءً على القيمة
  const getColorBlindTypeDescription = (type: ColorBlindMode): string => {
    switch (type) {
      case 'protanopia':
        return 'عمى اللون الأحمر';
      case 'deuteranopia':
        return 'عمى اللون الأخضر';
      case 'tritanopia':
        return 'عمى اللون الأزرق';
      case 'achromatopsia':
        return 'عمى الألوان الكلي';
      default:
        return 'الرؤية الطبيعية';
    }
  };
  
  return {
    applyColorFilter,
    getColorBlindTypeDescription
  };
}
