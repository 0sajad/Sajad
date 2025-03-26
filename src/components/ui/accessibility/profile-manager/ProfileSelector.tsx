
import React from "react";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Check, Download, MoreVertical, Trash2 } from "lucide-react";

interface ProfileSelectorProps {
  profileNames: string[];
  selectedProfile: string | null;
  activeProfile: string | null;
  onSelectProfile: (name: string) => void;
  onActivate: (name: string) => void;
  onExport: (name: string) => void;
  onRequestDelete: () => void;
}

export function ProfileSelector({
  profileNames,
  selectedProfile,
  activeProfile,
  onSelectProfile,
  onActivate,
  onExport,
  onRequestDelete
}: ProfileSelectorProps) {
  const { t } = useTranslation();
  
  if (profileNames.length === 0) {
    return null;
  }
  
  return (
    <div className="space-y-2">
      <Label>{t('accessibility.loadProfile', 'تحميل ملف شخصي')}</Label>
      <div className="flex gap-2">
        <Select 
          value={selectedProfile || ""} 
          onValueChange={onSelectProfile}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t('accessibility.selectProfile', 'اختر ملفًا شخصيًا')} />
          </SelectTrigger>
          <SelectContent>
            {profileNames.map(name => (
              <SelectItem key={name} value={name}>
                <div className="flex items-center gap-2">
                  <span>{name}</span>
                  {name === activeProfile && (
                    <Badge variant="secondary" className="ml-2">
                      <Check className="h-3 w-3 mr-1" />
                      {t('accessibility.active', 'نشط')}
                    </Badge>
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button 
          variant="secondary"
          disabled={!selectedProfile}
          onClick={() => selectedProfile && onActivate(selectedProfile)}
        >
          {t('accessibility.load', 'تحميل')}
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" disabled={!selectedProfile} size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => selectedProfile && onExport(selectedProfile)}>
              <Download className="h-4 w-4 mr-2" />
              {t('accessibility.export', 'تصدير')}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={onRequestDelete} 
              className="text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {t('accessibility.delete', 'حذف')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
