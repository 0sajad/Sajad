
import React from "react";
import { Switch } from "@/components/ui/switch";
import { CircleCheck, CircleArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  onToggle: () => void;
  badge?: string;
  comingSoon?: boolean;
  info?: string;
  preview?: React.ReactNode;
}

export const FeatureCard = ({ 
  title, 
  description, 
  icon, 
  enabled, 
  onToggle, 
  badge, 
  comingSoon = false,
  info,
  preview
}: FeatureCardProps) => {
  return (
    <div className={cn(
      "border rounded-lg p-4 transition-all duration-300",
      enabled ? "bg-gradient-to-br from-white to-octaBlue-50 border-octaBlue-200" : "bg-white"
    )}>
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <div className={cn(
            "p-2 rounded-md ml-3 rtl:ml-0 rtl:mr-3",
            enabled ? "bg-octaBlue-100 text-octaBlue-700" : "bg-gray-100 text-gray-600"
          )}>
            {icon}
          </div>
          <div>
            <div className="flex items-center">
              <h3 className={cn(
                "font-medium font-tajawal",
                enabled ? "text-octaBlue-900" : "text-gray-700"
              )}>
                {title}
              </h3>
              {badge && (
                <Badge variant="outline" className="mr-2 text-xs">
                  {badge}
                </Badge>
              )}
              {comingSoon && (
                <Badge variant="outline" className="mr-2 text-xs bg-amber-50 text-amber-700 border-amber-200">
                  قريبًا
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1 font-tajawal leading-relaxed">
              {description}
            </p>
          </div>
        </div>
        
        <div className="flex items-center">
          {info && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="p-1 text-muted-foreground hover:text-primary transition-colors ml-2">
                    <CircleCheck size={16} />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="font-tajawal">
                  {info}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          
          {preview && (
            <Dialog>
              <DialogTrigger asChild>
                <button className="p-1 text-muted-foreground hover:text-primary transition-colors ml-2">
                  <CircleArrowDown size={16} />
                </button>
              </DialogTrigger>
              <DialogContent className="w-full max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="font-tajawal">{title}</DialogTitle>
                  <DialogDescription className="font-tajawal">
                    {description}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  {preview}
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="outline" className="font-tajawal" disabled={comingSoon}>
                    تفعيل
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
          
          <Switch 
            checked={enabled} 
            onCheckedChange={onToggle} 
            disabled={comingSoon}
          />
        </div>
      </div>
    </div>
  );
};
