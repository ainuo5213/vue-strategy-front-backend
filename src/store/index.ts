import { RootState } from '@/store/state'
import { createStore } from 'vuex'
import userModule from './user'
import { user } from './getters'
import { watchToken } from './watcher'
const store = createStore<RootState>({
  modules: {
    user: userModule
  },
  getters: {
    ...user
  }
})

watchToken(store)

export default store
