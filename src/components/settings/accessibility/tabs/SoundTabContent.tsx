
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { SoundNotifications } from "@/components/ui/accessibility/sound-notifications";

interface SoundTabContentProps {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
  volume: number;
  setVolume: (value: number) => void;
  voice: string;
  setVoice: (value: string) => void;
}

export function SoundTabContent({
  enabled,
  setEnabled,
  volume,
  setVolume,
  voice,
  setVoice
}: SoundTabContentProps) {
  return (
    <TabsContent value="sound" className="space-y-6 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SoundNotifications
          enabled={enabled}
          setEnabled={setEnabled}
          volume={volume}
          setVolume={setVolume}
          voice={voice}
          setVoice={setVoice}
        />
      </div>
    </TabsContent>
  );
}
