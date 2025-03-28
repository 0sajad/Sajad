
import { useEffect, RefObject } from 'react';

/**
 * خطاف للكشف عن النقر خارج عنصر محدد
 * @param ref المرجع للعنصر الذي نريد مراقبة النقر خارجه
 * @param handler الدالة التي ستنفذ عند النقر خارج العنصر
 */
export function useOnClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // إذا لم يتم تهيئة المرجع أو إذا كان النقر داخل العنصر
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      
      handler(event);
    };
    
    // إضافة مستمعي الأحداث
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    
    // تنظيف المستمعين عند إلغاء تحميل المكون
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
