import i18n from '@/i18n'
import store from '@/store'
import { watch } from 'vue'
export function generateTitle(title: string) {
  return i18n.global.t(`route.${title}`)
}

export function watchLangChange(...cbs: ((language: string) => void)[]) {
  watch(
    () => store.getters.language,
    () => {
      cbs.forEach((cb) => cb(store.getters.language))
    }
  )
}
