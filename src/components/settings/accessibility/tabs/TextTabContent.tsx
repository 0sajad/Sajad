
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { ArabicTextEnhancer } from "@/components/ui/accessibility/arabic-text-enhancer";

interface TextTabContentProps {
  fontFamily: string;
  setFontFamily: (value: string) => void;
  lineHeight: number;
  setLineHeight: (value: number) => void;
  letterSpacing: number;
  setLetterSpacing: (value: number) => void;
  kashidaEnabled: boolean;
  setKashidaEnabled: (value: boolean) => void;
}

export function TextTabContent({
  fontFamily,
  setFontFamily,
  lineHeight,
  setLineHeight,
  letterSpacing,
  setLetterSpacing,
  kashidaEnabled,
  setKashidaEnabled
}: TextTabContentProps) {
  return (
    <TabsContent value="text" className="space-y-6 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ArabicTextEnhancer
          fontFamily={fontFamily}
          setFontFamily={setFontFamily}
          lineHeight={lineHeight}
          setLineHeight={setLineHeight}
          letterSpacing={letterSpacing}
          setLetterSpacing={setLetterSpacing}
          kashidaEnabled={kashidaEnabled}
          setKashidaEnabled={setKashidaEnabled}
        />
      </div>
    </TabsContent>
  );
}
