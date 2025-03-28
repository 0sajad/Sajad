
import React from "react";
import { AIStatusIndicator } from "../AIStatusIndicator";
import { AIProgressBar } from "../AIProgressBar";
import { AIFeatureIndicator } from "../AIFeatureIndicator";

interface AIStatusSectionProps {
  status: "learning" | "processing" | "idle" | "protecting" | "analyzing" | "optimizing";
  progress: number;
  currentFeature: number;
}

export function AIStatusSection({ status, progress, currentFeature }: AIStatusSectionProps) {
  return (
    <div className="space-y-4">
      <AIStatusIndicator status={status} progress={progress} />
      <AIProgressBar progress={progress} status={status} />
      <AIFeatureIndicator currentFeature={currentFeature} />
    </div>
  );
}
