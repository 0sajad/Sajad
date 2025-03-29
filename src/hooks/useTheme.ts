
import { useEffect } from 'react';
import { useTheme as useNextTheme } from 'next-themes'; 

/**
 * خطاف لإدارة سمة التطبيق (الوضع الداكن / الفاتح)
 * يوفر واجهة بسيطة للتحكم في السمة
 */
export function useTheme() {
  const { theme, setTheme, systemTheme, resolvedTheme } = useNextTheme();
  
  // تطبيق السمة على العنصر HTML الجذري
  useEffect(() => {
    if (theme === 'dark' || (theme === 'system' && systemTheme === 'dark')) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, systemTheme]);
  
  // تبديل السمة بين الوضع الداكن والفاتح
  const toggleTheme = () => {
    if (theme === 'dark' || (theme === 'system' && systemTheme === 'dark')) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };
  
  return {
    theme,
    setTheme,
    resolvedTheme,
    isDarkMode: theme === 'dark' || (theme === 'system' && systemTheme === 'dark'),
    toggleTheme
  };
}
