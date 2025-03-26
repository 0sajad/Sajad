
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, Settings, Wrench, BrainCircuit, Network, Shield } from "lucide-react";
import { useMode } from "@/context/ModeContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

interface SearchTool {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: "tools" | "settings" | "ai" | "network" | "security";
  path: string;
  requiresDeveloperMode?: boolean;
  tags: string[];
}

export const SearchCommand = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { mode } = useMode();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isDeveloperMode = mode === "developer";
  
  // قائمة الأدوات المتاحة للبحث
  const searchTools: SearchTool[] = [
    {
      id: "dashboard",
      title: t("header.dashboard"),
      description: t("search.dashboardDesc", "عرض لوحة التحكم الرئيسية"),
      icon: <Network size={18} />,
      category: "network",
      path: "/",
      tags: ["dashboard", "home", "main", "لوحة", "رئيسية"],
    },
    {
      id: "network-scanner",
      title: t("header.networkScanner"),
      description: t("search.scannerDesc", "أداة مسح الشبكة وتحليلها"),
      icon: <Wrench size={18} />,
      category: "tools",
      path: "/fiber-optic",
      tags: ["scan", "tool", "network", "فحص", "شبكة", "أداة"],
    },
    {
      id: "wifi-analyzer",
      title: t("header.wifiAnalyzer"),
      description: t("search.wifiDesc", "تحليل شبكات الواي فاي"),
      icon: <Wrench size={18} />,
      category: "tools",
      path: "#",
      tags: ["wifi", "analyzer", "واي فاي", "تحليل"],
    },
    {
      id: "traffic-analyzer",
      title: t("header.trafficAnalyzer"),
      description: t("search.trafficDesc", "تحليل حركة مرور الشبكة"),
      icon: <Wrench size={18} />,
      category: "tools",
      path: "#",
      requiresDeveloperMode: true,
      tags: ["traffic", "analyzer", "حركة", "مرور", "مطور"],
    },
    {
      id: "ai-assistant",
      title: t("header.aiAssistant"),
      description: t("search.aiDesc", "مساعد الذكاء الاصطناعي"),
      icon: <BrainCircuit size={18} />,
      category: "ai",
      path: "/ai",
      tags: ["ai", "assistant", "chat", "ذكاء", "مساعد"],
    },
    {
      id: "settings",
      title: t("header.settings"),
      description: t("search.settingsDesc", "إعدادات التطبيق"),
      icon: <Settings size={18} />,
      category: "settings",
      path: "/settings",
      tags: ["settings", "config", "إعدادات"],
    },
    {
      id: "help-center",
      title: t("header.helpCenter"),
      description: t("search.helpDesc", "مركز المساعدة والدعم"),
      icon: <Shield size={18} />,
      category: "settings",
      path: "/help-center",
      tags: ["help", "support", "مساعدة", "دعم"],
    },
    {
      id: "license",
      title: t("header.license"),
      description: t("search.licenseDesc", "إدارة تراخيص التطبيق"),
      icon: <Shield size={18} />,
      category: "security",
      path: "/license",
      tags: ["license", "security", "ترخيص", "أمان"],
    },
    // أدوات إضافية للمطور
    {
      id: "network-isolation",
      title: t("search.networkIsolation", "عزل الشبكة"),
      description: t("search.networkIsolationDesc", "إعدادات عزل وحماية الشبكة"),
      icon: <Network size={18} />,
      category: "network",
      path: "/settings",
      requiresDeveloperMode: true,
      tags: ["isolation", "security", "عزل", "حماية", "مطور"],
    },
    {
      id: "traffic-shaping",
      title: t("search.trafficShaping", "تشكيل حركة المرور"),
      description: t("search.trafficShapingDesc", "التحكم في حركة مرور الشبكة"),
      icon: <Network size={18} />,
      category: "network",
      path: "/settings",
      requiresDeveloperMode: true,
      tags: ["traffic", "shaping", "تشكيل", "مرور", "مطور"],
    },
  ];

  // فلترة الأدوات حسب وضع المستخدم (عميل أو مطور)
  const filteredTools = searchTools.filter(tool => {
    if (tool.requiresDeveloperMode && !isDeveloperMode) {
      return false;
    }
    return true;
  });

  // اختصار لوحة المفاتيح للبحث (Ctrl+K أو Command+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // التنقل إلى الصفحة المختارة
  const handleSelect = (tool: SearchTool) => {
    setOpen(false);
    
    if (tool.requiresDeveloperMode && !isDeveloperMode) {
      toast({
        title: t("search.developerModeRequired", "وضع المطور مطلوب"),
        description: t("search.switchToDeveloper", "الرجاء التبديل إلى وضع المطور للوصول إلى هذه الأداة"),
        variant: "destructive",
      });
      return;
    }
    
    if (tool.path === "#") {
      toast({
        title: t("search.comingSoon", "قريباً"),
        description: t("search.toolNotAvailable", "هذه الأداة غير متوفرة حالياً"),
      });
      return;
    }
    
    navigate(tool.path);
    
    toast({
      title: t("search.navigatingTo", "جاري الانتقال إلى"),
      description: tool.title,
    });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center rounded-md border bg-background px-3 py-2 text-sm hover:bg-accent/50 transition-colors"
        aria-label={t("search.searchTools", "البحث عن الأدوات")}
      >
        <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        <span>{t("search.search", "بحث...")}</span>
        <kbd className="mr-2 ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder={t("search.searchPlaceholder", "ابحث عن الأدوات والميزات...")}
        />
        <CommandList>
          <CommandEmpty>
            {t("search.noResults", "لا توجد نتائج للبحث")}
          </CommandEmpty>
          
          <CommandGroup heading={t("search.categories.tools", "الأدوات")}>
            {filteredTools
              .filter(tool => tool.category === "tools")
              .map(tool => (
                <CommandItem
                  key={tool.id}
                  onSelect={() => handleSelect(tool)}
                  className="flex items-center"
                >
                  <div className="mr-2 flex h-5 w-5 items-center justify-center">
                    {tool.icon}
                  </div>
                  <div className="flex-1">
                    <div>{tool.title}</div>
                    <div className="text-xs text-muted-foreground">{tool.description}</div>
                  </div>
                  {tool.requiresDeveloperMode && (
                    <div className="ml-2 rounded bg-purple-100 px-1.5 py-0.5 text-xs text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                      {t("search.developerOnly", "مطور")}
                    </div>
                  )}
                </CommandItem>
              ))}
          </CommandGroup>
          
          <CommandSeparator />
          
          <CommandGroup heading={t("search.categories.network", "الشبكة")}>
            {filteredTools
              .filter(tool => tool.category === "network")
              .map(tool => (
                <CommandItem
                  key={tool.id}
                  onSelect={() => handleSelect(tool)}
                  className="flex items-center"
                >
                  <div className="mr-2 flex h-5 w-5 items-center justify-center">
                    {tool.icon}
                  </div>
                  <div className="flex-1">
                    <div>{tool.title}</div>
                    <div className="text-xs text-muted-foreground">{tool.description}</div>
                  </div>
                  {tool.requiresDeveloperMode && (
                    <div className="ml-2 rounded bg-purple-100 px-1.5 py-0.5 text-xs text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                      {t("search.developerOnly", "مطور")}
                    </div>
                  )}
                </CommandItem>
              ))}
          </CommandGroup>
          
          <CommandSeparator />
          
          <CommandGroup heading={t("search.categories.ai", "الذكاء الاصطناعي")}>
            {filteredTools
              .filter(tool => tool.category === "ai")
              .map(tool => (
                <CommandItem
                  key={tool.id}
                  onSelect={() => handleSelect(tool)}
                >
                  <div className="mr-2 flex h-5 w-5 items-center justify-center">
                    {tool.icon}
                  </div>
                  <div className="flex-1">
                    <div>{tool.title}</div>
                    <div className="text-xs text-muted-foreground">{tool.description}</div>
                  </div>
                </CommandItem>
              ))}
          </CommandGroup>
          
          <CommandSeparator />
          
          <CommandGroup heading={t("search.categories.settings", "الإعدادات")}>
            {filteredTools
              .filter(tool => tool.category === "settings" || tool.category === "security")
              .map(tool => (
                <CommandItem
                  key={tool.id}
                  onSelect={() => handleSelect(tool)}
                >
                  <div className="mr-2 flex h-5 w-5 items-center justify-center">
                    {tool.icon}
                  </div>
                  <div className="flex-1">
                    <div>{tool.title}</div>
                    <div className="text-xs text-muted-foreground">{tool.description}</div>
                  </div>
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
