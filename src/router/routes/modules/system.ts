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
