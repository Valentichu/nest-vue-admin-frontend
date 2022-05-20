export default {
  path: 'dashboard',
  name: 'dashboard',
  component: () => import('@/views/dashboard/index.vue'),
  meta: {
    title: '首页',
    requiresAuth: true,
    icon: 'area-chart-outlined',
    order: 0,
  },
  children: [
    {
      path: 'workplace',
      name: 'Workplace',
      component: () => import('@/views/dashboard/workplace/index.vue'),
      meta: {
        title: '工作区',
        requiresAuth: true,
        permissions: ['admin'],
      },
    },
    {
      path: 'demo',
      name: 'Demo',
      component: () => import('@/views/dashboard/test/index.vue'),
      meta: {
        title: '测试1',
        requiresAuth: true,
      },
    },
  ],
}
