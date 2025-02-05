// ThemeContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useMemo
} from 'react'
import { init, createConfig, type Config as TenoxConfig } from '@nousantx/tenoxui-styler'
import config from '@app/tenoxui.config'

interface ThemeContextType {
  theme: TenoxConfig
  toggleDarkMode: () => void
  darkMode: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    const storedTheme = localStorage.getItem('darkMode')
    if (storedTheme !== null) return storedTheme === 'true'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  // Memoize the theme configuration
  const theme = useMemo(() => createConfig({ ...config, isDark }), [isDark])

  const toggleDarkMode = useCallback((): void => {
    setIsDark((prev) => {
      const newMode = !prev
      localStorage.setItem('darkMode', newMode.toString())
      return newMode
    })
  }, [])

  // Initialize theme only once when component mounts or theme changes
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      init({ config: theme, selectors: '*:not(#code-preview *)' })
    }, 100)

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches)
    }

    mediaQuery.addEventListener('change', handleThemeChange)

    return () => {
      window.clearTimeout(timeoutId)
      mediaQuery.removeEventListener('change', handleThemeChange)
    }
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      toggleDarkMode,
      darkMode: isDark
    }),
    [theme, toggleDarkMode]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
