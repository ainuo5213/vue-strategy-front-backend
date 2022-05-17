import store from '@/store'
import { createI18n } from 'vue-i18n'
const messages = {
  en: {
    msg: {
      test: 'hello world'
    }
  },
  zh: {
    msg: {
      test: '你好世界'
    }
  }
}

const locale = store.getters.language

const i18n = createI18n({
  legacy: false, // 使用composition api
  locale,
  messages,
  globalInjection: true // 全局使用t函数
})

export default i18n
