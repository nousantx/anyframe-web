import { MakeTenoxUI, createConfig } from '@nousantx/tenoxui-styler'
import config from '@app/tenoxui.config'

export function applyStyles(styleMap: { [key: string]: string }, isDark: boolean) {
  Object.entries(styleMap).forEach(([selector, classString]) => {
    const elements = document.querySelectorAll(selector)
    elements.forEach((element) => {
      const tenoxui = new MakeTenoxUI({ element, ...createConfig({ ...config, isDark }) })

      tenoxui.applyMultiStyles(classString)
    })
  })
}
