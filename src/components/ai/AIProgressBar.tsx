
import React from "react";
import { Progress } from "../ui/progress";
import { motion, AnimatePresence } from "framer-motion";

interface AIProgressBarProps {
  progress: number;
  status: "learning" | "processing" | "idle" | "protecting" | "analyzing" | "optimizing";
}

export function AIProgressBar({ progress, status }: AIProgressBarProps) {
  const getStatusColor = () => {
    switch (status) {
      case "learning": return "bg-amber-500";
      case "processing": return "bg-blue-500";
      case "protecting": return "bg-red-500";
      case "analyzing": return "bg-cyan-500";
      case "optimizing": return "bg-green-500";
      default: return "bg-green-500";
    }
  };
  
  const backgroundVariants = {
    initial: { opacity: 0.5 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };
  
  const progressVariants = {
    initial: { width: 0 },
    animate: { 
      width: `${progress}%`,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      } 
    }
  };
  
  // Create a pulsing animation when progress is complete
  const pulseVariants = {
    initial: { opacity: 0.7 },
    animate: {
      opacity: 1,
      transition: {
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 0.7
      }
    }
  };
  
  return (
    <div 
      className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <AnimatePresence>
        <motion.div
          key={status}
          className={`h-full rounded-full ${getStatusColor()}`}
          style={{ width: `${progress}%` }}
          initial="initial"
          animate={progress >= 100 ? "animate" : "initial"}
          variants={pulseVariants}
        />
      </AnimatePresence>
    </div>
  );
}
