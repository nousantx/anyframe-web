import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { init, createConfig, type Config as TenoxConfig } from '@nousantx/tenoxui-styler'
import config from '@app/tenoxui.config'

interface ThemeContextType {
  darkMode: boolean
  toggleDarkMode: () => void
  config: TenoxConfig
}

interface ThemeProviderProps {
  children: React.ReactNode
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    const storedTheme = localStorage.getItem('darkMode')
    if (storedTheme !== null) return storedTheme === 'true'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  const toggleDarkMode = useCallback((): void => {
    setDarkMode((prev) => {
      const newMode = !prev
      localStorage.setItem('darkMode', newMode.toString())
      return newMode
    })
  }, [])

  const debouncedInit = useCallback((isDark: boolean) => {
    let timeoutId: number | undefined

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }

      timeoutId = window.setTimeout(() => {
        const tenoxuiConfig = createConfig({ ...config, isDark })
        init({ config: tenoxuiConfig, selectors: '*:not(#code-preview *)' })
      }, 100)

      return () => {
        if (timeoutId) {
          window.clearTimeout(timeoutId)
        }
      }
    }
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches)
    }

    const cleanup = debouncedInit(darkMode)()

    mediaQuery.addEventListener('change', handleThemeChange)

    return () => {
      cleanup()
      mediaQuery.removeEventListener('change', handleThemeChange)
    }
  }, [darkMode, debouncedInit])

  const value: ThemeContextType = {
    darkMode,
    toggleDarkMode,
    config
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
