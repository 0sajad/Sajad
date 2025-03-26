
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { toast } from "@/components/ui/use-toast";
import { User } from "lucide-react";
import { ProfileSelector } from "./profile-manager/ProfileSelector";
import { ProfileCreator } from "./profile-manager/ProfileCreator";
import { ImportExportButtons } from "./profile-manager/ImportExportButtons";
import { DeleteProfileDialog } from "./profile-manager/DeleteProfileDialog";
import { BackupsSheet } from "./profile-manager/BackupsSheet";
import { EmptyProfilesState } from "./profile-manager/EmptyProfilesState";

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
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showBackupsSheet, setShowBackupsSheet] = useState(false);
  
  // Check if profiles exist
  const hasProfiles = Object.keys(profiles).length > 0;
  
  // Extract profile names
  const profileNames = Object.keys(profiles);
  
  // Check if backups exist
  const hasBackups = backups.length > 0;
  
  // Save profile handler
  const handleSaveProfile = (name: string) => {
    if (!name.trim()) {
      toast({
        title: t('accessibility.missingProfileName', 'اسم الملف الشخصي مفقود'),
        description: t('accessibility.enterProfileName', 'يرجى إدخال اسم للملف الشخصي الجديد'),
        variant: 'destructive'
      });
      return;
    }
    
    onSave(name);
  };
  
  // Delete profile handler
  const handleConfirmDelete = () => {
    if (selectedProfile) {
      onDelete(selectedProfile);
      setShowDeleteDialog(false);
      setSelectedProfile(null);
    }
  };
  
  // Request delete (show dialog)
  const handleRequestDelete = () => {
    setShowDeleteDialog(true);
  };
  
  // Show backups sheet
  const handleShowBackups = () => {
    setShowBackupsSheet(true);
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
        {/* Profile selector */}
        {hasProfiles && (
          <ProfileSelector 
            profileNames={profileNames}
            selectedProfile={selectedProfile}
            activeProfile={activeProfile}
            onSelectProfile={setSelectedProfile}
            onActivate={onActivate}
            onExport={onExport}
            onRequestDelete={handleRequestDelete}
          />
        )}
        
        {/* Profile creator */}
        <ProfileCreator onSave={handleSaveProfile} />
        
        {/* Import/Export buttons */}
        <ImportExportButtons 
          onImport={onImport}
          onShowBackups={hasBackups && onRestore ? handleShowBackups : undefined}
          hasBackups={hasBackups && !!onRestore}
        />
      </CardContent>
      
      {/* Empty state */}
      {!hasProfiles && <EmptyProfilesState />}
      
      {/* Delete confirmation dialog */}
      <DeleteProfileDialog 
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        profileName={selectedProfile}
        onConfirmDelete={handleConfirmDelete}
      />
      
      {/* Backups sheet */}
      {hasBackups && onRestore && (
        <BackupsSheet 
          open={showBackupsSheet}
          onOpenChange={setShowBackupsSheet}
          backups={backups}
          onRestore={onRestore}
        />
      )}
    </Card>
  );
}
