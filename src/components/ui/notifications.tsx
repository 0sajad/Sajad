
import React from "react";
import { toast } from "@/hooks/use-toast";
import { AlertTriangle, BellRing, CheckCircle, Info, X } from "lucide-react";
import { Button } from "./button";

interface NotificationProps {
  title: string;
  description?: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const showNotification = ({
  title,
  description,
  type = "info",
  duration = 5000,
  action,
}: NotificationProps) => {
  const icons = {
    success: <CheckCircle className="h-5 w-5 text-white" />,
    error: <X className="h-5 w-5 text-white" />,
    warning: <AlertTriangle className="h-5 w-5 text-white" />,
    info: <Info className="h-5 w-5 text-white" />,
  };

  const gradients = {
    success: "from-green-500 to-green-600",
    error: "from-red-500 to-red-600",
    warning: "from-amber-500 to-amber-600", 
    info: "from-orange-500 to-amber-500",
  };

  return toast({
    title: (
      <div className="flex items-center gap-2">
        {icons[type]}
        <span>{title}</span>
      </div>
    ),
    description: description,
    duration: duration,
    variant: "default",
    className: `toast-3d bg-gradient-to-r ${gradients[type]} text-white`,
    action: action && (
      <Button
        variant="elegant"
        size="sm"
        onClick={action.onClick}
        className="mt-2"
      >
        {action.label}
      </Button>
    ),
  });
};
