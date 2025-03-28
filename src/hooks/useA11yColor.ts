
import { useState, useEffect } from 'react';
import { useAppState } from './state';

export type ColorBlindMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

interface ContrastOptions {
  minContrast?: number;
  preferHighContrast?: boolean;
}

/**
 * خطاف لإدارة تعديلات الألوان لدعم إمكانية الوصول
 */
export function useA11yColor() {
  // استخدام حالة التطبيق للحصول على وضع عمى الألوان
  const colorBlindMode = useAppState(state => state.colorBlindMode);
  const setColorBlindMode = useAppState(state => state.setColorBlindMode);
  
  // تطبيق وضع عمى الألوان على عنصر الجسم
  useEffect(() => {
    // إزالة جميع فئات عمى الألوان
    document.body.classList.remove('protanopia', 'deuteranopia', 'tritanopia', 'achromatopsia');
    
    // إضافة الفئة المطلوبة
    if (colorBlindMode !== 'none') {
      document.body.classList.add(colorBlindMode);
    }
    
    // إضافة التصفيات المخصصة لعمى الألوان إذا لم تكن موجودة
    if (colorBlindMode !== 'none' && !document.getElementById('color-blind-filters')) {
      const svgFilters = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgFilters.id = 'color-blind-filters';
      svgFilters.style.display = 'none';
      svgFilters.innerHTML = `
        <filter id="protanopia-filter">
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="0.567, 0.433, 0, 0, 0
                    0.558, 0.442, 0, 0, 0
                    0, 0.242, 0.758, 0, 0
                    0, 0, 0, 1, 0"/>
        </filter>
        <filter id="deuteranopia-filter">
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="0.625, 0.375, 0, 0, 0
                    0.7, 0.3, 0, 0, 0
                    0, 0.3, 0.7, 0, 0
                    0, 0, 0, 1, 0"/>
        </filter>
        <filter id="tritanopia-filter">
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="0.95, 0.05, 0, 0, 0
                    0, 0.433, 0.567, 0, 0
                    0, 0.475, 0.525, 0, 0
                    0, 0, 0, 1, 0"/>
        </filter>
      `;
      document.body.appendChild(svgFilters);
    }
    
    return () => {
      // تنظيف عند إلغاء تحميل المكون
      const filters = document.getElementById('color-blind-filters');
      if (filters) {
        filters.remove();
      }
    };
  }, [colorBlindMode]);
  
  /**
   * حساب نسبة التباين بين لونين
   * @param color1 اللون الأول بصيغة سداسية عشرية
   * @param color2 اللون الثاني بصيغة سداسية عشرية
   * @returns نسبة التباين
   */
  const calculateContrast = (color1: string, color2: string): number => {
    // تحويل الألوان إلى قيم RGB
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    
    if (!rgb1 || !rgb2) return 1;
    
    // حساب سطوع كل لون
    const luminance1 = calculateLuminance(rgb1);
    const luminance2 = calculateLuminance(rgb2);
    
    // حساب نسبة التباين
    const contrast = luminance1 > luminance2
      ? (luminance1 + 0.05) / (luminance2 + 0.05)
      : (luminance2 + 0.05) / (luminance1 + 0.05);
    
    return contrast;
  };
  
  /**
   * تحويل لون سداسي عشري إلى قيم RGB
   */
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };
  
  /**
   * حساب سطوع اللون
   */
  const calculateLuminance = (rgb: { r: number, g: number, b: number }) => {
    const { r, g, b } = rgb;
    
    // تحويل قيم RGB إلى قيم نسبية
    const sRGB = [r / 255, g / 255, b / 255].map(val => {
      return val <= 0.03928
        ? val / 12.92
        : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    
    // حساب السطوع باستخدام معادلة WCAG
    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
  };
  
  /**
   * اختيار اللون الأكثر تباينًا مع لون الخلفية
   * @param backgroundColor لون الخلفية
   * @param options خيارات التباين
   * @returns اللون الأكثر تباينًا (أبيض أو أسود)
   */
  const getContrastColor = (backgroundColor: string, options: ContrastOptions = {}) => {
    const { minContrast = 4.5, preferHighContrast = false } = options;
    
    const whiteContrast = calculateContrast(backgroundColor, '#ffffff');
    const blackContrast = calculateContrast(backgroundColor, '#000000');
    
    // إذا كان أحد الألوان لا يحقق الحد الأدنى للتباين، نختار الآخر
    if (whiteContrast < minContrast && blackContrast >= minContrast) {
      return '#000000';
    }
    if (blackContrast < minContrast && whiteContrast >= minContrast) {
      return '#ffffff';
    }
    
    // إذا كان preferHighContrast صحيحًا، نختار اللون ذو التباين الأعلى
    if (preferHighContrast) {
      return whiteContrast > blackContrast ? '#ffffff' : '#000000';
    }
    
    // الاختيار الافتراضي
    return whiteContrast > blackContrast ? '#ffffff' : '#000000';
  };
  
  return {
    colorBlindMode,
    setColorBlindMode,
    calculateContrast,
    getContrastColor
  };
}
