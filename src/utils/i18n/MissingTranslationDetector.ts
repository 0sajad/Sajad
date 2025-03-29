
import { i18n, TFunction } from 'i18next';

/**
 * كاشف الترجمات المفقودة
 * أداة للمساعدة في اكتشاف مفاتيح الترجمة المفقودة أثناء التطوير
 */
export class MissingTranslationDetector {
  private i18n: i18n;
  private missingKeys: Record<string, string[]> = {};
  private originalTFunction: Function | null = null;
  private isActive: boolean = false;

  constructor(i18nInstance: i18n) {
    this.i18n = i18nInstance;
  }

  /**
   * تفعيل كاشف الترجمات المفقودة
   */
  activate(): void {
    if (this.isActive) return;
    
    // حفظ دالة t الأصلية
    this.originalTFunction = this.i18n.t;
    
    // إنشاء دالة معدلة للكشف عن المفاتيح المفقودة
    const modifiedT = ((key: string, options?: any): string => {
      const result = this.originalTFunction.call(this.i18n, key, options);
      
      // إذا كانت النتيجة هي المفتاح نفسه، فهذا يعني أن الترجمة مفقودة
      if (typeof key === 'string' && result === key) {
        const language = this.i18n.language || 'unknown';
        
        if (!this.missingKeys[language]) {
          this.missingKeys[language] = [];
        }
        
        if (!this.missingKeys[language].includes(key)) {
          this.missingKeys[language].push(key);
          
          // لوج في وحدة التحكم للمطورين
          console.warn(`Missing translation for key [${key}] in language [${language}]`);
        }
      }
      
      return result;
    }) as unknown as TFunction;
    
    // تعديل دالة t للكشف عن المفاتيح المفقودة
    this.i18n.t = modifiedT;
    
    this.isActive = true;
  }

  /**
   * تعطيل كاشف الترجمات المفقودة
   */
  deactivate(): void {
    if (!this.isActive || !this.originalTFunction) return;
    
    // إعادة دالة t الأصلية
    this.i18n.t = this.originalTFunction as TFunction;
    this.isActive = false;
  }

  /**
   * الحصول على قائمة المفاتيح المفقودة
   */
  getMissingKeys(): Record<string, string[]> {
    return { ...this.missingKeys };
  }

  /**
   * إعادة تعيين قائمة المفاتيح المفقودة
   */
  resetMissingKeys(): void {
    this.missingKeys = {};
  }

  /**
   * مقارنة مفاتيح الترجمة بين لغتين
   * @param sourceLanguage اللغة المصدر
   * @param targetLanguage اللغة الهدف
   * @returns قائمة المفاتيح الموجودة في المصدر ولكن مفقودة في الهدف
   */
  compareLanguageKeys(sourceLanguage: string, targetLanguage: string): string[] {
    try {
      // استخراج المفاتيح من موارد الترجمة
      const resources = this.i18n.options.resources || {};
      const sourceKeys = this.extractAllKeys(resources[sourceLanguage]);
      const targetKeys = this.extractAllKeys(resources[targetLanguage]);
      
      // إيجاد المفاتيح الموجودة في sourceLanguage ولكن مفقودة في targetLanguage
      return sourceKeys.filter(key => !targetKeys.includes(key));
    } catch (error) {
      console.error('Error comparing language keys:', error);
      return [];
    }
  }

  /**
   * استخراج جميع مفاتيح الترجمة بشكل تكراري
   * @param obj كائن الترجمة
   * @param prefix بادئة المفتاح
   * @returns قائمة المفاتيح
   */
  private extractAllKeys(obj: any, prefix = ''): string[] {
    if (!obj) return [];
    
    let keys: string[] = [];
    
    for (const key in obj) {
      const currentKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        keys = [...keys, ...this.extractAllKeys(obj[key], currentKey)];
      } else {
        keys.push(currentKey);
      }
    }
    
    return keys;
  }

  /**
   * تصدير المفاتيح المفقودة كملف JSON
   * @returns وعد يحتوي على URL للملف للتنزيل
   */
  exportMissingKeysToJson(): string {
    const data = JSON.stringify(this.missingKeys, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    return URL.createObjectURL(blob);
  }
}

// تصدير دالة منفصلة لإنشاء كاشف
export const createMissingTranslationDetector = (i18nInstance: i18n): MissingTranslationDetector => {
  return new MissingTranslationDetector(i18nInstance);
};
