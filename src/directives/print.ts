import { App } from 'vue'
import print from 'vue3-print-nb'

export default class PrintPlugin {
  static install(app: App) {
    app.directive('print', print)
  }
}
