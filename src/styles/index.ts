import { useLayoutEffect } from 'react'
import { init } from '@nousantx/tenoxui-styler'
import config from '@app/tenoxui.config'

export const styler = () => {
  useLayoutEffect(() => {
    init({ config })
  }, [])
}
