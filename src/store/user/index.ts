import { IUserInfoResultDTO } from '@/api/system'
import { TOKEN_KEY, USER_INFO_KEY } from '@/constant/user'
import * as actions from './actions'
import { RootState } from '@/store/state'
import { Module } from 'vuex'
import { get, set } from '@/utils/storage'
export interface UserState {
  token: string
  userInfo: IUserInfoResultDTO | null
}
const userModule: Module<UserState, RootState> = {
  namespaced: true,
  state: () => ({
    token: (get<string>(TOKEN_KEY) as string) || '',
    userInfo: null
  }),
  mutations: {
    setToken(state: UserState, payload: string) {
      state.token = payload
      set(TOKEN_KEY, payload)
    },
    setUser(state: UserState, payload: IUserInfoResultDTO) {
      state.userInfo = payload
      set(USER_INFO_KEY, payload)
    }
  },
  actions: { ...actions },
  getters: {}
}

export default userModule
