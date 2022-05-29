import { RootState } from './state'
import { GetterTree } from 'vuex'
import { isPlainObject } from '@/utils/is'
import variables from '@/layout/theme.module.scss'
import { getCustomThemeColor } from '@/utils/theme'

const getter: GetterTree<RootState, RootState> = {
  token: (state) => state.user.token,
  userInfo: (state) => {
    const userInfo = state.user.userInfo
    if (userInfo && !isPlainObject(userInfo)) {
      return userInfo
    }
    return null
  },
  cssVar: (state) => {
    return {
      ...variables,
      ...getCustomThemeColor(state.theme.mainColor)
    }
  },
  sideBarOpened: (state) => state.app.sideBarOpened,
  language: (state) => state.app.language,
  mainColor: (state) => state.theme.mainColor,
  tagsViewList: (state) => {
    state.app.tagsViewList.forEach((r) => {
      r.meta.active = r.path === state.app.currentTagViewPath
    })
    return state.app.tagsViewList
  },
  routes: (state) => state.permission.routes,
  permissionFetching: (state) => state.app.permissionFetching,
  currentTagView: (state) => {
    const currentTagView = state.app.tagsViewList.find(
      (item) => item.path === state.app.currentTagViewPath
    )
    if (currentTagView) {
      return currentTagView
    }
    return null
  }
}

export default getter
