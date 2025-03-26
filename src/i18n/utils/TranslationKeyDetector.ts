
import { Module, ModuleType } from 'i18next';

/**
 * كاشف مفتاح الترجمة - وحدة لتتبع وتسجيل مفاتيح الترجمة المفقودة
 */
export class TranslationKeyDetector implements Module {
  type: ModuleType = 'postProcessor';
  name: string = 'translationKeyDetector';
  
  // تخزين المفاتيح المفقودة لكل لغة ومساحة أسماء
  private missingKeys: Record<string, Record<string, Set<string>>> = {};
  
  // تهيئة الكاشف
  init() {
    return {
      type: 'postProcessor' as ModuleType,
      name: 'translationKeyDetector',
    };
  }
  
  // معالجة الترجمة والتحقق من المفاتيح المفقودة
  process(value: string, key: string, options: any, translator: any) {
    // إذا كانت القيمة هي المفتاح نفسه (علامة على مفتاح مفقود)
    if (value === key && options && options.lng && options.ns) {
      this.addMissingKey(options.lng, options.ns, key);
    }
    return value;
  }
  
  // إضافة مفتاح مفقود إلى القائمة
  private addMissingKey(language: string, namespace: string, key: string) {
    if (!this.missingKeys[language]) {
      this.missingKeys[language] = {};
    }
    
    if (!this.missingKeys[language][namespace]) {
      this.missingKeys[language][namespace] = new Set();
    }
    
    this.missingKeys[language][namespace].add(key);
    
    // سجل في وحدة التحكم في وضع التطوير فقط
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Missing translation key detected: ${key} in namespace: ${namespace} for language: ${language}`);
    }
  }
  
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
  
  // إعادة تعيين قائمة المفاتيح المفقودة
  resetMissingKeys() {
    this.missingKeys = {};
  }
  
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

// تصدير مثيل جاهز للاستخدام
export default new TranslationKeyDetector();
