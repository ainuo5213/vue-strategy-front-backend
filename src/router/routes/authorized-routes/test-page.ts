import layout from '@/layout/index.vue'

export default {
  path: '/test-page',
  component: layout,
  redirect: '/test-page/index',
  name: 'testPage',
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    {
      path: '/test-page/index',
      component: () => import('@/views/test-page/test-page-index.vue'),
      meta: {
        title: 'roleList',
        icon: 'role'
      }
    },
    {
      path: '/test-page/detail/:id',
      name: 'test-page-detail',
      component: () => import('@/views/test-page/test-page-detail.vue'),
      meta: {
        title: 'roleList'
      }
    }
  ]
}
