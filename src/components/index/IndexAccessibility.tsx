
import React from "react";
import { ReadingGuide } from "@/components/ui/accessibility/reading-guide";
import { KeyboardNavigationMenu } from "@/components/ui/accessibility/keyboard-navigation-menu";
import { KeyboardFocusDetector } from "@/components/ui/accessibility/keyboard-focus-detector";
import { LiveAnnouncer } from "@/components/ui/accessibility/live-announcer";

export const IndexAccessibility: React.FC = () => {
  return (
    <>
      <ReadingGuide />
      <KeyboardNavigationMenu />
      <KeyboardFocusDetector />
      <LiveAnnouncer />
    </>
  );
};
