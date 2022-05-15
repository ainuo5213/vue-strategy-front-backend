import { RootState } from '@/store/state'
import { createStore } from 'vuex'
import userModule from './user'
import { user } from './getters'
import { watchToken, watchUser } from './watcher'
const store = createStore<RootState>({
  modules: {
    user: userModule
  },
  getters: {
    ...user
  }
})

watchToken(store)
watchUser(store)

export default store
