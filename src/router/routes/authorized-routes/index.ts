import { RouteRecordRaw } from 'vue-router'
import articleCreate from './article-create'
import article from './article'
import permissionList from './permission-list'
import userManage from './user-manage'
import roleList from './role-list'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/user'
  },
  articleCreate,
  article,
  permissionList,
  userManage,
  roleList
]

export default routes
