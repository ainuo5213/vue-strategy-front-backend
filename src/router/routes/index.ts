import { RouteRecordRaw } from 'vue-router'
import unAuthorizeRoutes from './unauthorize-routes'
import authorizedRoutes from './authorized-routes'

export const publicRoutes: RouteRecordRaw[] = [
  ...unAuthorizeRoutes,
  ...authorizedRoutes
]
