import router from '@/router'
import { RootState } from '@/store/state'
import { createStore } from 'vuex'
import { TAGS_VIEW_KEY, CURRENT_TAG_VIEW_PATH } from '@/constant/app'
import userModule from './user/index'
import appModule from './app/index'
import themeModule from './theme/index'
import permissionModule from './permission/index'
import getters from './getters'
import { watchStoreChange } from './watcher'
const store = createStore<RootState>({
  modules: {
    user: userModule,
    app: appModule,
    theme: themeModule,
    permission: permissionModule
  },
  getters: getters
})

watchStoreChange(store, (state) => state.app.tagsViewList, TAGS_VIEW_KEY)
watchStoreChange(
  store,
  (state) => state.app.currentTagViewPath,
  CURRENT_TAG_VIEW_PATH
)

export default store
