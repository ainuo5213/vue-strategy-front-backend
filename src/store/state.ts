import { ThemeState } from './theme'
import { AppState } from './app'
import { UserState } from './user'
import { PermissionState } from './permission'

export interface RootState {
  user: UserState
  app: AppState
  theme: ThemeState
  permission: PermissionState
}
export default {}
