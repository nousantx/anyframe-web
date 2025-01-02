import { MakeTenoxUI, createConfig } from '@nousantx/tenoxui-styler'
import config from '@app/tenoxui.config'

const DEFAULT_PRESERVED_ATTRIBUTES = [
  'style',
  'xmlns',
  'width',
  'height',
  'viewBox',
  'd',
  'fill',
  'path',
  'id',
  'x1',
  'x2',
  'y1',
  'y2',
  'gradientUnits',
  'gradientTransform',
  'offset',
  'stop-color',
  'opacity',
  'href'
]

export function generateInlineStyles(code: string): string {
  const temp = document.createElement('div')
  temp.innerHTML = code

  temp.querySelectorAll('*').forEach((element) => {
    new MakeTenoxUI({
      element,
      ...createConfig(config)
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
