import { MakeTenoxUI, createConfig } from '@nousantx/tenoxui-styler'
import config from '@app/tenoxui.config'
import { useTheme } from '@/contexts/ThemeContext'
import { DEFAULT_PRESERVED_ATTRIBUTES } from '@/lib/ignore-attributes'

export function generateInlineStyles(code: string, theme: any): string {
  const temp = document.createElement('div')
  temp.innerHTML = code

  temp.querySelectorAll('*').forEach((element) => {
    new MakeTenoxUI({
      element,
      ...theme
      // ,...createConfig({ ...config, isDark })
    }).useDOM()
  })
  temp.querySelectorAll('*').forEach((element) => {
    const attributes = Array.from(element.attributes)
    attributes.forEach((attr) => {
      const attributeName = attr.name
      if (!DEFAULT_PRESERVED_ATTRIBUTES.includes(attributeName)) {
        element.removeAttribute(attributeName)
      }
    })
  })

  return temp.innerHTML
}
