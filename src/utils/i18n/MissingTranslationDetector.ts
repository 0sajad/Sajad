
/**
 * كاشف الترجمات المفقودة
 * يوفر آلية للكشف عن مفاتيح الترجمة المفقودة أثناء تطوير التطبيق
 */

// تخزين المفاتيح المفقودة بنمط الوحدة
let missingKeys: Record<string, string[]> = {};
let isInitialized = false;

/**
 * فئة تمثل كاشف الترجمات المفقودة
 */
export class MissingTranslationDetector {
  /**
   * تهيئة الكاشف
   */
  static init() {
    if (isInitialized) return;
    
    // تسجيل المفاتيح المفقودة في وحدة i18n
    if (window.i18next) {
      window.i18next.on('missingKey', (lng: string, namespace: string, key: string) => {
        if (!missingKeys[lng]) {
          missingKeys[lng] = [];
        }
        
        // تجنب تكرار المفاتيح المفقودة
        if (!missingKeys[lng].includes(key)) {
          missingKeys[lng].push(key);
        }
      });
    }
    
    isInitialized = true;
  }
  
  /**
   * الحصول على المفاتيح المفقودة لجميع اللغات
   */
  static getMissingKeys(): Record<string, string[]> {
    return missingKeys;
  }
  
  /**
   * مسح جميع المفاتيح المفقودة
   */
  static clearMissingKeys(): void {
    missingKeys = {};
  }
  
  /**
   * استخراج المفاتيح المفقودة كتنسيق JSON
   */
  static exportMissingKeys(): string {
    return JSON.stringify(missingKeys, null, 2);
  }
  
  /**
   * فحص الصفحة الحالية للبحث عن نصوص غير مترجمة
   */
  static scanPageForUntranslated(): { hardcodedTexts: { element: HTMLElement, text: string }[] } {
    const hardcodedTexts: { element: HTMLElement, text: string }[] = [];
    
    // تجنب البحث في المستندات غير الموجودة (مثل SSR)
    if (typeof document === 'undefined') {
      return { hardcodedTexts };
    }
    
    // البحث عن النصوص في عناصر HTML المختلفة
    const textElements = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, button, a, label, div');
    
    textElements.forEach((element) => {
      const text = element.textContent?.trim();
      
      // تجاهل النصوص الفارغة أو القصيرة جدًا
      if (!text || text.length < 3) return;
      
      // التحقق من أن النص لا يحتوي على أقواس تدل على الترجمة
      if (!text.includes('{{') && !text.includes('}}')) {
        // فحص إضافي لتجنب الإيجابيات الكاذبة
        if (text.match(/[a-zA-Z\u0600-\u06FF]{3,}/)) {
          hardcodedTexts.push({
            element: element as HTMLElement,
            text
          });
        }
      }
    });
    
    return { hardcodedTexts };
  }
}

// تصدير الكاشف كدالة بسيطة
export const initMissingTranslationDetector = MissingTranslationDetector.init;
export const getMissingTranslationDetector = () => MissingTranslationDetector;
