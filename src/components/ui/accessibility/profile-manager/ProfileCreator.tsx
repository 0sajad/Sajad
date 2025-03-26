
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface ProfileCreatorProps {
  onSave: (name: string) => void;
}

export function ProfileCreator({ onSave }: ProfileCreatorProps) {
  const { t } = useTranslation();
  const [newProfileName, setNewProfileName] = useState("");
  
  const handleSave = () => {
    if (newProfileName.trim()) {
      onSave(newProfileName);
      setNewProfileName("");
    }
  };
  
  return (
    <div className="space-y-2">
      <Label>{t('accessibility.saveCurrentSettings', 'حفظ الإعدادات الحالية')}</Label>
      <div className="flex gap-2">
        <Input 
          placeholder={t('accessibility.newProfileName', 'اسم الملف الشخصي الجديد')}
          value={newProfileName}
          onChange={(e) => setNewProfileName(e.target.value)}
        />
        <Button 
          variant="secondary"
          onClick={handleSave}
        >
          <Save className="h-4 w-4 mr-2" />
          {t('accessibility.save', 'حفظ')}
        </Button>
      </div>
    </div>
  );
}
