
import { useState, useEffect } from "react";
import { Time } from "@/types/time";

interface UseCountdownOptions {
  targetDate: Date;
  onComplete?: () => void;
}

export function useCountdown({ targetDate, onComplete }: UseCountdownOptions) {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // حساب الفرق بين التاريخ المستهدف والوقت الحالي
  const calculateTimeRemaining = (): Time => {
    const timeDifference = targetDate.getTime() - currentTime.getTime();
    
    if (timeDifference <= 0) {
      if (onComplete) {
        onComplete();
      }
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }
    
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
    return { days, hours, minutes, seconds };
  };
  
  const [timeRemaining, setTimeRemaining] = useState<Time>(calculateTimeRemaining());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate]);
  
  return {
    timeRemaining,
    isComplete: timeRemaining.days === 0 && 
                timeRemaining.hours === 0 && 
                timeRemaining.minutes === 0 && 
                timeRemaining.seconds === 0
  };
}
