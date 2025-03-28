
import React, { useState } from "react";
import { Check, ChevronDown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

type AIModel = {
  id: string;
  name: string;
  description: string;
  isAdvanced?: boolean;
  isPremium?: boolean;
  category: "text" | "image" | "voice" | "code";
};

const availableModels: AIModel[] = [
  { id: "octa-1", name: "OCTA-1", description: "النموذج الأساسي للنصوص والمحادثة", category: "text" },
  { id: "octa-2", name: "OCTA-2", description: "نموذج محسن للنصوص والتفاعل", category: "text", isAdvanced: true },
  { id: "octa-image", name: "OCTA-Image", description: "نموذج لتحليل الصور", category: "image" },
  { id: "octa-voice", name: "OCTA-Voice", description: "نموذج للتفاعل الصوتي", category: "voice" },
  { id: "octa-code", name: "OCTA-Code", description: "نموذج متخصص بتحليل وكتابة الأكواد البرمجية", category: "code", isAdvanced: true, isPremium: true },
];

interface AIModelSelectorProps {
  onSelectModel?: (model: AIModel) => void;
}

export function AIModelSelector({ onSelectModel }: AIModelSelectorProps) {
  const { t } = useTranslation();
  const [selectedModel, setSelectedModel] = useState<AIModel>(availableModels[0]);

  const handleSelectModel = (model: AIModel) => {
    setSelectedModel(model);
    if (onSelectModel) {
      onSelectModel(model);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "text":
        return "💬";
      case "image":
        return "🖼️";
      case "voice":
        return "🎤";
      case "code":
        return "⌨️";
      default:
        return "🤖";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center px-3 py-1.5 h-auto text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20">
          <span className="flex items-center">
            {getCategoryIcon(selectedModel.category)}
            <span className="mx-2">{selectedModel.name}</span>
            {selectedModel.isAdvanced && (
              <Zap size={12} className="text-amber-300 mr-1" />
            )}
          </span>
          <ChevronDown size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{t('ai.selectModel', 'اختر نموذجاً')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {availableModels.map((model) => (
          <DropdownMenuItem
            key={model.id}
            className="flex items-center justify-between py-2 cursor-pointer"
            onClick={() => handleSelectModel(model)}
          >
            <div className="flex items-start">
              <span className="text-lg mr-2">{getCategoryIcon(model.category)}</span>
              <div>
                <div className="flex items-center">
                  <span className="font-medium">{model.name}</span>
                  {model.isPremium && (
                    <Badge variant="outline" className="ml-1.5 text-[10px] bg-gradient-to-r from-amber-500 to-amber-300 text-white border-0">
                      {t('common.premium', 'مميز')}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{model.description}</p>
              </div>
            </div>
            {selectedModel.id === model.id && (
              <Check size={16} className="text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
