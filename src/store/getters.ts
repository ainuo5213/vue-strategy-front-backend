import { RootState } from './state'
import { GetterTree } from 'vuex'

export const user: GetterTree<RootState, RootState> = {
  token: (state) => state.user.token
}
