import store from '@/store'
import en from './lang/en'
import zh from './lang/zh'
import { createI18n } from 'vue-i18n'
const messages = {
  en,
  zh
}

function getLanguage() {
  return store?.getters?.language || 'zh'
}

const i18n = createI18n({
  legacy: false, // 使用composition api
  locale: getLanguage(),
  messages,
  globalInjection: true // 全局使用t函数
})

export default i18n
