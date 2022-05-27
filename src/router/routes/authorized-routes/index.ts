import layout from '@/layout/index.vue'
import { RouteRecordRaw } from 'vue-router'
import articleCreate from './article-create'
import article from './article'
import permissionList from './permission-list'
import userManage from './user-manage'
import roleList from './role-list'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: layout,
    redirect: '/home',
    name: 'home',
    meta: {
      title: 'home'
    },
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue')
      }
    ]
  },
  articleCreate,
  article,
  permissionList,
  userManage,
  roleList
]

export default routes
