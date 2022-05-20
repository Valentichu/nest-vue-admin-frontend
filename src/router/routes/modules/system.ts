export default {
  path: 'system',
  name: 'system',
  component: () => import('@/views/system/index.vue'),
  meta: {
    title: '系统管理',
    requiresAuth: true,
    icon: 'area-chart-outlined',
    order: 0,
  },
  children: [
    {
      path: 'user',
      name: 'User',
      component: () => import('@/views/system/user/index.vue'),
      meta: {
        title: '用户管理',
        requiresAuth: true,
      },
    },
    {
      path: 'department',
      name: 'Department',
      component: () => import('@/views/system/department/index.vue'),
      meta: {
        title: '部门管理',
        requiresAuth: true,
      },
    },
  ],
}
