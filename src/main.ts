import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import ElementPlusIcon from '@/plugins/element-plus-icon'
import SvgIconPlugin from '@/plugins/svg-icon'
import 'element-plus/dist/index.css'
import './styles/index.scss'
import './styles/ui-common.scss'
import './styles/ui-element.scss'

createApp(App)
  .use(ElementPlus)
  .use(SvgIconPlugin)
  .use(ElementPlusIcon)
  .use(store)
  .use(router)
  .mount('#app')
