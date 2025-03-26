
import React from "react";
import { useTranslation } from "react-i18next";
import { CardFooter } from "@/components/ui/card";

export function EmptyProfilesState() {
  const { t } = useTranslation();
  
  return (
    <CardFooter className="border-t p-4">
      <div className="flex items-center justify-center w-full p-4 rounded-md bg-muted/50">
        <p className="text-sm text-muted-foreground">
          {t('accessibility.noProfilesYet', 'لم يتم حفظ أي ملفات شخصية بعد. قم بتخصيص إعدادات إمكانية الوصول واحفظها كملف شخصي لاستخدامها لاحقًا.')}
        </p>
      </div>
    </CardFooter>
  );
}
