
/**
 * كاشف الترجمات المفقودة
 * يقوم بتسجيل وتتبع مفاتيح الترجمة المفقودة في التطبيق
 */

interface MissingKeys {
  [language: string]: string[];
}

class MissingTranslationDetectorClass {
  private missingKeys: MissingKeys = {};
  private isInitialized = false;

  /**
   * تهيئة كاشف الترجمات المفقودة
   */
  init(): void {
    if (this.isInitialized) return;
    this.missingKeys = {};
    this.isInitialized = true;
    console.debug('[i18n] Missing translation detector initialized');
  }

  /**
   * إضافة مفتاح ترجمة مفقود
   * @param language كود اللغة
   * @param key مفتاح الترجمة المفقود
   */
  addMissingKey(language: string, key: string): void {
    if (!this.isInitialized) this.init();
    
    if (!this.missingKeys[language]) {
      this.missingKeys[language] = [];
    }
    
    // تجنب تكرار المفاتيح المفقودة
    if (!this.missingKeys[language].includes(key)) {
      this.missingKeys[language].push(key);
    }
  }

  /**
   * الحصول على جميع المفاتيح المفقودة
   */
  getMissingKeys(): MissingKeys {
    return this.missingKeys;
  }

  /**
   * تصدير المفاتيح المفقودة كسلسلة JSON
   */
  exportMissingKeys(): string {
    return JSON.stringify(this.missingKeys, null, 2);
  }
  
  /**
   * مسح جميع المفاتيح المفقودة
   */
  clearMissingKeys(): void {
    this.missingKeys = {};
  }
}

// تصدير كائن وحيد للاستخدام في جميع أنحاء التطبيق
export const MissingTranslationDetector = new MissingTranslationDetectorClass();
