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
  mainColor: (state) => state.theme.mainColor
}

export default getter
