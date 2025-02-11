import { useThemeStore } from "../store/themeStore";
import { useEffect } from "react";

export const useTheme = () => {
  const { theme, toggleTheme } = useThemeStore();

  // Apply the theme to the document body when the component mounts or theme changes
  useEffect(() => {
    document.body.className = theme;
  }, [theme]); // Dependency on theme to reapply if it changes

  return { theme, toggleTheme };
};
