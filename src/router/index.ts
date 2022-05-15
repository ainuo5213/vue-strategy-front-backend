import { createRouter, createWebHistory } from 'vue-router'
import { publicRoutes } from './routes'
import { createRouterGuard } from './guard'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: publicRoutes
})

createRouterGuard(router)

export default router
