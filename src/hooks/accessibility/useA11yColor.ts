
import { useCallback } from 'react';
import { useAppState } from '../state/use-app-state';

export type ColorBlindMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

interface ColorTransformOptions {
  forceMode?: ColorBlindMode;
}

/**
 * خطاف للتعامل مع عمى الألوان وتحويل الألوان
 * يساعد في تحسين الخبرة البصرية لذوي عمى الألوان
 */
export function useA11yColor() {
  const colorBlindMode = useAppState(state => state.colorBlindMode);
  const setColorBlindMode = useAppState(state => state.setColorBlindMode);
  
  /**
   * تحويل لون لملاءمة نوع عمى الألوان
   * يطبق تحويلات اللون المناسبة بناءً على نوع عمى الألوان المحدد
   */
  const transformColor = useCallback((color: string, options: ColorTransformOptions = {}) => {
    const mode = options.forceMode || colorBlindMode;
    
    // إذا كان وضع عمى الألوان معطل، أرجع اللون الأصلي
    if (mode === 'none') {
      return color;
    }
    
    try {
      // تحويل اللون إلى RGB
      const rgb = hexToRgb(color);
      if (!rgb) return color;
      
      let transformedRgb;
      
      // تطبيق التحويل المناسب بناءً على نوع عمى الألوان
      switch (mode) {
        case 'protanopia': // عمى اللون الأحمر
          transformedRgb = simulateProtanopia(rgb);
          break;
        case 'deuteranopia': // عمى اللون الأخضر
          transformedRgb = simulateDeuteranopia(rgb);
          break;
        case 'tritanopia': // عمى اللون الأزرق
          transformedRgb = simulateTritanopia(rgb);
          break;
        case 'achromatopsia': // عمى الألوان الكلي
          transformedRgb = simulateAchromatopsia(rgb);
          break;
        default:
          return color;
      }
      
      // تحويل RGB المعدل إلى لون hex
      return rgbToHex(transformedRgb);
    } catch (error) {
      console.error('Error transforming color for color blindness:', error);
      return color;
    }
  }, [colorBlindMode]);
  
  /**
   * تحويل لون لزيادة التباين
   * مفيد للمستخدمين الذين يعانون من ضعف البصر
   */
  const enhanceContrast = useCallback((color: string, factor: number = 1.5) => {
    try {
      const rgb = hexToRgb(color);
      if (!rgb) return color;
      
      // حساب درجة سطوع اللون
      const luminance = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
      
      // زيادة التباين بتعديل السطوع
      const enhancedRgb = {
        r: Math.min(255, Math.max(0, luminance < 128 
          ? rgb.r / factor 
          : rgb.r * factor)),
        g: Math.min(255, Math.max(0, luminance < 128 
          ? rgb.g / factor 
          : rgb.g * factor)),
        b: Math.min(255, Math.max(0, luminance < 128 
          ? rgb.b / factor 
          : rgb.b * factor))
      };
      
      return rgbToHex(enhancedRgb);
    } catch (error) {
      console.error('Error enhancing contrast for color:', error);
      return color;
    }
  }, []);
  
  /**
   * تحقق مما إذا كان اللون فاتح أم داكن
   * مفيد لتحديد لون النص المناسب
   */
  const isLightColor = useCallback((color: string) => {
    const rgb = hexToRgb(color);
    if (!rgb) return true;
    
    // حساب درجة السطوع باستخدام صيغة YIQ
    const yiq = ((rgb.r * 299) + (rgb.g * 587) + (rgb.b * 114)) / 1000;
    return yiq >= 128;
  }, []);
  
  /**
   * الحصول على لون نص متباين مناسب
   * يختار بين الأبيض والأسود بناءً على لون الخلفية
   */
  const getContrastText = useCallback((backgroundColor: string) => {
    return isLightColor(backgroundColor) ? '#000000' : '#ffffff';
  }, [isLightColor]);
  
  // وظائف مساعدة لتحويل الألوان
  
  // تحويل لون hex إلى RGB
  const hexToRgb = (hex: string) => {
    // التعامل مع أشكال مختلفة من لون hex
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const formattedHex = hex.replace(shorthandRegex, (_, r, g, b) => {
      return r + r + g + g + b + b;
    });
    
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(formattedHex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };
  
  // تحويل RGB إلى لون hex
  const rgbToHex = (rgb: { r: number, g: number, b: number }) => {
    const toHex = (c: number) => {
      const hex = Math.round(c).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
  };
  
  // محاكاة عمى اللون الأحمر (Protanopia)
  const simulateProtanopia = (rgb: { r: number, g: number, b: number }) => {
    const r = 0.567 * rgb.r + 0.433 * rgb.g + 0.0 * rgb.b;
    const g = 0.558 * rgb.r + 0.442 * rgb.g + 0.0 * rgb.b;
    const b = 0.0 * rgb.r + 0.242 * rgb.g + 0.758 * rgb.b;
    
    return { r, g, b };
  };
  
  // محاكاة عمى اللون الأخضر (Deuteranopia)
  const simulateDeuteranopia = (rgb: { r: number, g: number, b: number }) => {
    const r = 0.625 * rgb.r + 0.375 * rgb.g + 0.0 * rgb.b;
    const g = 0.7 * rgb.r + 0.3 * rgb.g + 0.0 * rgb.b;
    const b = 0.0 * rgb.r + 0.3 * rgb.g + 0.7 * rgb.b;
    
    return { r, g, b };
  };
  
  // محاكاة عمى اللون الأزرق (Tritanopia)
  const simulateTritanopia = (rgb: { r: number, g: number, b: number }) => {
    const r = 0.95 * rgb.r + 0.05 * rgb.g + 0.0 * rgb.b;
    const g = 0.0 * rgb.r + 0.433 * rgb.g + 0.567 * rgb.b;
    const b = 0.0 * rgb.r + 0.475 * rgb.g + 0.525 * rgb.b;
    
    return { r, g, b };
  };
  
  // محاكاة عمى الألوان الكلي (Achromatopsia)
  const simulateAchromatopsia = (rgb: { r: number, g: number, b: number }) => {
    const avg = (rgb.r + rgb.g + rgb.b) / 3;
    return { r: avg, g: avg, b: avg };
  };
  
  return {
    colorBlindMode,
    setColorBlindMode,
    transformColor,
    enhanceContrast,
    isLightColor,
    getContrastText
  };
}
