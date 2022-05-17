import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/index.scss'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlusIcon from '@/plugins/element-plus-icon'
import SvgIconPlugin from '@/plugins/svg-icon'
import i18n from '@/i18n'

createApp(App)
  .use(ElementPlus)
  .use(SvgIconPlugin)
  .use(ElementPlusIcon)
  .use(store)
  .use(router)
  .use(i18n)
  .mount('#app')
