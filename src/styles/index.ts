import { useLayoutEffect } from 'react'
import { init,createConfig } from '@nousantx/tenoxui-styler'
import config from '@app/tenoxui.config'
import { useTheme } from '@/contexts/ThemeContext'



export const styler = (deps: any[] = []) => {
  const { darkMode } = useTheme()
  useLayoutEffect(() => {
    const tenoxuiConfig = createConfig({ ...config, isDark: darkMode })
    init({ config: tenoxuiConfig })
  }, [darkMode, ...deps])
}
