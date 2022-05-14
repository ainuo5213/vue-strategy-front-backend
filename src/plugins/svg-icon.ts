import { App } from 'vue'
import SvgIcon from '@/components/base/svg-icon/svg-icon.vue'

const svgRequire = require.context('@/assets/icons', false, /\.svg$/)
svgRequire.keys().forEach((svgIcon) => svgRequire(svgIcon))

export default class SvgIconPlugin {
  static install(app: App) {
    app.component('svg-icon', SvgIcon)
  }
}
