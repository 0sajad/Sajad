
/**
 * أدوات مساعدة للشبكة
 * تتضمن وظائف المساعدة والثوابت
 */

// طريقة تنفيذ الفحص السريع للاتصال
export const checkNetworkConnection = async (): Promise<boolean> => {
  try {
    const response = await fetch('https://www.google.com/generate_204', {
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'no-store',
    });
    
    return response.type === 'opaque' || response.ok;
  } catch (error) {
    console.error('خطأ في فحص الاتصال بالشبكة:', error);
    return false;
  }
};

// التحقق من سرعة الاتصال (تقريبي)
export const estimateConnectionSpeed = async (): Promise<{speed: number, quality: string}> => {
  const startTime = Date.now();
  try {
    // تحميل ملف صغير لاختبار السرعة
    const response = await fetch('https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png', {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      return { speed: 0, quality: 'ضعيفة' };
    }
    
    const blob = await response.blob();
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000; // بالثواني
    const fileSizeInBits = blob.size * 8;
    const speedMbps = (fileSizeInBits / duration) / 1000000;
    
    // تحديد جودة الاتصال بناءً على السرعة
    let quality;
    if (speedMbps < 1) {
      quality = 'ضعيفة';
    } else if (speedMbps < 5) {
      quality = 'متوسطة';
    } else if (speedMbps < 20) {
      quality = 'جيدة';
    } else {
      quality = 'ممتازة';
    }
    
    return { speed: parseFloat(speedMbps.toFixed(2)), quality };
  } catch (error) {
    console.error('خطأ في تقدير سرعة الاتصال:', error);
    return { speed: 0, quality: 'غير متوفر' };
  }
};

// الكشف عن نوع الشبكة (إذا كان متاحًا)
export const detectNetworkType = (): string => {
  if ('connection' in navigator) {
    // @ts-ignore - لأن خاصية connection قد لا تكون معروفة في بعض المتصفحات
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection && connection.effectiveType) {
      return connection.effectiveType; // مثل '4g', '3g', إلخ
    }
  }
  return 'غير معروف';
};

export default {
  checkNetworkConnection,
  estimateConnectionSpeed,
  detectNetworkType
};
