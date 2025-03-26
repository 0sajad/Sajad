
import i18next from 'i18next';

/**
 * كاشف مفاتيح الترجمة المفقودة
 * يسجل مفاتيح الترجمة المفقودة ويعطي إمكانية تتبعها وإدارتها
 */
class TranslationKeyDetector {
  missingKeys: Record<string, Set<string>> = {};
  processedKeys: Record<string, Set<string>> = {};
  
  /**
   * تحديد نوع الوحدة
   */
  type = 'postProcessor' as const;
  name = 'translationKeyDetector';

  resetMissingKeys(): void {
    this.missingKeys = {};
  }

  resetProcessedKeys(): void {
    this.processedKeys = {};
  }

  /**
   * معالجة ومراقبة المفاتيح المترجمة
   */
  process(value: string, key: string, options: any): string {
    if (!options) return value;

    const lng = options.lng || 'default';
    const ns = options.ns || 'default';
    const keyId = `${ns}:${key}`;

    // تسجيل المفاتيح المعالجة
    if (!this.processedKeys[lng]) {
      this.processedKeys[lng] = new Set();
    }
    this.processedKeys[lng].add(keyId);

    // التحقق من المفاتيح المفقودة
    if (value === key && options.defaultValue === undefined) {
      if (!this.missingKeys[lng]) {
        this.missingKeys[lng] = new Set();
      }
      this.missingKeys[lng].add(keyId);
      
      // إطلاق حدث المفتاح المفقود
      if (i18next && typeof i18next.emit === 'function') {
        i18next.emit('missingKey', lng, ns, key);
      }
      
      // رجوع للمفتاح في اللغة الاحتياطية عند الإمكان
      if (options.fallbackLng) {
        const fallbackValue = i18next.t(key, { lng: options.fallbackLng, ns });
        if (fallbackValue !== key) {
          return fallbackValue;
        }
      }
    }

    return value;
  }

  /**
   * الحصول على المفاتيح المفقودة للغة محددة
   */
  getMissingKeysForLanguage(lng: string): string[] {
    if (!this.missingKeys[lng]) return [];
    return Array.from(this.missingKeys[lng]);
  }

  /**
   * الحصول على جميع المفاتيح المفقودة
   */
  getAllMissingKeys(): Record<string, string[]> {
    const result: Record<string, string[]> = {};
    Object.keys(this.missingKeys).forEach(lng => {
      result[lng] = Array.from(this.missingKeys[lng]);
    });
    return result;
  }
}

const translationKeyDetector = new TranslationKeyDetector();

export default translationKeyDetector;
