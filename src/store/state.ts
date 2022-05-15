import { AppState } from './app'
import { UserState } from './user'

export interface RootState {
  user: UserState
  app: AppState
}
export default {}
