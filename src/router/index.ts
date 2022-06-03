import { IUserInfoResultDTO } from '@/api/system'
import { createRouter, createWebHashHistory } from 'vue-router'
import { publicRoutes } from './routes'
import { createRouterGuard } from './guard'
import store from '@/store'

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: publicRoutes
})

export function resetRouter() {
  const userInfo = store.getters.userInfo as IUserInfoResultDTO
  if (userInfo?.permission?.menus) {
    const menus = userInfo.permission.menus
    menus.forEach((menu) => {
      router.removeRoute(menu)
    })
  }
}

createRouterGuard(router)

export default router
