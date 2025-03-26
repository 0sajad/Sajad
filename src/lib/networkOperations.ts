
/**
 * وحدة عمليات الشبكة
 * توفر وظائف متقدمة لإدارة اتصالات الشبكة وتحسين الأداء
 */

// عدد إعادة المحاولات عند فشل الطلبات
const MAX_RETRIES = 3;

// تأخير إعادة المحاولة (بالمللي ثانية)
const RETRY_DELAY = 1000;

// مهلة الطلب الافتراضية (بالمللي ثانية)
const DEFAULT_TIMEOUT = 30000;

/**
 * إرسال طلب شبكة مع إمكانية إعادة المحاولة والمهلة
 * @param url عنوان URL
 * @param options خيارات الطلب
 * @param retries عدد إعادة المحاولات
 * @param timeout مهلة الطلب
 * @returns وعد بنتيجة الطلب
 */
export async function fetchWithRetry<T>(
  url: string,
  options: RequestInit = {},
  retries: number = MAX_RETRIES,
  timeout: number = DEFAULT_TIMEOUT
): Promise<T> {
  // إنشاء إشارة مهلة
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    
    // مسح المؤقت
    clearTimeout(timeoutId);
    
    // التحقق من نجاح الاستجابة
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    // مسح المؤقت
    clearTimeout(timeoutId);
    
    // التحقق مما إذا كان الخطأ بسبب المهلة
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    
    // إعادة المحاولة إذا كان هناك محاولات متبقية
    if (retries > 0) {
      // الانتظار قبل إعادة المحاولة
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      
      // إعادة المحاولة بمحاولة أقل
      return fetchWithRetry<T>(url, options, retries - 1, timeout);
    }
    
    // إعادة رمي الخطأ إذا نفدت المحاولات
    throw error;
  }
}

/**
 * تحليل استخدام النطاق الترددي
 * @param dataTransfer بيانات النقل
 * @returns تحليل النطاق الترددي
 */
export function analyzeBandwidth(dataTransfer: { upload: number; download: number }) {
  const { upload, download } = dataTransfer;
  
  // حساب النسبة
  const ratio = upload > 0 ? download / upload : 0;
  
  // تصنيف الاستخدام
  let classification: 'low' | 'medium' | 'high' | 'extreme';
  if (download < 1024 * 1024) { // أقل من 1 ميجابايت
    classification = 'low';
  } else if (download < 10 * 1024 * 1024) { // أقل من 10 ميجابايت
    classification = 'medium';
  } else if (download < 50 * 1024 * 1024) { // أقل من 50 ميجابايت
    classification = 'high';
  } else {
    classification = 'extreme';
  }
  
  return {
    classification,
    ratio,
    timestamp: new Date().toISOString(),
  };
}

/**
 * حساب متوسط وقت الاستجابة
 * @param responseTimes أوقات الاستجابة (بالمللي ثانية)
 * @returns متوسط وقت الاستجابة ومعلومات إضافية
 */
export function calculateAverageResponseTime(responseTimes: number[]) {
  if (responseTimes.length === 0) {
    return { average: 0, min: 0, max: 0 };
  }
  
  const sum = responseTimes.reduce((acc, time) => acc + time, 0);
  const average = sum / responseTimes.length;
  const min = Math.min(...responseTimes);
  const max = Math.max(...responseTimes);
  
  return { average, min, max };
}

/**
 * تحليل جودة الاتصال استنادًا إلى معايير متعددة
 * @param metrics معايير الاتصال
 * @returns تقييم جودة الاتصال
 */
export function analyzeConnectionQuality(metrics: {
  latency: number;
  packetLoss: number;
  jitter: number;
}) {
  const { latency, packetLoss, jitter } = metrics;
  
  // حساب درجة الجودة (0-100)
  let qualityScore = 100;
  
  // خصم النقاط بناءً على زمن الاستجابة
  if (latency > 200) {
    qualityScore -= 40;
  } else if (latency > 100) {
    qualityScore -= 20;
  } else if (latency > 50) {
    qualityScore -= 10;
  }
  
  // خصم النقاط بناءً على فقدان الحزم
  if (packetLoss > 5) {
    qualityScore -= 40;
  } else if (packetLoss > 2) {
    qualityScore -= 20;
  } else if (packetLoss > 0.5) {
    qualityScore -= 10;
  }
  
  // خصم النقاط بناءً على التذبذب
  if (jitter > 50) {
    qualityScore -= 20;
  } else if (jitter > 20) {
    qualityScore -= 10;
  } else if (jitter > 5) {
    qualityScore -= 5;
  }
  
  // ضمان أن الدرجة لا تقل عن 0
  qualityScore = Math.max(0, qualityScore);
  
  // تحديد التصنيف
  let classification: 'excellent' | 'good' | 'fair' | 'poor';
  if (qualityScore >= 90) {
    classification = 'excellent';
  } else if (qualityScore >= 70) {
    classification = 'good';
  } else if (qualityScore >= 40) {
    classification = 'fair';
  } else {
    classification = 'poor';
  }
  
  return {
    score: qualityScore,
    classification,
    timestamp: new Date().toISOString(),
  };
}

/**
 * تنظيف ذاكرة التخزين المؤقت للشبكة
 * @returns وعد بنجاح العملية
 */
export async function clearNetworkCache(): Promise<boolean> {
  if ('caches' in window) {
    try {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      return true;
    } catch (error) {
      console.error('فشل تنظيف ذاكرة التخزين المؤقت:', error);
      return false;
    }
  }
  return false;
}

/**
 * تحليل حالة الاتصال بالشبكة
 * @returns حالة الاتصال الحالية
 */
export function getNetworkStatus() {
  const connection = navigator.connection as any || 
                     (navigator as any).mozConnection || 
                     (navigator as any).webkitConnection;
  
  if (!connection) {
    return {
      online: navigator.onLine,
      type: 'unknown',
      effectiveType: 'unknown',
      downlink: -1,
      rtt: -1,
      saveData: false
    };
  }
  
  return {
    online: navigator.onLine,
    type: connection.type || 'unknown',
    effectiveType: connection.effectiveType || 'unknown',
    downlink: connection.downlink || -1,
    rtt: connection.rtt || -1,
    saveData: connection.saveData || false
  };
}
