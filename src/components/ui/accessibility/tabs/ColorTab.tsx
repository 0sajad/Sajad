
import { useA11y } from "@/hooks/accessibility/useA11yContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { type ColorBlindMode } from "@/hooks/types/accessibility";

export function ColorTab() {
  const { t } = useTranslation();
  const a11y = useA11y();

  const colorBlindModes: {value: ColorBlindMode, label: string}[] = [
    { value: "none", label: t('accessibility.colorBlindNone') },
    { value: "protanopia", label: t('accessibility.protanopia') },
    { value: "deuteranopia", label: t('accessibility.deuteranopia') },
    { value: "tritanopia", label: t('accessibility.tritanopia') },
    { value: "achromatopsia", label: t('accessibility.achromatopsia') },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="high-contrast">{t('accessibility.highContrast')}</Label>
          <p className="text-sm text-muted-foreground">{t('accessibility.highContrastDesc')}</p>
        </div>
        <Switch 
          id="high-contrast" 
          checked={a11y.highContrast} 
          onCheckedChange={a11y.setHighContrast} 
        />
      </div>

      <div>
        <Label htmlFor="color-blind-mode">{t('accessibility.colorBlindMode')}</Label>
        <p className="text-sm text-muted-foreground mb-2">{t('accessibility.colorBlindModeDesc')}</p>
        <Select 
          value={a11y.colorBlindMode as ColorBlindMode} 
          onValueChange={(value) => a11y.setColorBlindMode(value as ColorBlindMode)}
        >
          <SelectTrigger id="color-blind-mode">
            <SelectValue placeholder={t('accessibility.selectColorMode')} />
          </SelectTrigger>
          <SelectContent>
            {colorBlindModes.map(mode => (
              <SelectItem key={mode.value} value={mode.value}>
                {mode.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
