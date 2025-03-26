
import { Module, ModuleType } from 'i18next';

/**
 * Translation Key Detector - Module for tracking and logging missing translation keys
 * كاشف مفتاح الترجمة - وحدة لتتبع وتسجيل مفاتيح الترجمة المفقودة
 */
export class TranslationKeyDetector implements Module {
  type: ModuleType = 'postProcessor';
  name: string = 'translationKeyDetector';
  
  // Store missing keys for each language and namespace
  // تخزين المفاتيح المفقودة لكل لغة ومساحة أسماء
  private missingKeys: Record<string, Record<string, Set<string>>> = {};
  
  // Initialize the detector
  // تهيئة الكاشف
  init() {
    return {
      type: 'postProcessor' as ModuleType,
      name: 'translationKeyDetector',
    };
  }
  
  // Process translation and check for missing keys
  // معالجة الترجمة والتحقق من المفاتيح المفقودة
  process(value: string, key: string, options: any, translator: any) {
    // If the value is the key itself (sign of a missing key)
    // إذا كانت القيمة هي المفتاح نفسه (علامة على مفتاح مفقود)
    if (value === key && options && options.lng && options.ns) {
      this.addMissingKey(options.lng, options.ns, key);
    }
    return value;
  }
  
  // Add a missing key to the list
  // إضافة مفتاح مفقود إلى القائمة
  private addMissingKey(language: string, namespace: string, key: string) {
    if (!this.missingKeys[language]) {
      this.missingKeys[language] = {};
    }
    
    if (!this.missingKeys[language][namespace]) {
      this.missingKeys[language][namespace] = new Set();
    }
    
    this.missingKeys[language][namespace].add(key);
    
    // Log to console in development mode only
    // سجل في وحدة التحكم في وضع التطوير فقط
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Missing translation key detected: ${key} in namespace: ${namespace} for language: ${language}`);
    }
  }
  
  // Get all missing keys
  // الحصول على جميع المفاتيح المفقودة
  getMissingKeys(): Record<string, Record<string, string[]>> {
    const result: Record<string, Record<string, string[]>> = {};
    
    Object.keys(this.missingKeys).forEach(lang => {
      result[lang] = {};
      Object.keys(this.missingKeys[lang]).forEach(ns => {
        result[lang][ns] = Array.from(this.missingKeys[lang][ns]);
      });
    });
    
    return result;
  }
  
  // Reset the missing keys list
  // إعادة تعيين قائمة المفاتيح المفقودة
  resetMissingKeys() {
    this.missingKeys = {};
  }
  
  // Generate a report on missing keys
  // توليد تقرير عن المفاتيح المفقودة
  generateMissingKeysReport(): string {
    const missingKeysMap = this.getMissingKeys();
    let report = '# Missing Translation Keys Report\n\n';
    
    Object.keys(missingKeysMap).forEach(lang => {
      report += `## Language: ${lang}\n\n`;
      
      Object.keys(missingKeysMap[lang]).forEach(ns => {
        report += `### Namespace: ${ns}\n\n`;
        report += '```json\n{\n';
        
        missingKeysMap[lang][ns].forEach(key => {
          report += `  "${key}": "",\n`;
        });
        
        report += '}\n```\n\n';
      });
    });
    
    return report;
  }
}

// Export a ready-to-use instance
// تصدير مثيل جاهز للاستخدام
export default new TranslationKeyDetector();
