import { LANGUAGE_KEY } from '@/constant/app'
import { get } from '@/utils/storage'
import { RootState } from '@/store/state'
import { Module } from 'vuex'
export interface AppState {
  sideBarOpened: boolean
  language: string
}
const appModule: Module<AppState, RootState> = {
  namespaced: true,
  state: () => ({
    sideBarOpened: true,
    language: (get(LANGUAGE_KEY) as string) || 'zh'
  }),
  mutations: {
    toggleSideBar(state: AppState) {
      state.sideBarOpened = !state.sideBarOpened
    },
    setLanguage(state: AppState, lang: string) {
      state.language = lang
    }
  }
}

export default appModule
