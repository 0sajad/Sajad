
import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    // تجنب خطأ الاستدعاء في وضع العرض الخادمي (server rendering)
    if (typeof window === 'undefined') {
      return;
    }
    
    const media = window.matchMedia(query);
    
    // تعيين الحالة الأولية
    setMatches(media.matches);
    
    // إنشاء دالة للاستجابة للتغييرات
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // إضافة مستمع الحدث
    media.addEventListener("change", listener);
    
    // التنظيف عند إزالة المكون
    return () => {
      media.removeEventListener("change", listener);
    };
  }, [query]);
  
  return matches;
}
