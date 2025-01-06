import { useLayoutEffect } from 'react'
import { init, createConfig } from '@nousantx/tenoxui-styler'
import config from '@app/tenoxui.config'
import { useTheme } from '@/contexts/ThemeContext'
import { applyStyles } from '@/utils/applyStyles'
import { globals } from './global'

export const styler = (deps: any[] = []) => {
  const { theme, darkMode } = useTheme()
  useLayoutEffect(() => {
    applyStyles(globals, darkMode)
    init({ config: theme, selectors: '*:not(#code-preview *)' })
  }, [theme, ...deps])
}
