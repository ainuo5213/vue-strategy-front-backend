import store from '@/store'
import {
  Router,
  RouteLocationNormalized,
  NavigationGuardNext
} from 'vue-router'

const whiteList = ['/404', '/login']

async function setUserInfo() {
  if (!store.getters.userInfo) {
    await store.dispatch('user/getUserInfo')
  }
}

export function createRouterGuard(router: Router) {
  router.beforeEach(
    async (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      if (store.getters.token) {
        if (to.path === '/login') {
          next({
            name: 'Home'
          })
        } else {
          await setUserInfo()
          next()
        }
      } else {
        if (whiteList.indexOf(to.path) !== -1) {
          next()
        } else {
          next({
            name: 'Login'
          })
        }
      }
    }
  )
}
