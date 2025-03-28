
import React, { useEffect, useRef } from "react";

interface LiveAnnouncerProps {
  politeness?: "polite" | "assertive";
}

export function LiveAnnouncer({ politeness = "polite" }: LiveAnnouncerProps) {
  const announcerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Define global announce function
    if (typeof window !== 'undefined') {
      window.announce = (message: string, level: "polite" | "assertive" = "polite") => {
        if (announcerRef.current) {
          try {
            // Reset content first to ensure new announcement is read
            announcerRef.current.textContent = "";
            
            // Set urgency level
            announcerRef.current.setAttribute("aria-live", level);
            
            // Add announcement content after a short delay to ensure it's read
            setTimeout(() => {
              if (announcerRef.current) {
                announcerRef.current.textContent = message;
              }
            }, 50);
          } catch (error) {
            console.error("Error while announcing:", error);
          }
        }
      };
    }
    
    // Cleanup: clear announcer element when component is removed
    return () => {
      if (announcerRef.current) {
        announcerRef.current.textContent = "";
      }
      
      // Reset announce function to empty function for safety
      if (typeof window !== 'undefined') {
        window.announce = (message: string) => {
          console.log("LiveAnnouncer unmounted, but announce was called with:", message);
        };
      }
    };
  }, []);
  
  // Ensure this component runs on app load
  useEffect(() => {
    // Check if announce function exists
    if (typeof window !== 'undefined' && window.announce) {
      // Initial announcement to ensure system works
      window.announce("تم تحميل نظام الإعلانات للوصول", "polite");
    }
  }, []);
  
  // CSS styling to ensure element is visually hidden but available to screen readers
  const announcerStyle: React.CSSProperties = {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: '0'
  };
  
  return (
    <div 
      ref={announcerRef} 
      className="live-announcer sr-only" 
      aria-live={politeness}
      aria-atomic="true"
      aria-relevant="additions"
      style={announcerStyle}
    />
  );
}
