import { RootState } from '@/store/state'
import { login, LoginUserDTO } from '@/api/system'
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
