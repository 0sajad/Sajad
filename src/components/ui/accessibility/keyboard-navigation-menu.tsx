
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Command, CommandItem, CommandEmpty, CommandGroup, CommandList } from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { useA11y } from "@/hooks/useA11y";
import { useConfig } from "@/hooks/useConfig";
import { Keyboard, Search, Zap } from "lucide-react";

export const KeyboardNavigationMenu = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { playSound } = useA11y();
  const { isFeatureEnabled } = useConfig();
  const isEnabled = isFeatureEnabled('keyboardNavigation', true);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    // Alt + / to open keyboard navigation menu
    if (e.altKey && e.key === "/") {
      e.preventDefault();
      setOpen((prev) => !prev);
      playSound("info");
    }

    // Escape key to close
    if (e.key === "Escape" && open) {
      setOpen(false);
    }
  }, [open, playSound]);

  const handleCommandSelect = (command: string) => {
    setOpen(false);
    playSound("success");
    
    switch (command) {
      case "dashboard":
        window.location.href = "/";
        break;
      case "aiAssistant":
        window.location.href = "/ai";
        break;
      case "settings":
        window.location.href = "/settings";
        break;
      case "help":
        window.location.href = "/help-center";
        break;
      case "toggleDarkMode":
        document.documentElement.classList.toggle("dark");
        break;
      default:
        console.log(`Command selected: ${command}`);
    }
  };

  useEffect(() => {
    if (!isEnabled) return;
    
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress, isEnabled]);

  if (!isEnabled) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Keyboard className="w-5 h-5 mr-2" />
            Keyboard Navigation
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-2">
          <div className="flex items-center px-2">
            <Search className="h-4 w-4 opacity-70 mr-2" />
            <input
              className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Type a command or search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        
        <ScrollArea className="h-72">
          <Command>
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              
              <CommandGroup heading="Navigation">
                <CommandItem 
                  onSelect={() => handleCommandSelect("dashboard")}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center">Go to Dashboard</div>
                  <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">Alt+D</div>
                </CommandItem>
                <CommandItem 
                  onSelect={() => handleCommandSelect("aiAssistant")}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center">Open AI Assistant</div>
                  <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">Alt+A</div>
                </CommandItem>
                <CommandItem 
                  onSelect={() => handleCommandSelect("settings")}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center">Open Settings</div>
                  <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">Alt+S</div>
                </CommandItem>
                <CommandItem 
                  onSelect={() => handleCommandSelect("help")}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center">Help Center</div>
                  <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">Alt+H</div>
                </CommandItem>
              </CommandGroup>
              
              <CommandGroup heading="Actions">
                <CommandItem 
                  onSelect={() => handleCommandSelect("toggleDarkMode")}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center">Toggle Dark Mode</div>
                  <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">Alt+T</div>
                </CommandItem>
                <CommandItem 
                  onSelect={() => handleCommandSelect("runScan")}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center">Run Network Scan</div>
                  <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">Alt+R</div>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </ScrollArea>
        
        <div className="px-1 pt-2 pb-1 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Zap className="h-3 w-3" />
              <Label className="text-xs">Tip: Press <kbd className="bg-muted px-1 rounded">Alt+/</kbd> anytime to open this menu</Label>
            </div>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => setOpen(false)}
              className="text-xs h-7"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
