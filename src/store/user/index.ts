import { TOKEN_KEY } from './../../constant/user'
import * as actions from './actions'
import { RootState } from '@/store/state'
import { Module } from 'vuex'
import { get } from '@/utils/storage'
export interface UserState {
  token: string
}
const userModel: Module<UserState, RootState> = {
  namespaced: true,
  state: () => ({
    token: (get<string>(TOKEN_KEY) as string) || ''
  }),
  mutations: {
    setToken(state: UserState, payload: string) {
      state.token = payload
    }
  },
  actions: { ...actions },
  getters: {}
}

export default userModel
