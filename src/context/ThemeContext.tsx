"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeMode = "light" | "dark" | "system";

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  resolvedTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("light");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  const applyTheme = (mode: ThemeMode) => {
    const root = document.documentElement;
    let targetTheme: "light" | "dark" = "light";

    if (mode === "system") {
      targetTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } else {
      targetTheme = mode;
    }

    setResolvedTheme(targetTheme);
    if (targetTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    localStorage.setItem("basick-theme", mode);
    applyTheme(mode);
  };

  useEffect(() => {
    const saved = (localStorage.getItem("basick-theme") as ThemeMode) || "light";
    setThemeState(saved);
    applyTheme(saved);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") applyTheme("system");
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};