
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { ProfileManager } from "@/components/ui/accessibility/profile-manager";
import { useScreenReaderAnnouncements } from "@/components/ui/accessibility/screen-reader-announcements";

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
  const { announce } = useScreenReaderAnnouncements();
  
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
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">إعلانات قارئ الشاشة الأخيرة</h3>
          {announcements && announcements.length > 0 ? (
            <ul className="space-y-2 border rounded-md p-4">
              {announcements.map((announcement, index) => (
                <li key={index} className="text-sm p-2 border-b last:border-0">
                  {announcement.text || announcement}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-sm">لا توجد إعلانات حتى الآن.</p>
          )}
        </div>
      </div>
    </TabsContent>
  );
}
