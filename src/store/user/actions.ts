import { ElMessage } from 'element-plus'
import { RootState } from '@/store/state'
import { login, LoginUserDTO, getUserInfo as fetchUserInfo } from '@/api/system'
import md5 from 'md5'
import { ActionContext } from 'vuex'
import { UserState } from '.'

export async function doLogin(
  context: ActionContext<UserState, RootState>,
  userInfo: LoginUserDTO
) {
  const { username, password } = userInfo
  const data = await login({
    username,
    password: md5(password)
  })
  context.commit('setToken', data.token)
  return data
}

export async function getUserInfo(
  context: ActionContext<UserState, RootState>
) {
  try {
    const data = await fetchUserInfo()
    context.commit('setUser', data)
    return data
  } catch {
    context.commit('setUser', null)
    context.commit('setToken', null)
    ElMessage({
      type: 'error',
      message: '登录过期，请重新登录'
    })
    location.href = '/login'
    return null
  }
}
