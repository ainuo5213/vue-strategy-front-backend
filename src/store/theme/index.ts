import { RootState } from '@/store/state'
import { Module } from 'vuex'
import { DEFAULT_MAIN_COLOR, THEME_MAIN_COLOR_KEY } from '@/constant/theme'
import { get, set } from '@/utils/storage'
export interface ThemeState {
  mainColor: string
}
const themeModule: Module<ThemeState, RootState> = {
  namespaced: true,
  state: () => ({
    mainColor: (get(THEME_MAIN_COLOR_KEY) as string) || DEFAULT_MAIN_COLOR
  }),
  mutations: {
    setMainColor(state: ThemeState, color: string) {
      state.mainColor = color
      set(THEME_MAIN_COLOR_KEY, color)
    }
  }
}

export default themeModule
