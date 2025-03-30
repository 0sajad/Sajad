
import React, { useEffect, useRef } from "react";

interface LiveAnnouncerProps {
  politeness?: "polite" | "assertive";
}

export function LiveAnnouncer({ politeness = "polite" }: LiveAnnouncerProps) {
  const announcerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Define global announcement function
    if (typeof window !== 'undefined' && !window.announce) {
      window.announce = (message: string, level: "polite" | "assertive" = "polite") => {
        if (announcerRef.current) {
          try {
            // Reset content first to ensure new announcement is read
            announcerRef.current.textContent = "";
            
            // Set aria-live level
            announcerRef.current.setAttribute("aria-live", level);
            
            // Add announcement content after a short delay to ensure it's read
            window.requestAnimationFrame(() => {
              if (announcerRef.current) {
                announcerRef.current.textContent = message;
              }
            });
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
      
      // Avoid memory leaks by not restoring previous announce function
      // Just provide an empty no-op function for safety
      if (typeof window !== 'undefined') {
        window.announce = (message: string) => {
          console.log("LiveAnnouncer unmounted, but announce was called with:", message);
        };
      }
    };
  }, []);
  
  // CSS styles to ensure element is visually hidden but accessible to screen readers
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
