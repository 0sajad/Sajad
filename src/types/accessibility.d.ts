
// Global declarations
declare global {
  interface Window {
    announce(message: string, priority?: "polite" | "assertive"): void;
  }
}

export {};
