
import React from "react";
import { toast } from "sonner";
import { AlertTriangle, CheckCircle, Info, X } from "lucide-react";
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

  return toast(
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        {icons[type]}
        <span className="font-medium">{title}</span>
      </div>
      {description && <p className="text-sm text-white/90">{description}</p>}
      {action && (
        <Button
          variant="elegant"
          size="sm"
          onClick={action.onClick}
          className="mt-2"
        >
          {action.label}
        </Button>
      )}
    </div>,
    {
      duration: duration,
      className: `bg-gradient-to-r ${gradients[type]} text-white toast-3d`,
    }
  );
};
