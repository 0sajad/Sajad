
/**
 * أدوات مساعدة للأمان
 * تتضمن وظائف المساعدة والثوابت
 */

// التحقق مما إذا كان الاتصال آمنًا (HTTPS)
export const isSecureConnection = (): boolean => {
  return window.location.protocol === 'https:';
};

// تشفير النص البسيط (للتخزين الآمن في localStorage)
export const encryptText = (text: string, secretKey: string = 'octa-network'): string => {
  // تنفيذ تشفير بسيط للأغراض التوضيحية
  // ملاحظة: هذا ليس تشفيرًا آمنًا للاستخدام الإنتاجي
  try {
    return btoa(
      encodeURIComponent(
        Array.from(text)
          .map((char, i) => 
            String.fromCharCode(char.charCodeAt(0) ^ secretKey.charCodeAt(i % secretKey.length))
          )
          .join('')
      )
    );
  } catch (e) {
    console.error('خطأ في تشفير النص:', e);
    return '';
  }
};

// فك تشفير النص
export const decryptText = (encryptedText: string, secretKey: string = 'octa-network'): string => {
  // فك التشفير البسيط المقابل للدالة السابقة
  try {
    const decoded = decodeURIComponent(atob(encryptedText));
    return Array.from(decoded)
      .map((char, i) => 
        String.fromCharCode(char.charCodeAt(0) ^ secretKey.charCodeAt(i % secretKey.length))
      )
      .join('');
  } catch (e) {
    console.error('خطأ في فك تشفير النص:', e);
    return '';
  }
};

// فحص قوة كلمة المرور
export const checkPasswordStrength = (password: string): {
  score: number; // من 0 إلى 5
  strength: string;
  suggestions: string[];
} => {
  const suggestions: string[] = [];
  let score = 0;
  
  if (password.length < 8) {
    suggestions.push('استخدم على الأقل 8 أحرف');
  } else {
    score += 1;
  }
  
  if (password.match(/[A-Z]/)) {
    score += 1;
  } else {
    suggestions.push('استخدم حرفًا كبيرًا واحدًا على الأقل');
  }
  
  if (password.match(/[a-z]/)) {
    score += 1;
  } else {
    suggestions.push('استخدم حرفًا صغيرًا واحدًا على الأقل');
  }
  
  if (password.match(/[0-9]/)) {
    score += 1;
  } else {
    suggestions.push('استخدم رقمًا واحدًا على الأقل');
  }
  
  if (password.match(/[^A-Za-z0-9]/)) {
    score += 1;
  } else {
    suggestions.push('استخدم رمزًا خاصًا واحدًا على الأقل');
  }
  
  let strength;
  switch (score) {
    case 0:
    case 1:
      strength = 'ضعيفة جدًا';
      break;
    case 2:
      strength = 'ضعيفة';
      break;
    case 3:
      strength = 'متوسطة';
      break;
    case 4:
      strength = 'قوية';
      break;
    case 5:
      strength = 'قوية جدًا';
      break;
    default:
      strength = 'غير معروفة';
  }
  
  return { score, strength, suggestions };
};

export default {
  isSecureConnection,
  encryptText,
  decryptText,
  checkPasswordStrength
};
