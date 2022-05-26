import { RootState } from '@/store/state'
import { createStore } from 'vuex'
import {
  LANGUAGE_KEY,
  TAGS_VIEW_KEY,
  CURRENT_TAG_VIEW_PATH
} from '@/constant/app'
import { THEME_MAIN_COLOR_KEY } from '@/constant/theme'
import { TOKEN_KEY, USER_INFO_KEY } from '@/constant/user'
import userModule from './user/index'
import appModule from './app/index'
import themeModule from './theme/index'
import getters from './getters'
import { watchStoreChange } from './watcher'
const store = createStore<RootState>({
  modules: {
    user: userModule,
    app: appModule,
    theme: themeModule
  },
  getters: getters
})

watchStoreChange(store, (state) => state.user.token, TOKEN_KEY)
watchStoreChange(store, (state) => state.user.userInfo, USER_INFO_KEY)
watchStoreChange(store, (state) => state.app.language, LANGUAGE_KEY)
watchStoreChange(store, (state) => state.theme.mainColor, THEME_MAIN_COLOR_KEY)
watchStoreChange(store, (state) => state.app.tagsViewList, TAGS_VIEW_KEY)
watchStoreChange(
  store,
  (state) => state.app.currentTagViewPath,
  CURRENT_TAG_VIEW_PATH
)

export default store
