import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("moodie-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("moodie-theme", theme);
    set({ theme });
  },
}));
