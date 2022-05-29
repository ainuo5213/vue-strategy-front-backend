import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { createRouterGuard } from './guard'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes
})

createRouterGuard(router)

export default router
