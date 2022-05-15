import { RootState } from '@/store/state'
import { createStore } from 'vuex'
import userModule from './user'
import { watchToken } from './watcher'
const store = createStore<RootState>({
  modules: {
    user: userModule
  }
})

watchToken(store)

export default store
