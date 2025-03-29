
import { i18n as i18nInstance } from 'i18next';

/**
 * أداة للكشف عن مفاتيح الترجمة المفقودة
 * تتتبع المفاتيح المفقودة وتوفر وسائل مساعدة لإدارتها
 */
export class MissingTranslationDetector {
  private missingKeys: Record<string, Set<string>> = {};
  private i18n: i18nInstance;
  private originalT: Function;
  private isEnabled: boolean = false;

  /**
   * إنشاء كاشف جديد للترجمات المفقودة
   * @param i18n كائن i18n المراد مراقبته
   */
  constructor(i18n: i18nInstance) {
    this.i18n = i18n;
    this.originalT = i18n.t.bind(i18n);
  }

  /**
   * تفعيل المراقبة
   */
  enable(): void {
    if (this.isEnabled) return;
    this.isEnabled = true;

    // تعديل دالة t لتتبع المفاتيح المفقودة
    this.i18n.t = this.createProxyFunction();
  }

  /**
   * تعطيل المراقبة وإرجاع دالة t الأصلية
   */
  disable(): void {
    if (!this.isEnabled) return;
    
    // استعادة دالة t الأصلية
    this.i18n.t = this.originalT;
    this.isEnabled = false;
  }

  /**
   * إنشاء دالة وسيطة لمراقبة استدعاءات الترجمة
   */
  private createProxyFunction(): any {
    return (key: any, options?: any) => {
      // استدعاء دالة الترجمة الأصلية
      const result = this.originalT(key, options);
      
      if (!this.isEnabled) return result;
      
      // تحديد ما إذا كانت الترجمة مفقودة
      if (typeof key === 'string' && result === key) {
        const language = this.i18n.language || 'default';
        
        // تسجيل المفتاح المفقود
        if (!this.missingKeys[language]) {
          this.missingKeys[language] = new Set<string>();
        }
        
        this.missingKeys[language].add(key);
        
        // إرسال إشعار للمطور في وحدة التحكم
        console.warn(`[Translation] Missing key "${key}" for language "${language}"`);
      }
      
      return result;
    };
  }

  /**
   * الحصول على قائمة المفاتيح المفقودة للغة محددة
   * @param language اللغة المطلوبة
   */
  getMissingKeysForLanguage(language: string): string[] {
    if (!this.missingKeys[language]) {
      return [];
    }
    return Array.from(this.missingKeys[language]);
  }

  /**
   * الحصول على جميع المفاتيح المفقودة
   */
  getAllMissingKeys(): Record<string, string[]> {
    const result: Record<string, string[]> = {};
    
    Object.keys(this.missingKeys).forEach(language => {
      result[language] = Array.from(this.missingKeys[language]);
    });
    
    return result;
  }

  /**
   * مسح قائمة المفاتيح المفقودة
   */
  clearMissingKeys(): void {
    this.missingKeys = {};
  }

  /**
   * تصدير المفاتيح المفقودة إلى ملف JSON
   */
  exportToJSON(): string {
    const data = this.getAllMissingKeys();
    return JSON.stringify(data, null, 2);
  }

  /**
   * تصدير المفاتيح المفقودة كملف للتنزيل
   */
  downloadMissingKeys(): void {
    const json = this.exportToJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `missing-translations-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
  }

  /**
   * مقارنة اكتمال الترجمة بين لغتين
   * @param sourceLanguage اللغة المصدر (المرجعية)
   * @param targetLanguage اللغة الهدف للمقارنة
   */
  compareLanguages(sourceLanguage: string, targetLanguage: string): {
    missingInTarget: string[];
    missingInSource: string[];
    completionPercentage: number;
  } {
    const resources = this.i18n.options.resources || {};
    
    if (!resources[sourceLanguage] || !resources[targetLanguage]) {
      throw new Error(`One or both languages (${sourceLanguage}, ${targetLanguage}) do not exist`);
    }
    
    const sourceKeys = this.extractAllKeys(resources[sourceLanguage].translation);
    const targetKeys = this.extractAllKeys(resources[targetLanguage].translation);
    
    const missingInTarget = sourceKeys.filter(key => !targetKeys.includes(key));
    const missingInSource = targetKeys.filter(key => !sourceKeys.includes(key));
    
    const completionPercentage = sourceKeys.length === 0 
      ? 100 
      : Math.round(((sourceKeys.length - missingInTarget.length) / sourceKeys.length) * 100);
    
    return {
      missingInTarget,
      missingInSource,
      completionPercentage
    };
  }

  /**
   * استخراج جميع مفاتيح الترجمة من كائن بشكل تكراري
   * @param obj كائن الترجمة
   * @param prefix بادئة المفتاح (للمفاتيح المتداخلة)
   */
  private extractAllKeys(obj: any, prefix = ''): string[] {
    if (!obj || typeof obj !== 'object') {
      return [];
    }
    
    let keys: string[] = [];
    
    for (const key in obj) {
      const currentKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        // استمر في التنقل للمستويات العميقة
        keys = [...keys, ...this.extractAllKeys(obj[key], currentKey)];
      } else {
        // أضف المفتاح الحالي للقائمة
        keys.push(currentKey);
      }
    }
    
    return keys;
  }
}

// تصدير كائن مشترك للاستخدام العام في التطبيق
let detector: MissingTranslationDetector | null = null;

/**
 * تهيئة كاشف الترجمات المفقودة
 * @param i18n كائن i18n
 */
export function initMissingTranslationDetector(i18n: i18nInstance): MissingTranslationDetector {
  if (!detector) {
    detector = new MissingTranslationDetector(i18n);
  }
  return detector;
}

/**
 * الحصول على كاشف الترجمات المفقودة المهيأ مسبقاً
 */
export function getMissingTranslationDetector(): MissingTranslationDetector | null {
  return detector;
}
