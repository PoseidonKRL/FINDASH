import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

export type Theme = 'dark' | 'neon' | 'minimal' | 'brutalist' | 'glass' | 'cyberpunk';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const storedTheme = localStorage.getItem('findash_theme');
      return (storedTheme as Theme) || 'dark'; // 'dark' is the default theme
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove all possible theme classes
    root.classList.remove('theme-dark', 'theme-neon', 'theme-minimal', 'theme-brutalist', 'theme-glass', 'theme-cyberpunk');
    
    // Add the current one
    root.classList.add(`theme-${theme}`);
    localStorage.setItem('findash_theme', theme);
    
    // Update meta theme-color for PWA/mobile browser consistency
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
        const color = {
            dark: '#0F172A',
            neon: '#0a0a14',
            minimal: '#FFFFFF',
            brutalist: '#FDE047',
            glass: '#05040f',
            cyberpunk: '#0D0221',
        }[theme];
        themeColorMeta.setAttribute('content', color);
    }

  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};