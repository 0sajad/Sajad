
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";
import { 
  User, 
  Save, 
  Check, 
  Clock, 
  Download, 
  Upload, 
  Trash2, 
  MoreVertical, 
  CalendarClock, 
  AlertTriangle 
} from "lucide-react";

interface ProfileManagerProps {
  profiles: Record<string, any>;
  activeProfile: string | null;
  onActivate: (name: string) => void;
  onSave: (name: string) => void;
  onDelete: (name: string) => void;
  onExport: (name: string) => void;
  onImport: () => void;
  onRestore?: (backupIndex: number) => void;
  backups?: { name: string; date: string }[];
}

/**
 * مكون إدارة ملفات تعريف إمكانية الوصول
 */
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
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showBackupsSheet, setShowBackupsSheet] = useState(false);
  
  // التحقق من وجود ملفات تعريف محفوظة
  const hasProfiles = Object.keys(profiles).length > 0;
  
  // استخراج أسماء ملفات التعريف
  const profileNames = Object.keys(profiles);
  
  // التحقق من وجود نسخ احتياطية
  const hasBackups = backups.length > 0;
  
  // معالج حفظ ملف تعريف جديد
  const handleSaveProfile = () => {
    if (!newProfileName.trim()) {
      toast({
        title: t('accessibility.missingProfileName', 'اسم الملف الشخصي مفقود'),
        description: t('accessibility.enterProfileName', 'يرجى إدخال اسم للملف الشخصي الجديد'),
        variant: 'destructive'
      });
      return;
    }
    
    onSave(newProfileName);
    setNewProfileName("");
  };
  
  // معالج حذف ملف تعريف
  const handleConfirmDelete = () => {
    if (selectedProfile) {
      onDelete(selectedProfile);
      setShowDeleteDialog(false);
      setSelectedProfile(null);
    }
  };
  
  // معالج استعادة نسخة احتياطية
  const handleRestoreBackup = (index: number) => {
    if (onRestore) {
      onRestore(index);
      setShowBackupsSheet(false);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          {t('accessibility.profileManager', 'إدارة الملفات الشخصية')}
        </CardTitle>
        <CardDescription>
          {t('accessibility.profileManagerDescription', 'حفظ وتحميل إعدادات إمكانية الوصول المخصصة')}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* تحميل ملف تعريف موجود */}
        {hasProfiles && (
          <div className="space-y-2">
            <Label>{t('accessibility.loadProfile', 'تحميل ملف شخصي')}</Label>
            <div className="flex gap-2">
              <Select 
                value={selectedProfile || ""} 
                onValueChange={setSelectedProfile}
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
                    onClick={() => setShowDeleteDialog(true)} 
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {t('accessibility.delete', 'حذف')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}
        
        {/* إنشاء ملف تعريف جديد */}
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
              onClick={handleSaveProfile}
            >
              <Save className="h-4 w-4 mr-2" />
              {t('accessibility.save', 'حفظ')}
            </Button>
          </div>
        </div>
        
        {/* استيراد وتصدير */}
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="secondary" 
            size="sm"
            onClick={onImport}
          >
            <Upload className="h-4 w-4 mr-2" />
            {t('accessibility.importSettings', 'استيراد الإعدادات')}
          </Button>
          
          {hasBackups && onRestore && (
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => setShowBackupsSheet(true)}
            >
              <Clock className="h-4 w-4 mr-2" />
              {t('accessibility.restoreBackup', 'استعادة نسخة احتياطية')}
            </Button>
          )}
        </div>
      </CardContent>
      
      {!hasProfiles && (
        <CardFooter className="border-t p-4">
          <div className="flex items-center justify-center w-full p-4 rounded-md bg-muted/50">
            <p className="text-sm text-muted-foreground">
              {t('accessibility.noProfilesYet', 'لم يتم حفظ أي ملفات شخصية بعد. قم بتخصيص إعدادات إمكانية الوصول واحفظها كملف شخصي لاستخدامها لاحقًا.')}
            </p>
          </div>
        </CardFooter>
      )}
      
      {/* مربع حوار تأكيد الحذف */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              {t('accessibility.confirmDelete', 'تأكيد الحذف')}
            </DialogTitle>
            <DialogDescription>
              {t('accessibility.deleteConfirmation', 'هل أنت متأكد من رغبتك في حذف الملف الشخصي "{name}"؟ لا يمكن التراجع عن هذا الإجراء.', { name: selectedProfile || '' })}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-between sm:justify-end">
            <Button
              variant="default"
              onClick={() => setShowDeleteDialog(false)}
            >
              {t('common.cancel', 'إلغاء')}
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
            >
              {t('common.delete', 'حذف')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* شريط النسخ الاحتياطية */}
      {hasBackups && onRestore && (
        <Sheet open={showBackupsSheet} onOpenChange={setShowBackupsSheet}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <CalendarClock className="h-5 w-5" />
                {t('accessibility.backups', 'النسخ الاحتياطية')}
              </SheetTitle>
              <SheetDescription>
                {t('accessibility.backupsDescription', 'استعادة إعداداتك من نسخة احتياطية سابقة')}
              </SheetDescription>
            </SheetHeader>
            
            <div className="mt-6 space-y-4">
              {backups.map((backup, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{backup.name}</p>
                    <p className="text-sm text-muted-foreground">{backup.date}</p>
                  </div>
                  <Button 
                    variant="secondary"
                    size="sm"
                    onClick={() => handleRestoreBackup(index)}
                  >
                    {t('accessibility.restore', 'استعادة')}
                  </Button>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      )}
    </Card>
  );
}
