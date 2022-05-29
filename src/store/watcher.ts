import router from '@/router'
import { clear, set } from '@/utils/storage'
import { Store } from 'vuex'
import { RootState } from './state'

export function watchStoreChange<T>(
  store: Store<RootState>,
  watchPredict: (state: RootState) => T,
  storageKey: string
) {
  store.watch(
    watchPredict,
    (newValue) => {
      if (newValue) {
        set(storageKey, newValue)
      } else {
        clear(storageKey)
      }
    },
    {
      deep: true
    }
  )
}
