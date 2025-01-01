import type { Config } from '@nousantx/tenoxui-styler'
import { plugins } from 'tenoxui-plugin-utility'

export default {
  shorthand: {
    shadow: '--nsx_shadow-color',
    'bdr-c': {
      property: 'borderColor',
      value: 'rgb({0} / var(--border-opacity, 1))'
    },
    bdr: 'border',
    'bw-top': 'borderTopWidth',
    'bw-left': 'borderLeftWidth',
    'bw-bottom': 'borderBottomWidth',
    'bw-right': 'borderRightWidth'
  },
  valueAlias: {
    full: '100%',
    half: '50%',
    family: {
      sans: 'Inter, Sans-Serif',
      code: 'JetBrains Mono'
    }
  },
  alias: {
    space: 'jc-space-between',
    'content-wrapper': '[m,p]-0 [box-sizing]-border-box',
    pa: 'fs-1rem fw-500 ls--0.015em'
  },
  color: {
    DEFAULT: {
      // main color
      primary: '#ccf654',
      red: '#f03838',
      green: '#15e05f',
      blue: '#3d82f2',
      yellow: '#f1c230',
      slate: '#636c7c',
      // neutral: '#737373', //# DEFAULT
      neutral: '#4a4a4a',
      // extended color
      ruby: '#e0115f',
      tomato: '#ff6347',
      salmon: '#fa8072',
      orange: '#f37f2e',
      amber: '#f49c09',
      gold: '#ffd700',
      chartreuse: '#7fff00',
      lime: '#91e411',
      emerald: '#13cb8e',
      teal: '#12c39f',
      aquamarine: '#7fffd4',
      turquoise: '#40e0d0',
      cyan: '#21d2f1',
      sky: '#0ea5e9',
      indigo: '#6f72f7',
      violet: '#7844f0',
      purple: '#a855f7',
      magenta: '#ff00ff',
      fuchsia: '#d642ec',
      pink: '#f32d8f',
      rose: '#eb3756',
      zinc: '#71757a',
      gray: '#696a6a'
    }
  },
  plugins: [plugins.typography, plugins.border, plugins.boxShadow]
} satisfies Config
