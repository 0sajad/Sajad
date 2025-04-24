
/**
 * خطافات الأمان
 * سيتم استيراد جميع خطافات الأمان من هنا
 */

import { useState, useEffect, useCallback } from 'react';
import { isSecureConnection, checkPasswordStrength } from '../utils';

// خطاف للتحقق من أمان الاتصال
export const useConnectionSecurity = () => {
  const [isSecure, setIsSecure] = useState<boolean>(isSecureConnection());
  
  useEffect(() => {
    // تحقق من أمان الاتصال
    setIsSecure(isSecureConnection());
    
    // تحقق مرة أخرى عند تغيير العنوان (نادر، ولكن ممكن)
    const checkOnLocationChange = () => {
      setIsSecure(isSecureConnection());
    };
    
    window.addEventListener('popstate', checkOnLocationChange);
    
    return () => {
      window.removeEventListener('popstate', checkOnLocationChange);
    };
  }, []);
  
  return { isSecure };
};

// خطاف لفحص قوة كلمة المرور
export const usePasswordStrength = (initialPassword: string = '') => {
  const [password, setPassword] = useState<string>(initialPassword);
  const [strength, setStrength] = useState<{
    score: number;
    strength: string;
    suggestions: string[];
  }>({ score: 0, strength: '', suggestions: [] });
  
  useEffect(() => {
    if (password) {
      const result = checkPasswordStrength(password);
      setStrength(result);
    } else {
      setStrength({ score: 0, strength: '', suggestions: [] });
    }
  }, [password]);
  
  return {
    password,
    setPassword,
    score: strength.score,
    strengthText: strength.strength,
    suggestions: strength.suggestions
  };
};

// خطاف للتحقق من وجود تسريبات لكلمة المرور (محاكاة لخدمة مثل Have I Been Pwned)
export const usePasswordLeakCheck = () => {
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [hasLeaks, setHasLeaks] = useState<boolean | null>(null);
  const [leakCount, setLeakCount] = useState<number>(0);
  
  const checkPasswordLeak = useCallback(async (password: string) => {
    if (!password) return;
    
    setIsChecking(true);
    setHasLeaks(null);
    
    try {
      // هذه محاكاة فقط - في بيئة حقيقية ستستخدم API مثل HIBP
      // لا تنقل كلمات المرور عبر الشبكة كما هي، تستخدم k-anonymity ومفاهيم الأمان
      
      // محاكاة تأخير طلب الشبكة
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // توليد نتيجة عشوائية للتوضيح فقط
      const simulatedLeak = password.length < 8 || 
                           /123456|password|admin|qwerty/i.test(password);
      
      setHasLeaks(simulatedLeak);
      setLeakCount(simulatedLeak ? Math.floor(Math.random() * 10) + 1 : 0);
    } catch (error) {
      console.error('خطأ في التحقق من تسريبات كلمة المرور:', error);
    } finally {
      setIsChecking(false);
    }
  }, []);
  
  return { isChecking, hasLeaks, leakCount, checkPasswordLeak };
};

export default {
  useConnectionSecurity,
  usePasswordStrength,
  usePasswordLeakCheck
};
