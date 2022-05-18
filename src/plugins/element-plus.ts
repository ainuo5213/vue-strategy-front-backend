import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { App } from 'vue'

export default class ElementPlusPlugin {
  static install(app: App) {
    app.use(ElementPlus)
  }
}
