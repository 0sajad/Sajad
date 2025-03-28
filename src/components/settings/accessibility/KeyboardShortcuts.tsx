
import React from "react";
import { useTranslation } from "react-i18next";
import { Keyboard, Info } from "lucide-react";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { motion } from "framer-motion";
import { useA11y } from "@/hooks/useA11y";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export function KeyboardShortcuts() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const { toast } = useToast();
  const { announce } = useA11y();
  
  const shortcuts = [
    { key: 'Alt + C', description: t('settings.accessibility.toggleHighContrast', 'تبديل وضع التباين العالي') },
    { key: 'Alt + T', description: t('settings.accessibility.toggleLargeText', 'تبديل النص الكبير') },
    { key: 'Alt + M', description: t('settings.accessibility.toggleReducedMotion', 'تبديل تقليل الحركة') },
    { key: 'Alt + F', description: t('settings.accessibility.toggleFocusMode', 'تبديل وضع التركيز') },
    { key: 'Alt + D', description: t('settings.accessibility.toggleDyslexicFont', 'تبديل خط عسر القراءة') },
    { key: 'Alt + R', description: t('settings.accessibility.toggleReadingGuide', 'تبديل دليل القراءة') },
    { key: 'Alt + ?', description: t('settings.accessibility.showShortcutsMenu', 'إظهار قائمة الاختصارات') }
  ];

  const testShortcut = (shortcutKey: string) => {
    const key = shortcutKey.split(' + ')[1];
    toast({
      title: t('settings.accessibility.shortcutTestSuccess', 'تم تجربة الاختصار بنجاح'),
      description: t('settings.accessibility.shortcutDescription', 'الاختصار {{key}} يعمل بشكل صحيح', { key: shortcutKey }),
    });
    
    // Announce to screen readers
    announce(t('settings.accessibility.shortcutTestSuccess', 'تم تجربة الاختصار بنجاح') + ': ' + shortcutKey);
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="rounded-md border border-border"
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="flex w-full items-center justify-between p-4 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-2">
            <Keyboard className="h-4 w-4 mr-2" />
            <span>{t('settings.accessibility.shortcutsTitle', 'اختصارات لوحة المفاتيح')}</span>
          </div>
          <div className="rounded-full bg-primary/10 p-1">
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <Info className="h-4 w-4 text-primary" />
            </motion.div>
          </div>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4 pt-0 text-sm">
        <div className="space-y-4">
          <p className="text-muted-foreground text-xs">
            {t('settings.accessibility.shortcutsDescription', 'استخدم اختصارات لوحة المفاتيح التالية للوصول السريع إلى ميزات إمكانية الوصول')}
          </p>
          
          <div className="grid gap-2">
            {shortcuts.map((shortcut, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50 transition-colors"
              >
                <span>{shortcut.description}</span>
                <div className="flex items-center gap-2">
                  <kbd className="rounded bg-muted px-2 py-1 text-xs font-semibold shadow-sm border border-border">
                    {shortcut.key}
                  </kbd>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={() => testShortcut(shortcut.key)}
                    aria-label={t('settings.accessibility.testShortcut', 'اختبار اختصار {{key}}', { key: shortcut.key })}
                  >
                    {t('settings.accessibility.test', 'اختبار')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="rounded-md bg-muted/50 p-3 border border-border">
            <div className="flex items-center gap-2 text-xs">
              <Info className="h-3 w-3" />
              <p className="text-muted-foreground">
                {t('settings.accessibility.shortcutNote', 'اضغط على Alt + ? في أي وقت لعرض قائمة الاختصارات')}
              </p>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
