
import React from "react";
import { Button } from "@/components/ui/button";
import { AccessibilityMenu } from "@/components/ui/accessibility-menu";
import { useA11y } from "@/hooks/useA11y";

export function QuickAccessibilityButton() {
  const { highContrast, largeText } = useA11y();
  
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <AccessibilityMenu />
      {/* يمكن إضافة مؤشرات حالة لمساعدة المستخدم في معرفة الوضع الحالي */}
      {(highContrast || largeText) && (
        <div className="absolute -top-2 -right-2 w-3 h-3 bg-primary rounded-full animate-pulse" />
      )}
    </div>
  );
}
