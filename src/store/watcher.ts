import { TOKEN_KEY } from './../constant/user'
import { set } from '@/utils/storage'
import { Store } from 'vuex'
import { RootState } from './state'
export function watchToken(store: Store<RootState>) {
  store.watch(
    (state) => state.user.token,
    (newValue) => {
      set(TOKEN_KEY, newValue)
    }
  )
}
