import { TIME_STAMP } from '@/constant/user'
import { clear } from '@/utils/storage'
import { RootState } from '@/store/state'
import { login, LoginUserDTO, getUserInfo as fetchUserInfo } from '@/api/system'
import md5 from 'md5'
import { ActionContext } from 'vuex'
import { UserState } from '.'
import { setTimestamp } from '@/utils/auth'
import router, { resetRouter } from '@/router'

export async function doLogin(
  context: ActionContext<UserState, RootState>,
  userInfo: LoginUserDTO
) {
  const { username, password } = userInfo
  const data = await login({
    username,
    password: md5(password)
  })
  setTimestamp()
  context.commit('setToken', data.token)
  return data
}

export async function getUserInfo(
  context: ActionContext<UserState, RootState>
) {
  const data = await fetchUserInfo()
  context.commit('setUser', data)
  return data
}

export async function doLogout(context: ActionContext<UserState, RootState>) {
  context.commit('setToken', '')
  context.commit('setUser', {})
  clear(TIME_STAMP)
  router.push({
    name: 'login'
  })
  context.commit(
    'app/removeTagView',
    {
      type: 'all'
    },
    { root: true }
  )
  resetRouter()
  return Promise.resolve()
}
