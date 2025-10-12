import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getLocalStorageItem, LocalStorageKeys, setLocalStorageItem } from "../../services/localStorage.service";

export const THEME_LIGHT = "emptymist";
export const THEME_DARK = "grumpyplanet";

export enum Themes {
  THEME_LIGHT = "emptymist",
  THEME_DARK = "grumpyplanet",
}


type ThemeContextType = {
  theme: string,
  setTheme: React.Dispatch<React.SetStateAction<string>>,
  isCurrentThemeLight: boolean,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(() => {
    const value = getLocalStorageItem(LocalStorageKeys.THEME) || THEME_LIGHT;
    setLocalStorageItem(LocalStorageKeys.THEME, value);
    return value;
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    setLocalStorageItem(LocalStorageKeys.THEME, theme);
  }, [theme]);

  const isCurrentThemeLight = theme === THEME_LIGHT;

  const context = useMemo(() => {
    return {
      theme,
      setTheme,
      isCurrentThemeLight
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={context}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");

  return context;
};