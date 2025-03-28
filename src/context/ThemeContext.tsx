
import React, { createContext, useContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";

type Theme = "dark" | "light" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme: nextTheme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  
  // Cast the theme to our Theme type
  const currentTheme = (nextTheme as Theme) || "system";

  useEffect(() => {
    // Check if the current theme is dark
    const isDark = 
      currentTheme === "dark" || 
      (currentTheme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    setIsDarkMode(isDark);
    
    // Apply any theme-specific classes
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [currentTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        setTheme,
        isDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
