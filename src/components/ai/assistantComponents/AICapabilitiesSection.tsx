
import React from "react";
import { AICapabilitiesGrid } from "../AICapabilitiesGrid";
import { AICapabilitiesBadges } from "../AICapabilitiesBadges";

interface AICapabilitiesSectionProps {
  isCompact: boolean;
}

export function AICapabilitiesSection({ isCompact }: AICapabilitiesSectionProps) {
  return (
    <div className={isCompact ? "space-y-2" : ""}>
      <AICapabilitiesGrid isCompact={isCompact} />
      <AICapabilitiesBadges isCompact={isCompact} />
    </div>
  );
}
