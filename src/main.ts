import { createApp } from 'vue'
import ElementPlusPlugin from '@/plugins/element-plus'
import './styles/index.scss'
import App from './App.vue'
import store from './store'
import router from './router'
import ElementPlusIconPlugin from '@/plugins/element-plus-icon'
import SvgIconPlugin from '@/plugins/svg-icon'
import DayjsPlugin from '@/plugins/day'
import i18n from '@/i18n'
import DirectivePlugin from './directives'
createApp(App)
  .use(ElementPlusPlugin)
  .use(SvgIconPlugin)
  .use(ElementPlusIconPlugin)
  .use(DayjsPlugin)
  .use(DirectivePlugin)
  .use(store)
  .use(router)
  .use(i18n)
  .mount('#app')
