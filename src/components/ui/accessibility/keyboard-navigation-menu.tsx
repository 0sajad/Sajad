
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useA11y } from "@/hooks/useA11y";

export function KeyboardNavigationMenu() {
  const [visible, setVisible] = useState(false);
  const { 
    keyboardNavigationVisible, 
    setKeyboardNavigationVisible,
    playNotificationSound 
  } = useA11y();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // إظهار قائمة التنقل بلوحة المفاتيح عند ضغط ؟
      if (e.key === "?" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setKeyboardNavigationVisible(!keyboardNavigationVisible);
        playNotificationSound("info");
      }

      // إخفاء القائمة عند الضغط على Escape
      if (e.key === "Escape" && keyboardNavigationVisible) {
        setKeyboardNavigationVisible(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keyboardNavigationVisible, setKeyboardNavigationVisible, playNotificationSound]);

  useEffect(() => {
    setVisible(keyboardNavigationVisible);
  }, [keyboardNavigationVisible]);

  if (!visible) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="keyboard-nav-title"
    >
      <div className="bg-background rounded-lg shadow-lg max-w-3xl w-full max-h-[80vh] overflow-auto p-6">
        <h2 id="keyboard-nav-title" className="text-2xl font-bold mb-4">اختصارات لوحة المفاتيح</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-medium text-lg">التنقل العام</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-muted-foreground">الصفحة الرئيسية</span>
                <kbd className="bg-muted px-2 py-1 rounded">Alt + H</kbd>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">لوحة التحكم</span>
                <kbd className="bg-muted px-2 py-1 rounded">Alt + D</kbd>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">الإعدادات</span>
                <kbd className="bg-muted px-2 py-1 rounded">Alt + S</kbd>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-lg">إمكانية الوصول</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-muted-foreground">تبديل الوضع المظلم</span>
                <kbd className="bg-muted px-2 py-1 rounded">Alt + T</kbd>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">تكبير النص</span>
                <kbd className="bg-muted px-2 py-1 rounded">Alt + +</kbd>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">تصغير النص</span>
                <kbd className="bg-muted px-2 py-1 rounded">Alt + -</kbd>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button 
            variant="outline" 
            onClick={() => setKeyboardNavigationVisible(false)}
          >
            إغلاق
          </Button>
        </div>
      </div>
    </div>
  );
}
