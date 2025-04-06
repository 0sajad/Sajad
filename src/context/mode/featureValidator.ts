
import { ModeFeatures, FeatureValidationResult } from "./types";

/**
 * التحقق من صحة التكوين
 */
export function validateConfiguration(config: ModeFeatures): FeatureValidationResult {
  // التأكد من عدم تفعيل ميزات متعارضة
  if (config.invisibleMode && config.networkCloning) {
    return { 
      valid: false, 
      message: "لا يمكن تفعيل وضع التخفي واستنساخ الشبكة معًا"
    };
  }
  
  // التأكد من تفعيل الميزات المطلوبة للميزات المتقدمة
  if (config.holographicUI && !config.latencyHeatmap) {
    return { 
      valid: false, 
      message: "الواجهة ثلاثية الأبعاد تتطلب تفعيل خريطة التأخير"
    };
  }
  
  // التحقق من تكاملات أدوات تحليل البيانات
  if (config.aiAnalytics && !config.elasticsearchIntegration) {
    return {
      valid: false,
      message: "تحليل الذكاء الاصطناعي يتطلب تكامل Elasticsearch"
    };
  }
  
  if (config.cloudIntegration && !config.dataAnalysis) {
    return {
      valid: false,
      message: "تكامل السحابة يتطلب تحليل البيانات"
    };
  }
  
  return { valid: true, message: "" };
}
