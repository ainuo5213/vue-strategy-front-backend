import { RootState } from '@/store/state'
import { set } from '@/utils/storage'
import { createStore } from 'vuex'
import userModule from './user'
const store = createStore<RootState>({
  modules: {
    user: userModule
  }
})

const TOKEN_KEY = '__USER_TOKEN__'
store.watch(
  (state) => state.user.token,
  (newValue) => {
    set(TOKEN_KEY, newValue)
  }
)

export default store
