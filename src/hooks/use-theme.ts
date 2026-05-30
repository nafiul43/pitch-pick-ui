import { createContext, useContext } from "react"

import { THEME_STORAGE_KEY } from "@/constants/auth"

export type Theme = "light" | "dark"

type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }

  return context
}

export function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

export function getStoredTheme(): Theme | null {
  const stored = localStorage.getItem(THEME_STORAGE_KEY)

  if (stored === "light" || stored === "dark") {
    return stored
  }

  return null
}

export function applyThemeToDocument(theme: Theme): void {
  document.documentElement.classList.toggle("dark", theme === "dark")
}

export function clearForcedTheme(): void {
  document.documentElement.classList.remove("dark")
}
