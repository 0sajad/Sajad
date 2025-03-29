
/**
 * كاشف الترجمات المفقودة
 * يقوم بتسجيل وتتبع مفاتيح الترجمة المفقودة في التطبيق
 */

interface MissingKeys {
  [language: string]: string[];
}

export interface MissingTranslationStats {
  totalCount: number;
  languageCounts: Record<string, number>;
  lastUpdated: Date | null;
}

class MissingTranslationDetectorClass {
  private missingKeys: MissingKeys = {};
  private isInitialized = false;
  private lastUpdated: Date | null = null;
  private maxKeysPerLanguage: number = 500; // الحد الأقصى للمفاتيح لكل لغة

  /**
   * تهيئة كاشف الترجمات المفقودة
   * @param options خيارات التهيئة
   */
  init(options?: { maxKeysPerLanguage?: number }): void {
    if (this.isInitialized) return;
    
    this.missingKeys = {};
    this.isInitialized = true;
    
    // تطبيق الخيارات إن وجدت
    if (options?.maxKeysPerLanguage) {
      this.maxKeysPerLanguage = options.maxKeysPerLanguage;
    }
    
    console.debug('[i18n] Missing translation detector initialized');
    
    // استرداد المفاتيح المخزنة إن وجدت
    this.loadFromStorage();
  }

  /**
   * إضافة مفتاح ترجمة مفقود
   * @param language كود اللغة
   * @param key مفتاح الترجمة المفقود
   */
  addMissingKey(language: string, key: string): void {
    if (!this.isInitialized) this.init();
    
    if (!language || !key) return;
    
    if (!this.missingKeys[language]) {
      this.missingKeys[language] = [];
    }
    
    // تجنب تكرار المفاتيح المفقودة والتحقق من الحد الأقصى
    if (!this.missingKeys[language].includes(key) && this.missingKeys[language].length < this.maxKeysPerLanguage) {
      this.missingKeys[language].push(key);
      this.lastUpdated = new Date();
      
      // حفظ التغييرات في التخزين المحلي
      this.saveToStorage();
    }
  }

  /**
   * الحصول على جميع المفاتيح المفقودة
   */
  getMissingKeys(): MissingKeys {
    if (!this.isInitialized) this.init();
    return this.missingKeys;
  }

  /**
   * الحصول على إحصاءات المفاتيح المفقودة
   */
  getStats(): MissingTranslationStats {
    if (!this.isInitialized) this.init();
    
    const stats: MissingTranslationStats = {
      totalCount: 0,
      languageCounts: {},
      lastUpdated: this.lastUpdated
    };
    
    Object.entries(this.missingKeys).forEach(([lang, keys]) => {
      stats.languageCounts[lang] = keys.length;
      stats.totalCount += keys.length;
    });
    
    return stats;
  }

  /**
   * تصدير المفاتيح المفقودة كسلسلة JSON
   */
  exportMissingKeys(): string {
    return JSON.stringify(this.missingKeys, null, 2);
  }
  
  /**
   * مسح المفاتيح المفقودة للغة معينة
   * @param language كود اللغة (اختياري، إذا لم يتم تحديده سيتم مسح جميع اللغات)
   */
  clearMissingKeys(language?: string): void {
    if (!this.isInitialized) return;
    
    if (language) {
      if (this.missingKeys[language]) {
        delete this.missingKeys[language];
      }
    } else {
      this.missingKeys = {};
    }
    
    this.lastUpdated = new Date();
    this.saveToStorage();
  }

  /**
   * حفظ المفاتيح المفقودة في التخزين المحلي
   */
  private saveToStorage(): void {
    try {
      localStorage.setItem('missing-translations', JSON.stringify({
        keys: this.missingKeys,
        lastUpdated: this.lastUpdated
      }));
    } catch (error) {
      console.warn('[i18n] Failed to save missing keys to storage:', error);
    }
  }

  /**
   * استرداد المفاتيح المفقودة من التخزين المحلي
   */
  private loadFromStorage(): void {
    try {
      const savedData = localStorage.getItem('missing-translations');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        this.missingKeys = parsed.keys || {};
        this.lastUpdated = parsed.lastUpdated ? new Date(parsed.lastUpdated) : null;
      }
    } catch (error) {
      console.warn('[i18n] Failed to load missing keys from storage:', error);
    }
  }
  
  /**
   * الحصول على مفاتيح الترجمة المفقودة للغة معينة
   * @param language كود اللغة
   */
  getMissingKeysForLanguage(language: string): string[] {
    if (!this.isInitialized) this.init();
    return this.missingKeys[language] || [];
  }
}

// تصدير كائن وحيد للاستخدام في جميع أنحاء التطبيق
export const MissingTranslationDetector = new MissingTranslationDetectorClass();
