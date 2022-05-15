import nProgress from 'nprogress'
import store from '@/store'
import unAuthorizeRoutes from './routes/unauthorize-routes'
import {
  Router,
  RouteLocationNormalized,
  NavigationGuardNext
} from 'vue-router'

const whiteList = unAuthorizeRoutes.map((r) => r.path)

nProgress.configure({
  showSpinner: false
})

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
      nProgress.start()
      if (store.getters.token) {
        if (to.path === '/login') {
          next({
            name: 'userManage'
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
            name: 'login'
          })
        }
      }
      nProgress.done()
    }
  )
}
