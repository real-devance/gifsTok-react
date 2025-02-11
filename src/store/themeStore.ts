import { create } from "zustand";

type ThemeStore = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: (localStorage.getItem("theme") as "light" | "dark") || "dark",

  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);  // Save the new theme in localStorage
      return { theme: newTheme };  // Update the theme state
    }),
}));
