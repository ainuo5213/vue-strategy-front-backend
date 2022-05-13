import { RouteRecordRaw } from 'vue-router'
import unAuthorizeRoutes from './unauthorize-routes'

export const publicRoutes: RouteRecordRaw[] = [...unAuthorizeRoutes]
