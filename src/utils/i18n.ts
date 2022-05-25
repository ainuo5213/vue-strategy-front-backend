import i18n from '@/i18n'
import store from '@/store'
import { watch, WatchOptions } from 'vue'
export function generateTitle(title: string) {
  return i18n.global.t(`route.${title}`)
}

export function watchLangChange(
  cb: (language: string) => void,
  option: WatchOptions = {
    immediate: false
  }
) {
  watch(
    () => store.getters.language,
    () => {
      cb(store.getters.language)
    },
    option
  )
}
