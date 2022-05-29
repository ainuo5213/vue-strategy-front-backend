import router from '@/router'
import nProgress from 'nprogress'
import store from '@/store'

import {
  Router,
  RouteLocationNormalized,
  NavigationGuardNext
} from 'vue-router'
const whiteList = ['/import', '/404', '/401']

nProgress.configure({
  showSpinner: false
})

async function setUserInfo() {
  if (!store.getters.userInfo) {
    const { permission } = await store.dispatch('user/getUserInfo')
    // const filterRoutes = await store.dispatch(
    //   'permission/filterRoutes',
    //   permission.menus
    // )
    // // 利用 addRoute 循环添加
    // filterRoutes.forEach((item) => {
    //   router.addRoute(item)
    // })
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
