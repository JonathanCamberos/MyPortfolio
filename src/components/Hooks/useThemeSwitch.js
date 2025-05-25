"use client";

import { useEffect, useState } from "react";


export function useThemeSwitch() {
  const preferDarkQuery = "(prefers-color-scheme: dark)";
  const storageKey = "theme";

  const toggleTheme = (theme) => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      window.localStorage.setItem(storageKey, theme);
    }
  };

  const getUserPreference = () => {
    if (typeof window === "undefined") return null; // Prevent SSR mismatch
    const userPref = window.localStorage.getItem(storageKey);
    if (userPref) {
      return userPref;
    }
    return window.matchMedia(preferDarkQuery).matches ? "dark" : "light";
  };

  const [mode, setMode] = useState(null); // Start as null to avoid mismatch

  useEffect(() => {
    const newMode = getUserPreference();
    if (newMode) {
      setMode(newMode);
      toggleTheme(newMode);
    }
  }, []);

  useEffect(() => {
    if (mode) toggleTheme(mode);
  }, [mode]);

  return [mode, setMode];
}


