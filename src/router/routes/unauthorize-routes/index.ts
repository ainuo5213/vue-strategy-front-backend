import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error-page/404.vue')
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/error-page/401.vue')
  }
]

export default routes
