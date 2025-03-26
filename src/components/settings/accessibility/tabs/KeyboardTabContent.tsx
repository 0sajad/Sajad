
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { KeyboardShortcutsList, defaultA11yShortcuts } from "@/components/ui/accessibility/keyboard-shortcuts-list";

export function KeyboardTabContent() {
  return (
    <TabsContent value="keyboard" className="space-y-6 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <KeyboardShortcutsList shortcuts={defaultA11yShortcuts} />
      </div>
    </TabsContent>
  );
}
