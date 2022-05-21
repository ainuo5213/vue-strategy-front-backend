import { RootState } from '@/store/state'
import { createStore } from 'vuex'
import userModule from './user'
import appModule from './app'
import themeModule from './theme'
import getters from './getters'
import { watchToken, watchUser, watchLang, watchThemeColor } from './watcher'
const store = createStore<RootState>({
  modules: {
    user: userModule,
    app: appModule,
    theme: themeModule
  },
  getters: getters
})

watchToken(store)
watchUser(store)
watchLang(store)
watchThemeColor(store)

export default store
