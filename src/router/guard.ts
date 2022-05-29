import store from '@/store'
import router from '@/router'
import nProgress from 'nprogress'

import {
  Router,
  RouteLocationNormalized,
  NavigationGuardNext,
  RouteRecordRaw
} from 'vue-router'
import { whiteList } from '@/utils/is'

nProgress.configure({
  showSpinner: false
})

export function createRouterGuard(router: Router) {
  router.beforeEach(
    async (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      nProgress.start()
      if (store.getters.token) {
        if (to.path === '/login') {
          next()
        } else {
          if (!store.getters.userInfo) {
            const { permission } = await store.dispatch('user/getUserInfo')
            const filterRoutes = await store.dispatch(
              'permission/filterRoutes',
              permission.menus
            )

            filterRoutes.forEach((item: RouteRecordRaw) => {
              router.addRoute(item)
            })
            next(to.path)
          } else {
            next()
          }
        }
      } else {
        if (whiteList.indexOf(to.path) !== -1) {
          next()
        } else {
          next({
            name: 'login'
          })
        }
      }
      nProgress.done()
    }
  )
}
