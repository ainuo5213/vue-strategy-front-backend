import { createRouter, createWebHistory } from 'vue-router'
import { publicRoutes } from './routes'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: publicRoutes
})

export default router
