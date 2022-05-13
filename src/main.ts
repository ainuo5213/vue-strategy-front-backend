import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import ElementPlusIcon from '@/plugins/element-plus-icon'
import 'element-plus/dist/index.css'
import './styles/index.scss'
import './styles/ui-common.scss'

createApp(App)
  .use(ElementPlus)
  .use(ElementPlusIcon)
  .use(store)
  .use(router)
  .mount('#app')
