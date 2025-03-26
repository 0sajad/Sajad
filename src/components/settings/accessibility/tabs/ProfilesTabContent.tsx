
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { ProfileManager } from "@/components/ui/accessibility/profile-manager";
import { ScreenReaderAnnouncements } from "@/components/ui/accessibility/screen-reader-announcements";

interface ProfilesTabContentProps {
  profiles: Record<string, any>;
  activeProfile: string | null;
  onActivate: (name: string) => void;
  onSave: (name: string) => void;
  onDelete: (name: string) => void;
  onExport: (name: string) => void;
  onImport: () => void;
  onRestore?: (backupIndex: number) => void;
  backups?: { name: string; date: string }[];
  announcements: any[];
}

export function ProfilesTabContent({
  profiles,
  activeProfile,
  onActivate,
  onSave,
  onDelete,
  onExport,
  onImport,
  onRestore,
  backups = [],
  announcements
}: ProfilesTabContentProps) {
  return (
    <TabsContent value="profiles" className="space-y-6 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileManager
          profiles={profiles}
          activeProfile={activeProfile}
          onActivate={onActivate}
          onSave={onSave}
          onDelete={onDelete}
          onExport={onExport}
          onImport={onImport}
          onRestore={onRestore}
          backups={backups}
        />
        
        <ScreenReaderAnnouncements announcements={announcements} />
      </div>
    </TabsContent>
  );
}
