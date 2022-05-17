import { RootState } from '@/store/state'
import { createStore } from 'vuex'
import userModule from './user'
import appModule from './app'
import { user } from './getters'
import { watchToken, watchUser, watchLang } from './watcher'
const store = createStore<RootState>({
  modules: {
    user: userModule,
    app: appModule
  },
  getters: {
    ...user
  }
})

watchToken(store)
watchUser(store)
watchLang(store)

export default store
