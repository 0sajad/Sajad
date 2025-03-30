
import React, { useEffect, useRef } from "react";

interface LiveAnnouncerProps {
  politeness?: "polite" | "assertive";
}

// Define global announce function type
declare global {
  interface Window {
    announce?: (message: string, level?: "polite" | "assertive") => void;
  }
}

export function LiveAnnouncer({ politeness = "polite" }: LiveAnnouncerProps) {
  const announcerRef = useRef<HTMLDivElement>(null);
  const prevAnnounceRef = useRef<((message: string, level?: "polite" | "assertive") => void) | undefined>(undefined);
  
  useEffect(() => {
    // Save previous announce function if it exists
    if (typeof window !== 'undefined' && window.announce) {
      prevAnnounceRef.current = window.announce;
    }
    
    // Define global announcement function
    if (typeof window !== 'undefined') {
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
    
    // Cleanup: restore previous announce function if it existed
    return () => {
      if (typeof window !== 'undefined') {
        if (prevAnnounceRef.current) {
          window.announce = prevAnnounceRef.current;
        } else {
          // If no previous function, just remove the property
          delete window.announce;
        }
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
