import { useLayoutEffect } from 'react'
import { init, createConfig } from '@nousantx/tenoxui-styler'
import config from '@app/tenoxui.config'
import { useTheme } from '@/contexts/ThemeContext'
import { applyStyles } from '@/utils/applyStyles'
import { globals } from './global'

export const styler = (deps: any[] = []) => {
  const { darkMode } = useTheme()
  useLayoutEffect(() => {
    applyStyles(globals, darkMode)
    const tenoxuiConfig = createConfig({ ...config, isDark: darkMode })
    init({ config: tenoxuiConfig })
  }, [darkMode, ...deps])
}
