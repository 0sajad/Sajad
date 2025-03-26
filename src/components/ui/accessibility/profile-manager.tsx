
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useTranslation } from "react-i18next";
import { 
  Save, Trash2, Download, Upload, CheckCircle2, 
  AlertTriangle, Info, RefreshCw
} from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

// نوع البيانات لملف التعريف
interface Profile {
  name: string;
  updatedAt?: string;
  version?: number;
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  // ... المزيد من الخصائص
}

interface ProfileManagerProps {
  profiles: Record<string, Profile>;
  activeProfile: string | null;
  onActivate: (name: string) => void;
  onSave: (name: string) => void;
  onDelete: (name: string) => void;
  onExport: (name: string) => void;
  onImport: () => void;
  onRestore?: (backupIndex: number) => void;
  backups?: Array<{timestamp: string, version: number}>;
}

export function ProfileManager({
  profiles,
  activeProfile,
  onActivate,
  onSave,
  onDelete,
  onExport,
  onImport,
  onRestore,
  backups = []
}: ProfileManagerProps) {
  const { t } = useTranslation();
  const [newProfileName, setNewProfileName] = useState("");
  const [showBackups, setShowBackups] = useState(false);
  
  // تحويل profiles من كائن إلى مصفوفة لتسهيل العرض
  const profilesList = Object.entries(profiles).map(([name, profile]) => ({
    name,
    ...profile,
  }));
  
  const handleSaveProfile = () => {
    if (newProfileName.trim()) {
      onSave(newProfileName.trim());
      setNewProfileName("");
    }
  };

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center justify-between">
          <span>{t('accessibility.profileManager', 'إدارة ملفات التعريف')}</span>
          {backups.length > 0 && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowBackups(!showBackups)}
              className="h-7 text-xs"
            >
              <RefreshCw className="h-3 w-3 mr-1 rtl:ml-1 rtl:mr-0" />
              {t('accessibility.backups', 'النسخ الاحتياطية')} 
              <Badge variant="secondary" className="ml-1 rtl:mr-1 rtl:ml-0">{backups.length}</Badge>
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* إنشاء ملف تعريف جديد */}
        <div className="flex gap-2 items-center">
          <Input
            value={newProfileName}
            onChange={(e) => setNewProfileName(e.target.value)}
            placeholder={t('accessibility.newProfileName', 'اسم الملف الشخصي الجديد')}
            className="flex-1 h-8 text-sm"
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" onClick={handleSaveProfile} disabled={!newProfileName.trim()} className="h-8">
                  <Save className="h-3.5 w-3.5 mr-1 rtl:ml-1 rtl:mr-0" />
                  {t('common.save', 'حفظ')}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t('accessibility.saveProfileTooltip', 'حفظ الإعدادات الحالية كملف شخصي جديد')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <Separator />
        
        {/* في حالة عدم وجود ملفات تعريف */}
        {profilesList.length === 0 ? (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              {t('accessibility.noProfiles', 'لا توجد ملفات تعريف محفوظة. أنشئ ملفًا شخصيًا جديدًا لحفظ إعداداتك الحالية.')}
            </AlertDescription>
          </Alert>
        ) : (
          <ScrollArea className="h-40">
            <div className="space-y-2">
              {profilesList.map((profile) => (
                <div 
                  key={profile.name}
                  className={`p-2 rounded-md border flex items-center justify-between ${
                    activeProfile === profile.name ? 'bg-primary/10 border-primary/30' : 'bg-card border-border'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="font-medium text-sm truncate">{profile.name}</div>
                    {profile.updatedAt && (
                      <div className="text-xs text-muted-foreground">
                        {new Date(profile.updatedAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-1">
                    {/* تنشيط الملف */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            size="sm" 
                            variant={activeProfile === profile.name ? "default" : "outline"}
                            onClick={() => onActivate(profile.name)}
                            className="h-7 w-7 p-0"
                            disabled={activeProfile === profile.name}
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{t('accessibility.activateProfile', 'تفعيل هذا الملف')}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    {/* تصدير الملف */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => onExport(profile.name)}
                            className="h-7 w-7 p-0"
                          >
                            <Download className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{t('accessibility.exportProfile', 'تصدير الملف')}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    {/* حذف الملف */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => onDelete(profile.name)}
                            className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{t('accessibility.deleteProfile', 'حذف الملف')}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
        
        {/* زر استيراد ملف */}
        <div className="flex justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onImport}
            className="text-xs h-8"
          >
            <Upload className="h-3.5 w-3.5 mr-1 rtl:ml-1 rtl:mr-0" />
            {t('accessibility.importProfile', 'استيراد ملف')}
          </Button>
        </div>
        
        {/* قسم النسخ الاحتياطية */}
        {showBackups && backups.length > 0 && (
          <>
            <Separator />
            
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <RefreshCw className="h-3.5 w-3.5 mr-1 rtl:ml-1 rtl:mr-0" />
                {t('accessibility.availableBackups', 'النسخ الاحتياطية المتوفرة')}
              </h4>
              
              <ScrollArea className="h-28">
                <div className="space-y-2">
                  {backups.map((backup, index) => (
                    <div key={index} className="p-2 rounded-md border bg-card border-border flex items-center justify-between">
                      <div>
                        <div className="text-xs font-medium">
                          {new Date(backup.timestamp).toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {t('accessibility.version', 'الإصدار')}: {backup.version}
                        </div>
                      </div>
                      
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onRestore && onRestore(index)}
                        className="h-7 text-xs"
                      >
                        {t('accessibility.restore', 'استعادة')}
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="mt-2">
                <Alert variant="outline" className="py-2">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    {t('accessibility.backupNote', 'ملاحظة: سيتم إنشاء نسخة احتياطية من الإعدادات الحالية قبل الاستعادة.')}
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
