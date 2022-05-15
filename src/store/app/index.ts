import { RootState } from '@/store/state'
import { Module } from 'vuex'
export interface AppState {
  sideBarOpened: boolean
}
const appModule: Module<AppState, RootState> = {
  namespaced: true,
  state: () => ({
    sideBarOpened: true
  }),
  mutations: {
    toggleSideBar(state: AppState) {
      state.sideBarOpened = !state.sideBarOpened
    }
  }
}

export default appModule
