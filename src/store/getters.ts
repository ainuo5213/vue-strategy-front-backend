import { RootState } from './state'
import { GetterTree } from 'vuex'
import { isPlainObject } from '@/utils/is'
import variables from '@/layout/theme.module.scss'

export const user: GetterTree<RootState, RootState> = {
  token: (state) => state.user.token,
  userInfo: (state) => {
    const userInfo = state.user.userInfo
    if (userInfo && !isPlainObject(userInfo)) {
      return userInfo
    }
    return null
  },
  cssVar: () => variables,
  sideBarOpened: (state) => state.app.sideBarOpened
}
