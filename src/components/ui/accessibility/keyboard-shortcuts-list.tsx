
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Keyboard, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ShortcutItem {
  key: string;
  label: string;
  description?: string;
  category?: string;
}

interface KeyboardShortcutsListProps {
  shortcuts: ShortcutItem[];
  enableHint?: boolean;
}

export function KeyboardShortcutsList({
  shortcuts,
  enableHint = true
}: KeyboardShortcutsListProps) {
  const { t } = useTranslation();
  
  // تجميع الاختصارات حسب الفئة
  const groupedShortcuts: Record<string, ShortcutItem[]> = {};
  shortcuts.forEach(shortcut => {
    const category = shortcut.category || t('accessibility.general', 'عام');
    if (!groupedShortcuts[category]) {
      groupedShortcuts[category] = [];
    }
    groupedShortcuts[category].push(shortcut);
  });
  
  // تنسيق مفتاح الاختصار
  const formatKey = (key: string) => {
    return key.split('+').map(k => (
      <kbd key={k} className="px-2 py-0.5 text-xs bg-muted rounded border border-border mx-0.5">
        {k.trim()}
      </kbd>
    ));
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center">
          <Keyboard className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" aria-hidden="true" />
          {t('accessibility.keyboardShortcuts', 'اختصارات لوحة المفاتيح')}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {enableHint && (
          <Alert variant="outline" className="py-2">
            <Info className="h-4 w-4" />
            <AlertDescription className="text-xs">
              {t('accessibility.shortcutsNote', 'اضغط على Alt + ؟ في أي وقت لعرض هذه الاختصارات')}
            </AlertDescription>
          </Alert>
        )}
        
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-6">
            {Object.entries(groupedShortcuts).map(([category, categoryShortcuts]) => (
              <div key={category} className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">{category}</h3>
                
                <div className="space-y-2">
                  {categoryShortcuts.map((shortcut) => (
                    <div key={shortcut.key} className="flex justify-between items-start py-1 border-b border-border/30 last:border-0">
                      <div>
                        <p className="text-sm">{shortcut.label}</p>
                        {shortcut.description && (
                          <p className="text-xs text-muted-foreground mt-0.5">{shortcut.description}</p>
                        )}
                      </div>
                      <div className="flex items-center">{formatKey(shortcut.key)}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

// قائمة الاختصارات الافتراضية
export const defaultA11yShortcuts: ShortcutItem[] = [
  { 
    key: 'Alt+C', 
    label: 'تبديل وضع التباين العالي',
    category: 'إمكانية الوصول'
  },
  { 
    key: 'Alt+T', 
    label: 'تبديل حجم النص الكبير',
    category: 'إمكانية الوصول'
  },
  { 
    key: 'Alt+M', 
    label: 'تبديل تقليل الحركة',
    category: 'إمكانية الوصول'
  },
  { 
    key: 'Alt+F', 
    label: 'تبديل وضع التركيز',
    category: 'إمكانية الوصول'
  },
  { 
    key: 'Alt+D', 
    label: 'تبديل خط عسر القراءة',
    category: 'إمكانية الوصول'
  },
  { 
    key: 'Alt+R', 
    label: 'تبديل دليل القراءة',
    category: 'إمكانية الوصول'
  },
  { 
    key: 'Alt+?', 
    label: 'عرض اختصارات لوحة المفاتيح',
    category: 'المساعدة'
  },
  { 
    key: 'Alt+/', 
    label: 'فتح قائمة إمكانية الوصول',
    category: 'المساعدة'
  },
  { 
    key: 'Tab', 
    label: 'التنقل بين العناصر',
    category: 'التنقل'
  },
  { 
    key: 'Shift+Tab', 
    label: 'التنقل للخلف بين العناصر',
    category: 'التنقل'
  },
  { 
    key: 'Enter', 
    label: 'تنشيط العنصر المحدد',
    category: 'التنقل'
  },
  { 
    key: 'Space', 
    label: 'تنشيط/تحديد العنصر المحدد',
    category: 'التنقل'
  },
  { 
    key: 'Esc', 
    label: 'إغلاق/إلغاء',
    category: 'التنقل'
  }
];
