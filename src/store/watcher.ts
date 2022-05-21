import { LANGUAGE_KEY } from '@/constant/app'
import { THEME_MAIN_COLOR_KEY } from '@/constant/theme'
import { TOKEN_KEY, USER_INFO_KEY } from '@/constant/user'
import { clear, set } from '@/utils/storage'
import { Store } from 'vuex'
import { RootState } from './state'

export function watchToken(store: Store<RootState>) {
  store.watch(
    (state) => state.user.token,
    (newValue) => {
      if (newValue) {
        set(TOKEN_KEY, newValue)
      } else {
        clear(TOKEN_KEY)
      }
    }
  )
}

export function watchUser(store: Store<RootState>) {
  store.watch(
    (state) => state.user.userInfo,
    (newValue) => {
      if (newValue) {
        set(USER_INFO_KEY, newValue)
      } else {
        clear(USER_INFO_KEY)
      }
    }
  )
}

export function watchLang(store: Store<RootState>) {
  store.watch(
    (state) => state.app.language,
    (newValue) => {
      if (newValue) {
        set(LANGUAGE_KEY, newValue)
      } else {
        clear(LANGUAGE_KEY)
      }
    }
  )
}

export function watchThemeColor(store: Store<RootState>) {
  store.watch(
    (state) => state.theme.mainColor,
    (newValue) => {
      if (newValue) {
        set(THEME_MAIN_COLOR_KEY, newValue)
      } else {
        clear(THEME_MAIN_COLOR_KEY)
      }
    }
  )
}
