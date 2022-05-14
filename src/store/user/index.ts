import * as actions from './actions'
import { RootState } from '@/store/state'
import { Module } from 'vuex'
export interface UserState {
  token: string
}
const userModel: Module<UserState, RootState> = {
  namespaced: true,
  state: () => ({
    token: ''
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
