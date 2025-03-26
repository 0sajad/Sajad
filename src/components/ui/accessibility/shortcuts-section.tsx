
import React from "react";
import { Keyboard } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ShortcutsSection() {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <Keyboard className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <h4 className="text-sm font-medium" id="shortcuts-heading">
          {t('accessibility.keyboardShortcuts')}
        </h4>
      </div>
      <p 
        className="text-xs text-muted-foreground"
        aria-labelledby="shortcuts-heading"
      >
        {t('accessibility.keyboardShortcutsDescription')}
      </p>
      <ul className="text-xs text-muted-foreground space-y-1 ml-6 rtl:mr-6 rtl:ml-0" aria-labelledby="shortcuts-heading">
        <li>{t('accessibility.altC')}</li>
        <li>{t('accessibility.altT')}</li>
        <li>{t('accessibility.altM')}</li>
        <li>{t('accessibility.altF')}</li>
        <li>{t('accessibility.altD')}</li>
      </ul>
    </div>
  );
}
