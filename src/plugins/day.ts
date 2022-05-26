import dayjs from 'dayjs'
import { App } from 'vue'

export default class DayjsPlugin {
  static install(app: App) {
    app.config.globalProperties.dayjs = dayjs
  }
}
