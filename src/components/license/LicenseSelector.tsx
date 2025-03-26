
import React from "react";
import { useTranslation } from "react-i18next";
import { User, Code } from "lucide-react";

interface LicenseSelectorProps {
  value: "client" | "developer";
  onChange: (value: string) => void;
}

export function LicenseSelector({ value, onChange }: LicenseSelectorProps) {
  const { t } = useTranslation('license');
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        type="button"
        onClick={() => onChange("client")}
        className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all ${
          value === "client"
            ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
            : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
        }`}
      >
        <User className={`w-8 h-8 mb-2 ${value === "client" ? "text-purple-500" : "text-gray-500"}`} />
        <span className={value === "client" ? "font-medium text-purple-600" : "text-gray-700 dark:text-gray-300"}>
          {t('clientVersion')}
        </span>
        <span className="text-xs text-gray-500 mt-1">CLT-...</span>
      </button>
      
      <button
        type="button"
        onClick={() => onChange("developer")}
        className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all ${
          value === "developer"
            ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
            : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
        }`}
      >
        <Code className={`w-8 h-8 mb-2 ${value === "developer" ? "text-indigo-500" : "text-gray-500"}`} />
        <span className={value === "developer" ? "font-medium text-indigo-600" : "text-gray-700 dark:text-gray-300"}>
          {t('developerVersion')}
        </span>
        <span className="text-xs text-gray-500 mt-1">DEV-...</span>
      </button>
    </div>
  );
}
