import dayjs from 'dayjs'
import { App } from 'vue'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'
import store from '@/store'

export default class DayjsPlugin {
  static install(app: App) {
    dayjs.extend(relativeTime)
    dayjs.prototype.fromCurrent = function () {
      const locale = store.getters.language === 'zh' ? 'zh-cn' : 'en'
      return this.locale(locale).fromNow()
    }
    app.config.globalProperties.dayjs = dayjs
  }
}
